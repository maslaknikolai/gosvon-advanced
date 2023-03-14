const open = require('open');
const { spawn } = require('node:child_process');

function run(str, checker) {
  const [mainCmd, ...args] = str.split(' ')

  const ls = spawn(mainCmd, args);

  let resolve = () => {
    console.log('DEFAULT HANDLER');
  }

  ls.stdout.on('data', (data) => {
    const checkResult = checker?.(String(data))

    if (checkResult) {
      resolve(checkResult)
    }
  });

  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

  return new Promise(r => {
    if (!checker) {
      r()
    } else {
      resolve = r
    }
  })
}

async function start() {
  console.log('Starting local server');
  const servePort = await run(`yarn serve dist`, msg => {
    const match = msg.match(/Accepting connections at http:\/\/localhost:(\d+)/)

    if (!match) {
      return false
    }

    return match[1]
  })

  console.log(`Local server started. http://localhost:${servePort}`);
  console.log('Starting tunnel');

  const localtunnelAddress = await run(`yarn lt --port ${servePort}`, msg => {
    const match = msg.match(/your url is: (.+)/)

    if (!match) {
      return false
    }

    return match[1]
  })

  open(localtunnelAddress);
  console.log('Tunnel started', localtunnelAddress);

  run('yarn vite build --watch')
}

start()