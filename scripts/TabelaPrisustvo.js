
 

let TabelaPrisustvo = function (divRef, podaci) {
    //ovdje definisano da ne bude error kad podaci nisu validni
    let sljedecaSedmica = function () {}
    let prethodnaSedmica = function () {}

    function daLiSuPodaciValidni(podaci){
        var listaStudenata=[];
       for(let i=0; i<Object.keys(podaci.studenti).length; i++ ){
           listaStudenata.push(podaci.studenti[i].index)
   
       }
      
     //Isti student ima dva ili više unosa prisustva za istu sedmicu
     for(let i=1; i<=dajMaximum(podaci); i++){
       var listaPoSedmici=[];
      
       for(let j=0; j<Object.keys(podaci.prisustva).length; j++ ){
           if(podaci.prisustva[j].sedmica==i)
           listaPoSedmici.push(podaci.prisustva[j].index);
   
       }
       //ako je neka sedmica prazna
       if(listaPoSedmici.length==0)
       return false
       //duplikati
       const set=new Set(listaPoSedmici);
      console.log(listaPoSedmici.length+" "+set.size);
       if(listaPoSedmici.length!=set.size)
       return false;
           
   
     }
       for(let i=0; i<Object.keys(podaci.prisustva).length; i++ ){
   
           if(podaci.prisustva[i].predavanja<0 || podaci.prisustva[i].vjezbe<0)
           return false;
           if(podaci.prisustva[i].predavanja>podaci.brojPredavanjaSedmicno || podaci.prisustva[i].vjezbe>podaci.brojVjezbiSedmicno)
           return false;
            //Postoji prisustvo za studenta koji nije u listi studenata
           if( listaStudenata.filter(item=>item==podaci.prisustva[i].index).length==0)
           return false;
   
       }
       //duplikati
       const set=new Set(listaStudenata);
      
       if(listaStudenata.length!=set.size)
       return false;
   
   
   }

   function dajMaximum(podaci){
    let maximum=0;

    for(let i=0; i<Object.keys(podaci.prisustva).length; i++ )
        if(podaci.prisustva[i].sedmica>maximum)
            maximum=podaci.prisustva[i].sedmica;

    
    return maximum;
}

     
   if( daLiSuPodaciValidni(podaci)==false){
      var poruka=document.createElement("h1");

      const textNode = document.createTextNode("Podaci o prisustvu nisu validni!");
poruka.appendChild(textNode);
      
 divRef.appendChild(poruka);
   


   }
   else{

    var brojStudenata=Object.keys(podaci.studenti).length;
    var brojSedmica=dajMaximum(podaci);
    var trenutnaSedmica=brojSedmica;
    var listaSedmica=["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV"];
    


  



 var table = document.createElement('table');
    table.className="table-class"
       document.getElementById("naziv").textContent="Naziv predmeta: "+podaci.predmet;
 

//pravim prvi red
var row =table.insertRow();
var cell1=row.insertCell();
cell1.innerHTML="Ime i prezime";
var cell1=row.insertCell();
cell1.innerHTML="Index";
for(i=0; i<brojSedmica; i++){
    cell1=row.insertCell();
    cell1.innerHTML=listaSedmica[i];}

    let sirokaCell=row.insertCell(-1);
      sirokaCell.colSpan="11";
    
//ostatak tabele

for(var i=0; i<brojStudenata; i++){
    var row =table.insertRow();
     var cell1=row.insertCell();
     cell1.innerHTML=podaci.studenti[i].ime;
     var cell1=row.insertCell();
     cell1.innerHTML=podaci.studenti[i].index;
    


      for(j=1; j<brojSedmica; j++){
     let ubacenaCell=row.insertCell();
     nacrtajKolonu(row,j,ubacenaCell,i);
      }
 
   let ubacenaCell=row.insertCell();
     ubacenaCell.className="trenutna-sedmica";
    nacrtajTrenutnuKolonu(brojSedmica,ubacenaCell,i);
    /*let sirokaCell=row.insertCell(-1);
    sirokaCell.textContent="";
  
   sirokaCell.className="kraj";
   sirokaCell.colSpan="11";
   */
   
   
 }

   //tr.cells[0].remove();
  sljedecaSedmica = function () {
    if(trenutnaSedmica!=brojSedmica){
        for(var i=1; i<=brojStudenata; i++){
            let rowTrenutni=table.rows[i];
            //uklanjam trenutnu kolonu
            console.log(trenutnaSedmica);
           rowTrenutni.cells[trenutnaSedmica+1].remove();
           //ispisuje se normalno trenutna
        var ubacenaCell=rowTrenutni.insertCell(trenutnaSedmica+1);
       nacrtajKolonu(rowTrenutni,trenutnaSedmica,ubacenaCell,i-1);

       //sljedeca se remove
       rowTrenutni.cells[trenutnaSedmica+2].remove();
       //ispisuje kao trenutna
       let ubacenaCellTrenutna=rowTrenutni.insertCell(trenutnaSedmica+2);
       ubacenaCellTrenutna.className="trenutna-sedmica";
       nacrtajTrenutnuKolonu(trenutnaSedmica+1,ubacenaCellTrenutna,i-1);
       
        }
      
        trenutnaSedmica++;
    }

}


 prethodnaSedmica = function () {
    if(trenutnaSedmica!=1){
  for(var i=1; i<=brojStudenata; i++){
    let rowTrenutni=table.rows[i];
    //uklanjam prethodnu kolonu
   rowTrenutni.cells[trenutnaSedmica].remove();
   
    //prethodna uklonjena->crtam tu trenutnu
    let ubacenaCellTrenutna=rowTrenutni.insertCell(trenutnaSedmica);
   ubacenaCellTrenutna.className="trenutna-sedmica";
  nacrtajTrenutnuKolonu(trenutnaSedmica-1,ubacenaCellTrenutna,i-1);
   //ispisuje se normalno trenutna sedmica
   rowTrenutni.cells[trenutnaSedmica+1].remove();
   var ubacenaCell=rowTrenutni.insertCell(trenutnaSedmica+1);
   nacrtajKolonu(rowTrenutni,trenutnaSedmica,ubacenaCell,i-1);


   

  }
    
     trenutnaSedmica--;
}




}
 

    divRef.appendChild(table);
    var prethodnaDugme = document.createElement("BUTTON");
    var sljedecaDugme= document.createElement("BUTTON");
   
    document.body.appendChild(prethodnaDugme);
    document.body.appendChild(sljedecaDugme);
    var slikaPrethodna=document.createElement("i");
    slikaPrethodna.className="fa fa-solid fa-arrow-left"  
    var slikaSljedeca=document.createElement("i");
    slikaSljedeca.className="fa fa-solid fa-arrow-right"  

    prethodnaDugme.classList.add("button-prethodni");
    sljedecaDugme.classList.add("button-sljedeci");

    prethodnaDugme.appendChild(slikaPrethodna);
    sljedecaDugme.appendChild(slikaSljedeca);
  
    prethodnaDugme.onclick=function(){prethodnaSedmica();};
    sljedecaDugme.onclick=function(){sljedecaSedmica();};

   
  
    function nacrtajKolonu(row,j,ubacenaCell,i){
        //j je sedmica
        //znaci crtam j+2 kolonu
    
        var ukupnoPrisustvo=podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno;
                 var pozivFunkcije=dajInformacijePoIndexuiSedmici(podaci,podaci.studenti[i].index, j);
                 let predavanja=pozivFunkcije[0];
                 let vjezbe=pozivFunkcije[1];
                 let uneseniPodaci=pozivFunkcije[2];
                 let prisustvo=( (predavanja+vjezbe)/ukupnoPrisustvo)*100;
                 if(uneseniPodaci)
                 ubacenaCell.innerHTML=prisustvo+"%";


    }


   



//POMOCNE METODE
  //ako se vrati nula, lista je prazna


function nacrtajTrenutnuKolonu( trenutnaSedmica,ubacenaCell,i){
    console.log("trenutna sedm:"+trenutnaSedmica);
    let trenutnoPrisustvo=dajInformacijePoIndexuiSedmici(podaci,podaci.studenti[i].index, trenutnaSedmica);
     let brojPredavanja=trenutnoPrisustvo[0];
     let brojVjezbi=trenutnoPrisustvo[1];
     let unesenoTrenutnoPrisustvo=trenutnoPrisustvo[2];

    var divTrenutna = document.createElement("div");
    divTrenutna.className="trenutna";
  for(let i=0; i<10; i++){
    divPrisustvo=document.createElement("div");
    var tekst=document.createElement("p");
   
    divPrisustvo.appendChild(tekst);
    if(i==0){
        divPrisustvo.className="upper first-column";
        const node = document.createTextNode("P");
        tekst.appendChild(node);
        divPrisustvo.appendChild(document.createTextNode("1"));
    }
    else if(i<3){
        divPrisustvo.className="upper";
        const node = document.createTextNode("P");
        tekst.appendChild(node);
        divPrisustvo.appendChild(document.createTextNode((i+1).toString()));

   }
   else if(i<5){
        divPrisustvo.className="upper";
        const node = document.createTextNode("V");
        tekst.appendChild(node);
        divPrisustvo.appendChild(document.createTextNode((i-2).toString()));
   }
   else{
    divPrisustvo.className="bottom";
    if(i==5)
        divPrisustvo.classList.add("first-column");
    if(i<8 && unesenoTrenutnoPrisustvo){
        if(brojPredavanja>0)
            divPrisustvo.classList.add("prisutan");
        
        else
            divPrisustvo.classList.add("nije-prisutan");
            brojPredavanja--;
        
        }
    else if( unesenoTrenutnoPrisustvo){

    
        if(brojVjezbi>=0)
            divPrisustvo.classList.add("prisutan");
        else
            divPrisustvo.classList.add("nije-prisutan");
        brojVjezbi--;

    

    }
}
  

   divTrenutna.appendChild(divPrisustvo);

    ubacenaCell.appendChild(divTrenutna);
   

   }


}



function dajInformacijePoIndexuiSedmici(podaci, index, sedmica){
    let predavanja, vjezbe;
    let uneseniPodaci=false;
   for(let i=0; i<Object.keys(podaci.prisustva).length; i++ )
         if(podaci.prisustva[i].index==index && podaci.prisustva[i].sedmica==sedmica){
              predavanja= podaci.prisustva[i].predavanja;
              vjezbe=podaci.prisustva[i].vjezbe;
              uneseniPodaci=true;
         }

   return [predavanja, vjezbe, uneseniPodaci];


}


   }

 return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    }
    
   
    
   
};
