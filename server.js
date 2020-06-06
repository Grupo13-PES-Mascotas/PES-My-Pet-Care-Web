const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(__dirname + '/dist/PES-My-Pet-Care-Web'))

app.listen(process.env.PORT || 8081);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/PES-My-Pet-Care-Web/index.html'));
})

console.log('Compiled successfully');
