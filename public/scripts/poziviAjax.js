const PoziviAjax = (()=>{
  //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
  // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odg
  // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
  function impl_getPredmet(naziv,fnCallback){
    var request = new XMLHttpRequest();
    request.open("GET", `/predmet/${naziv}`, false);
    request.onreadystatechange = function() {
        request.onload = function () {
            var data = JSON.parse(this.response);
            if (request.status==200) {
    
                fnCallback(true, data);
            } else {
                fnCallback(false, null);
            }
        }
    };
    request.send();

  }
  // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
  function impl_getPredmeti(fnCallback){
   var request = new XMLHttpRequest();
    request.open("GET", "/predmeti");
    request.onreadystatechange = function() {
        request.onload = function () {
            var data = JSON.parse(this.response);
            if (request.status==200) {
    
                fnCallback(true, data);
            } else {
                fnCallback(false, null);
            }
        }
    };
    request.send();
  }
  function impl_postLogin(username, password, fnCallback) {
    var request = new XMLHttpRequest();
    request.open("POST", '/login', true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (data.poruka === "Uspješna prijava") {
            fnCallback(true);
        } else {
            fnCallback(false);
        }
    }  
  request.send(JSON.stringify({username: username, password: password}));
  }
  function impl_postLogout(fnCallback) {
    console.log("LOGOUT FUNKCIJA");
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    .then(response => {
        if (response.ok) {
            fnCallback(true);
        } else {
            fnCallback(false);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

  
  //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
  function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){
    var request = new XMLHttpRequest();
    request.open("POST", `/prisustvo/predmet/${naziv}/student/${index}`, true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.onload = function () {
        var data = JSON.parse(this.response);
        if (request.status==200) {
            fnCallback(data,true);
        } else {
            fnCallback(null,false);
        }
    }  
  request.send(JSON.stringify(prisustvo));  



  }
  return{
  postLogin: impl_postLogin,
  postLogout: impl_postLogout,
  getPredmet: impl_getPredmet,
  getPredmeti: impl_getPredmeti,
  postPrisustvo: impl_postPrisustvo
  };
  })
  