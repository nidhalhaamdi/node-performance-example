const express = require('express');
const os = require('os');

const app = express();

function delay(duration) {
    const startTime = Date.now() // Current time represented in ms
    while(Date.now() - startTime < duration) {
        // event loop is completely blocked... No other Js code will be processed
    }
}

app.get('/', (req, res) => {
    res.send(`Performance Example: ${process.pid}`); // get the id of the current process from the operating system
});

app.get('/timer', (req, res) => {
    delay(4000);
    res.send(`Beep beep beep!: ${process.pid}`);
});

console.log('Running server.js ...');
console.log('Worker process started.');
app.listen(3000);