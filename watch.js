const fs = require('fs');
const { spawn } = require('child_process');
const path = require('path');

const fileToWatch = 'wedding-data.json';
const buildScript = 'build.js';

console.log(`Watching for changes in ${fileToWatch}...`);

let fsWait = false;
fs.watch(fileToWatch, (event, filename) => {
    if (filename) {
        if (fsWait) return;
        fsWait = setTimeout(() => {
            fsWait = false;
        }, 100); // Debounce to prevent multiple triggers

        console.log(`\nDetected change in ${filename}. Running build...`);

        const build = spawn('node', [buildScript], { stdio: 'inherit' });

        build.on('close', (code) => {
            if (code === 0) {
                console.log('Build successful! Waiting for next change...');
            } else {
                console.error(`Build failed with code ${code}`);
            }
        });
    }
});
