const express = require('express');
const app = express();
const path = require('path');
const fs=require('fs');
const session = require('express-session');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

app.post("/login", function(req, res) {
  console.log("prijava");
  const username = req.body.username;
  const password = req.body.password;
  fs.readFile("public/data/nastavnici.json", "utf8", function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Error reading user data' });
    } else {
      const niz = JSON.parse(data);
      const user = niz.find(user=> user.nastavnik.username===username && user.nastavnik.password_hash==password);
      if(user) {
        const predmeti=user.predmeti;
        req.session.username = username;
        req.session.predmeti=predmeti;
        res.status(200).send({ poruka:'Uspješna prijava' });
      } else {
        res.status(401).send({ poruka:'Neuspješna prijava' });
    
      }

      
    }
  });
});
app.post("/logout", (req, res) => {
 
  if(req.session.username){
      req.session.destroy();
      res.status(200).json();
  }else{
      res.status(401).json({error: 'Nije prijavljen'});
  }
});


//-------
app.get('/predmeti', (req, res) => {
  if (req.session.username) {
    res.status(200);
    res.send(req.session.predmeti);    
  
  } else {
    res.status(401).send({error: 'Nije prijavljen'});
  }
});
app.get('/predmet/:NAZIV', (req, res) => {
  const naziv = req.params.NAZIV; 
  fs.readFile("public/data/prisustva.json", "utf8", function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Error reading user data' });
    } else {
      const niz = JSON.parse(data);
      const target=niz.find(prisustvo=> prisustvo.predmet===naziv);
      res.status(200).send(target);
    
    }
  }
  );
 
});

app.listen(3000, () =>
  console.log("Example app listening on port 3000!"),
);