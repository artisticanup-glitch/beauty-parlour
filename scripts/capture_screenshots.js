import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\araj2\\.gemini\\antigravity\\brain\\aec5c247-2a45-44b8-8507-e7971dbdf0b3';

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function capture(width, height, isHindi, filename) {
  const url = 'http://localhost:5173/';
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--user-data-dir=C:\\Users\\araj2\\AppData\\Local\\Temp\\chrome_cap_' + filename,
    `--window-size=${width},${height}`,
    url
  ]);

  await new Promise(r => setTimeout(r, 4000));

  try {
    const list = await fetchJson('http://127.0.0.1:9223/json/list');
    const page = list.find(item => item.type === 'page');
    if (!page || !page.webSocketDebuggerUrl) {
      chromeProc.kill();
      return;
    }

    const ws = new globalThis.WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve) => {
      ws.onopen = () => {
        if (isHindi) {
          // Trigger Hindi switch in localStorage and re-render
          const switchLang = `
            (() => {
              localStorage.setItem('roop_nikhar_lang', 'hi');
              window.location.reload();
            })()
          `;
          ws.send(JSON.stringify({ id: 10, method: 'Runtime.evaluate', params: { expression: switchLang } }));
          setTimeout(() => {
            // Take screenshot
            ws.send(JSON.stringify({ id: 2, method: 'Page.captureScreenshot', params: { format: 'png' } }));
          }, 2500);
        } else {
          // Take screenshot
          ws.send(JSON.stringify({ id: 2, method: 'Page.captureScreenshot', params: { format: 'png' } }));
        }
      };

      ws.onmessage = (event) => {
        const res = JSON.parse(event.data);
        if (res.id === 2 && res.result?.data) {
          const buffer = Buffer.from(res.result.data, 'base64');
          const savePath = path.join(artifactDir, filename);
          fs.writeFileSync(savePath, buffer);
          console.log(`Saved screenshot: ${savePath} (${buffer.length} bytes)`);
          ws.close();
          resolve();
        }
      };
    });
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chromeProc.kill();
  }
}

async function run() {
  await capture(1280, 900, false, 'desktop_en.png');
  await new Promise(r => setTimeout(r, 1000));
  await capture(1280, 900, true, 'desktop_hi.png');
  await new Promise(r => setTimeout(r, 1000));
  await capture(375, 812, false, 'mobile_en.png');
  await new Promise(r => setTimeout(r, 1000));
  await capture(375, 812, true, 'mobile_hi.png');
  console.log('All screenshots captured!');
}

run();
