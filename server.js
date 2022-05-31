const express = require('express');

const app = express();

function delay(duration) {
    const startTime = Date.now() // Current time represented in ms
    while(Date.now() - startTime < duration) {
        // event loop is completely blocked... No other Js code will be processed
    }
}

// We're gonna have 2 routes

app.get('/', (req, res) => {
    // JSON.stringify({}) => "{}"
    // JSON.parse("{}") => {}
    // [5,3,2,6,1].sort() 
    // ---> these are real life functions that block the event loop especially for very large objects or arrays
    res.send('Performance Example');
});

app.get('/timer', (req, res) => {
    delay(9000);
    res.send('Ding ding ding!');
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});