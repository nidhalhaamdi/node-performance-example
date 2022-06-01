const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

function delay(duration) {
    const startTime = Date.now() // Current time represented in ms
    while(Date.now() - startTime < duration) {
        // event loop is completely blocked... No other Js code will be processed
    }
}

// We're gonna have 2 routes

app.get('/', (req, res) => {
    res.send(`Performance Example: ${process.pid}`); // get the id of the current process from the operating system
});

app.get('/timer', (req, res) => {
    delay(9000);
    res.send(`Ding ding ding!: ${process.pid}`);
});

console.log('Running server.js ...');

if (cluster.isMaster) {
    console.log('Master has been started...');
    const NUM_WORKERS = os.cpus().length;
    for (let i = 0; i < NUM_WORKERS; i++) {
        cluster.fork();
    }
} else {
    console.log('Worker process started.');
    /* Node knows that each of our workers will be listening on the same port, on Port 3000 
    & the node HTTP server knows to divide incoming requests that are coming in on Port 3000 
    between the different worker processes. */
    app.listen(3000);
}