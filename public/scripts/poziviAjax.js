$("#login").submit(function(event) {
    var username = document.querySelector('#username').value;
    var password = document.querySelector('#password').value;
    $.post("/login", { username: username, password: password }, function(res) {

      if (res.success) {
        
     
      } else {
   
    
      }
    });
  });