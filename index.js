const express = require('express');
const app = express();
const path = require('path');
const fs=require('fs');
const bcrypt = require('bcrypt');
const session = require('express-session');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
//app.use(express.static('public'));
app.use(express.static(__dirname+"/public"));
app.get('/prijava.html',function(req,res){
res.sendFile(__dirname+"/public/html/prijava.html");
});

app.get('/predmeti.html',function(req,res){
  res.sendFile(__dirname+"/public/html/predmeti.html");
  });
  
  app.get('/predmet.html',function(req,res){
    res.sendFile(__dirname+"/public/html/predmet.html");
    });
    app.get('/prisustvo.html',function(req,res){
      res.sendFile(__dirname+"/public/html/prisustvo.html");
      });
  


app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  fs.readFile("public/data/nastavnici.json", "utf8", function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Error reading user data' });
    } else {
      var prijavaUspjesna=false;
      const niz = JSON.parse(data);
      const user = niz.find(user=> user.nastavnik.username===username);
      if(user){
      prijavaUspjesna=true;
      bcrypt.compare(password, user.nastavnik.password_hash, function(err, result) {
        if (err) {
          console.log("Error");
       prijavaUspjesna=false;
        } else {
          if(!result)
          prijavaUspjesna=false;
          // else{
            if(prijavaUspjesna) {
              const predmeti=user.predmeti;
              req.session.username = username;
              req.session.predmeti=predmeti;
              res.status(200).send({ poruka:'Uspješna prijava' });
            } else {
              res.status(401).send({ poruka:'Neuspješna prijava' });
          
            }
      
           
        }
    });
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

app.post('/prisustvo/predmet/:naziv/student/:index', (req, res) => {
   var naziv=req.params.naziv;
   var index=req.params.index;
   var sedmica=req.body.sedmica;
   var vjezbe=req.body.vjezbe;
   var predavanja=req.body.predavanja;
 fs.readFile('./public/data/prisustva.json', (err, data) => {
      if (err) throw err
      let podaci = JSON.parse(data)
      let predmet = podaci.find(p => p.predmet === naziv)
      let prisustvo = predmet.prisustva.find(p => p.index == index && p.sedmica ==sedmica); 
      //slucaj da nije uneseno
      if (!prisustvo) {
        prisustvo = { sedmica, predavanja, vjezbe, index};
        predmet.prisustva.push(prisustvo);
      }

     prisustvo.predavanja = predavanja;
      prisustvo.vjezbe = vjezbe;
     // let predmet2 = podaci.find(p => p.predmet === naziv);
      fs.writeFile('./public/data/prisustva.json', JSON.stringify(podaci), 'utf8', (err) => {
          if (err) throw err
      })
     // console.log(prisustvo);

      res.status(200).json(predmet);
  })
});

app.listen(3000, () =>
  console.log("Example app listening on port 3000!"),
);