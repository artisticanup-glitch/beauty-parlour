import { spawn } from 'child_process';
import http from 'http';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

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

async function verifyViewport(width, height, isMobileName) {
  console.log(`\n--- Testing ${isMobileName} (${width}x${height}) ---`);
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--user-data-dir=C:\\Users\\araj2\\AppData\\Local\\Temp\\chrome_debug_' + width,
    `--window-size=${width},${height}`,
    'http://localhost:5173/'
  ]);

  // Wait 3 seconds for chrome and page to load
  await new Promise(r => setTimeout(r, 3500));

  try {
    const list = await fetchJson('http://127.0.0.1:9222/json/list');
    const page = list.find(item => item.type === 'page');
    if (!page || !page.webSocketDebuggerUrl) {
      console.error('Could not find active page target');
      chromeProc.kill();
      return;
    }

    // Connect WebSocket using Node 24 native WebSocket
    const wsUrl = page.webSocketDebuggerUrl;
    const ws = new globalThis.WebSocket(wsUrl);
    
    await new Promise((resolve) => {
      ws.onopen = () => {
        // Evaluate video state
        const expr = `
          (() => {
            const video = document.querySelector('video');
            if (!video) return { found: false };
            return {
              found: true,
              src: video.currentSrc || video.src,
              readyState: video.readyState,
              paused: video.paused,
              currentTime: video.currentTime,
              videoWidth: video.videoWidth,
              videoHeight: video.videoHeight,
              error: video.error ? video.error.message : null
            };
          })()
        `;
        const msg = JSON.stringify({
          id: 1,
          method: 'Runtime.evaluate',
          params: { expression: expr, returnByValue: true }
        });
        ws.send(msg);
      };

      ws.onmessage = (event) => {
        const res = JSON.parse(event.data);
        if (res.id === 1) {
          console.log('Video DOM Evaluation result:', res.result?.result?.value);
          ws.close();
          resolve();
        }
      };
    });

  } catch (err) {
    console.error('Verification error:', err.message);
  } finally {
    chromeProc.kill();
  }
}

async function run() {
  await verifyViewport(1280, 900, 'Desktop');
  await new Promise(r => setTimeout(r, 1000));
  await verifyViewport(375, 812, 'Mobile');
}

run();
