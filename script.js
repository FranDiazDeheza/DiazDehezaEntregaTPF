const BotonClick = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
let carrito = []



BotonClick.forEach(btn => {
    btn.addEventListener('click', addToCarrito)
})

function addToCarrito(e) {
    const button = e.target
    const item = button.closest('.card')
    const tituloItem = item.querySelector('.card-title').textContent;
    const precioItem = item.querySelector('.precio').textContent;
    const imgItem = item.querySelector('.card-img-top').src;

/*
    console.log(tituloItem)
    console.log(precioItem)
    console.log(imgItem)
*/

const newItem = {
    title: tituloItem,
    precio: precioItem,
    img: imgItem,
    cantidad:1
}

addItemCarrito(newItem)

}

function addItemCarrito(newItem){
    const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')

    const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
    carrito.push(newItem)
    renderCarrito()
 }

 function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map(item => {
      const tr = document.createElement('tr')
      tr.classList.add('ItemCarrito')
      const Content = `
      
      <th scope="row">1</th>
      <td class="table__productos">
        <img src=${item.img}  alt="">
        <h6 class="title">${item.title}</h6>
      </td>
      <td class="table__price"><p>${item.precio}</p></td>
      <td class="table__cantidad">
        <input type="number" min="1" value=${item.cantidad} class="input__elemento">
        <button class="delete btn btn-danger">x</button>
      </td>

`
tr.innerHTML = Content;
tbody.append(tr)

tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)

})

CarritoTotal()

}

function CarritoTotal(){
    let Total = 0;
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
      const precio = Number(item.precio.replace("$", ''))
      Total = Total + precio*item.cantidad
    })
  
    itemCartTotal.innerHTML = `Total $ ${Total}`
    addLocalStorage()
    
  }

  function removeItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for(let i=0; i<carrito.length ; i++){
  
      if(carrito[i].title.trim() === title.trim()){
        carrito.splice(i, 1)
      }
    }

    const alert = document.querySelector('.remove')

    setTimeout( function(){
      alert.classList.add('remove')
    }, 2000)
      alert.classList.remove('remove')
  
      tr.remove()
      CarritoTotal()
  }
  
  function sumaCantidad(e){
    const sumaInput  = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    carrito.forEach(item => {
      if(item.title.trim() === title){
        sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
        item.cantidad = sumaInput.value;
        CarritoTotal()
      }
    })
  }

  function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }
  
  window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'));
    if(storage){
      carrito = storage;
      renderCarrito()
    }
  }

  let libros = []


  class Libro {
    constructor(titulo,autor,año) {
      this.titulo = titulo
      this.autor = autor
      this.año = año
    }
  }
  
  
  
  $(() => {
      $('#formLibro').submit((e) => {
        e.preventDefault()
  
  
   
    
    
        let libro = new Libro($('#titulo').val(),$('#autor').val(),$('#año').val())
        libros.push(libro)
  
        localStorage.setItem('libroDato',JSON.stringify(libros))
        $('#formAuto').trigger("reset")
      })
    
    
    
    $('#boton1').on('click', () => {
       $('#divLibs').html(` <table class="table table-hover">
       <thead>
         <tr>
           <th scope="col">#</th>
           <th scope="col">Titulo</th>
           <th scope="col">Autor</th>
           <th scope="col">Año de Publicacion</th>
         </tr>
       </thead>
       <tbody id="table-body">
   
       </tbody>
     </table>
     `)
  
    
    let libroStorage = JSON.parse(localStorage.getItem('libroDato'))   
    
    libroStorage.forEach((librosEnArray, indice) => { 
        $('#table-body').append(`
        <tr class="table-dark">
        <th scope="row">${indice+1}</th>
        <td>${librosEnArray.titulo}</td>
        <td>${librosEnArray.autor}</td>
        <td>${librosEnArray.año}</td>
      </tr>
        `)
    });
    
  
    })
    
    })

    $('#btn1').on("click",function(){
      $('#image1').toggle('slow');
     });

     $('#btn1').on("click",function(){
      $("#fotox").prepend('<img id="image1" src="./img/nev.gif" style = "width : 40%","height : 50%">');
    }
    ) 
   

    $('#btn1').on("click",function(){
      $("#aca").prepend('<p id="p1"> No hay libros gratis,acabas de ser rick rolled </p>');
    }
    )


$('#finalizar').on("click",()=>{
    $.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(carrito),function(data,estado){
      console.log(data,estado);
      if(estado){
        $('#carrito').empty();
        $('#carrito').append('<h6> Gracias por su compra </h6>');
        carrito = []
        localStorage.clear()
        CarritoTotal()

      }
    })




})    


   