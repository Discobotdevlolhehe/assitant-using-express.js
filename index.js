const express = require('express');
const app = express();

app.use(express.static(__dirname + '/ai'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ai/index.html')
});

app.listen(8080, () => {
    console.log('Hey')
})

