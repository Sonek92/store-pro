let titel = document.getElementById("titel");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let category = document.getElementById("category");
let creat = document.getElementById("creat");
let count = document.getElementById("count");
let total = document.getElementById("total");

let mood = 'create';
let temp;
// total price item
 function getTotal() {
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value )- +discount.value
         total.innerHTML = result
         total.style.background = "#040"
    }else{
        total.innerHTML="";
        total.style.background = "#a00d02";
    }
};
// creat items & add to localstorage

 let datapro;
if(localStorage.items != null){ datapro= JSON.parse(localStorage.items)}else{ datapro =[];};
creat.onclick = function(){
 let Newproduct = { titel : titel.value.toLowerCase(),
    price : price.value,
    taxes : taxes.value, 
    ads: ads.value,
    discount : discount.value,
    category : category.value.toLowerCase(), total: total.innerHTML , count:count.value};
    if(mood === 'create'){ if(Newproduct.count > 1){
        for(let i =0; i < Newproduct.count ; i++ ){
            datapro.push(Newproduct);
        }
    }else{   datapro.push(Newproduct);   }  }else{  
        datapro[ temp ]=Newproduct;
        creat.innerHTML= 'create';
        count.style.display= 'block';
        mood = 'create';
     };
    

 
 localStorage.setItem("items" , JSON.stringify(datapro) ) ;


 clearinp();
 showData();
};
//clear inputs 

 function clearinp(){
    titel.value='';
    price.value = '';
    taxes.value='';
    discount.value='';
    count.value='';
    category.value='';
    ads.value='';
    total.innerHTML ='';

 };
// show a data
 function showData(){
    getTotal();
    let window='';
    for( let i=0; i< datapro.length; i++ ){
    window += `<tr>
                <td>${i}</td>
                <td>${datapro[i].titel}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick='updateitem(${i})' id="updatebtn">update</button></td>
                <td><button onclick="clearitem(${i})" id="deletebtn">delete</button></td>
            </tr> `};
     document.getElementById('table').innerHTML= window;

     let btndelete = document.getElementById('btnDeleteall');
     if(datapro.length > 0){
        btndelete.innerHTML =`
        <button onclick= 'deleteAll()' >Delete All (${datapro.length})</button>
        `
     }else{
        btndelete.innerHTML='';
     };
 };
 // clear one item
function clearitem(i){
 datapro.splice(i,1)
 localStorage.items = JSON.stringify(datapro);
 showData()
};
// clear all items 
function deleteAll(){

    localStorage.clear();
    datapro.splice(0);
    showData()
};
//update items 
function updateitem(i){
    titel.value = datapro[i].titel;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    discount.value = datapro[i].discount;
    ads.value = datapro[i].ads;
    getTotal();
    category.value= datapro[i].category;
    count.style.display='none';
    creat.innerHTML='update';
    mood = 'update';
    temp = i ;
    scroll({
        top : 0,
        behavior: 'smooth'
    });
};
//search moods by titel or category 
let searchmood = 'titel'
function getSearchMood(id){
    let search = document.getElementById('search');
   
   if(id === 'searchTitel'){
    searchmood = 'titel';
    
   }else{
    searchmood = 'category';
    
   };
   search.placeholder = 'search by '+searchmood;
   search.focus();

};
//search items 
function searchdata(value){
    let window = '';
    if(searchmood === 'titel'){
       
       for(let i =0; i < datapro.length ; i++){
        if(datapro[i].titel.includes(value)){
            window += `<tr>
            <td>${i}</td>
            <td>${datapro[i].titel}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick='updateitem(${i})' id="updatebtn">update</button></td>
            <td><button onclick="clearitem(${i})" id="deletebtn">delete</button></td>
        </tr> `

        }
       }
        
    }else{   for(let i =0; i < datapro.length ; i++){
        if(datapro[i].category.includes(value)){
            window += `<tr>
            <td>${i}</td>
            <td>${datapro[i].titel}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick='updateitem(${i})' id="updatebtn">update</button></td>
            <td><button onclick="clearitem(${i})" id="deletebtn">delete</button></td>
        </tr> `

        };
       }  };
       document.getElementById('table').innerHTML= window;
};

showData();