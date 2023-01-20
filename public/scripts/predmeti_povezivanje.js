let poziviAjax=PoziviAjax();
let div = document.getElementById("divSadrzaj");
poziviAjax.getPredmeti(function(response, data){
    if(response){
        div.innerHTML="";
        var velicina=data.length;
        const meni = document.querySelector('.meni');
       for(let i=0; i<=velicina; i++){
            var meniItem=document.createElement("div");
            meniItem.classList.add("meni-item");
            var naziv=document.createElement("h3");
            if(i<velicina){    
                 naziv.innerHTML=data[i];
                 //prvo zovem
                 meniItem.addEventListener("click",function(){
                    console.log(data[i]);
                });
                poziviAjax.getPredmet(data[i],function(response, podaci){
                    if(response){
               meniItem.addEventListener("click", function(){ 
                div.innerHTML=""; 
                TabelaPrisustvo(div,podaci);
                /*var table=document.getElementsByTagName("table");
                var rows = document.querySelectorAll("tr");
                rows.forEach(row => {
                    var okvir=row.querySelectorAll(".trenutna-sedmica .trenutna .bottom");
                    if(okvir.length>0) {
                        okvir.forEach(element => {
                            element.addEventListener("click",function(){
                                console.log("klikic");
                            });
                        });
                    }
                });*/
                
                
            
            
            
                       }   );
          
                    }
                    else{
                        console.log("error");

                    }
                });
        /*        meniItem.addEventListener("click",function(){
                    div.innerHTML="";
                    TabelaPrisustvo(div, {studenti: [{ime:"Neko",index:12345}, {ime:"Neko2",index:12347}
                ,{ime:"Neko3",index:12348} ,{ime:"Neko4",index:12349},{ime:"Neko5",index:12350}
                
                ], 
                prisustva:[
                 {sedmica:1,predavanja:1,vjezbe:1,index:12345}, {sedmica:1,predavanja:3,vjezbe:2,index:12347}, {sedmica:1,predavanja:3,vjezbe:2,index:12348},{sedmica:1,predavanja:3,vjezbe:2,index:12349},
                 {sedmica:2,predavanja:1,vjezbe:2,index:12345}, {sedmica:6,predavanja:2,vjezbe:1,index:12347},{sedmica:2,predavanja:3,vjezbe:2,index:12348},{sedmica:5,predavanja:3,vjezbe:2,index:12349},
                 {sedmica:3,predavanja:1,vjezbe:2,index:12345}, {sedmica:3,predavanja:2,vjezbe:1,index:12347},{sedmica:3,predavanja:1,vjezbe:2,index:12349},
                 {sedmica:4,predavanja:1,vjezbe:2,index:12345}, {sedmica:4,predavanja:2,vjezbe:1,index:12347},{sedmica:4,predavanja:3,vjezbe:2,index:12348},{sedmica:4,predavanja:2,vjezbe:2,index:12349},
                
                
                ], 
                predmet:"WT", brojPredavanjaSedmicno:3, brojVjezbiSedmicno:2})  });*/
                

            }
            else{
                 meniItem.classList.add("logout");
                naziv.innerHTML="LOG OUT";
                meniItem.addEventListener("click", function(){ console.log("klik"); poziviAjax.postLogout(function(response){
                    if(response){
                        console.log("ok");
                        window.location.href = './prijava.html';
                        

                    }
                    else{
                         console.log("error");
                    }
                }
                );   }  );
            }
            meniItem.appendChild(naziv);
            meni.appendChild(meniItem);
        }

  
          
       
         //let prisustvo = TabelaPrisustvo(div,info dobijem iz rute)
          





     
    }
         
    else{
     
       console.log("ERROR: NISTE PRIJAVLJENI!");
        let h1=document.createElement("h1");
        h1.innerHTML="ERROR: NISTE PRIJAVLJENI!";
        div.appendChild(h1);
    
    }
 } );   