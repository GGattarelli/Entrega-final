const productos = [
    // REMERAS
    {
        id: "remera-01",
        titulo: "Remera 01",
        imagen: "../asset/img/remeras/remera1.png",
        categoria: {
            nombre: "Remera",
            id: "remera"
        },
        precio: 3000
    },
    {
        id: "remera-02",
        titulo: "Remera 02",
        imagen: "../asset/img/remeras/remera2.png",
        categoria: {
            nombre: "Remera",
            id: "remera"
        },
        precio: 3000
    },
    {
        id: "remera-03",
        titulo: "Remera 03",
        imagen: "../asset/img/remeras/remera3.png",
        categoria: {
            nombre: "Remera",
            id: "remera"
        },
        precio: 3000
    },

    // TAZAS
    {
        id: "taza-01",
        titulo: "Taza 01",
        imagen: "../asset/img/tazas/taza1.png",
        categoria: {
            nombre: "Taza",
            id: "taza"
        },
        precio: 1800
    },
    {
        id: "taza-02",
        titulo: "Taza 02",
        imagen: "../asset/img/tazas/taza2.png",
        categoria: {
            nombre: "Taza",
            id: "taza"
        },
        precio: 1800
    },
    {
        id: "taza-03",
        titulo: "Taza 03",
        imagen: "../asset/img/tazas/taza3.png",
        categoria: {
            nombre: "Taza",
            id: "taza"
        },
        precio: 1800
    },
];

// Elementos del DOM
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// Cargar las imagenes almacenadas en la carperta assets

function cargarProductos(productosElegidos) {

    // Vaciar el forEach y cargarlo nuevamente cuando se preciona en un botón
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);

    })

    actulizarBotonesAgregar();
}

// Llamar a la función para cargar los productos
cargarProductos(productos);

// Filtrar por categoria
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }else{
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
})

function actulizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

const productosEnCarrito = [];

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
}

// Actualizar el numero de productos del carrito
function actualizarNumerito () {
    let nuevoNumerito = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}