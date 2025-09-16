// Simulación de datos (normalmente esto vendría de una BD o API en JSON)
const platillos = [
  {
    nombre: "Lomo Saltado",
    precio: 25,
    ingredientes: "Carne, cebolla, tomate, papas fritas",
    imagen: "https://via.placeholder.com/100"
  },
  {
    nombre: "Ceviche",
    precio: 20,
    ingredientes: "Pescado, limón, cebolla, ají, camote",
    imagen: "https://via.placeholder.com/100"
  },
  {
    nombre: "Pollo a la Brasa",
    precio: 30,
    ingredientes: "Pollo, papas fritas, ensalada",
    imagen: "https://via.placeholder.com/100"
  }
];

// Seleccionamos el contenedor del menú
const menuContainer = document.getElementById("menu");

// Generamos dinámicamente los platillos
platillos.forEach(plato => {
  const div = document.createElement("div");
  div.classList.add("platillo");

  div.innerHTML = `
    <div class="platillo-info">
      <h2>${plato.nombre}</h2>
      <p class="precio">S/. ${plato.precio}</p>
      <p>${plato.ingredientes}</p>
    </div>
    <img src="${plato.imagen}" alt="${plato.nombre}">
  `;

  menuContainer.appendChild(div);
});
