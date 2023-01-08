const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));


/*app.get('/html/prisustvo.html', (req, res) => {
   
});
app.get('/predmet.html', (req, res) => {
    res.sendFile('./public/html/predmet.html', { root: __dirname });
});*/
app.listen(3000, () =>
  console.log(`Example app listening on port 3000!`),
);