
let poziviAjax=PoziviAjax();
document.getElementById("login").addEventListener("submit",function(event){
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    poziviAjax.postLogin(username,password,function(response){
    if(response){
       
        window.location.href = '../html/predmeti.html';
        //console.log("success");
        
       
    }else{
        //login failed
        //console.log("Fail");
        var poruka=document.createElement("h2");
        poruka.innerHTML="Neuspjesan pokusaj";
        document.body.appendChild(poruka);
    }
    });
});