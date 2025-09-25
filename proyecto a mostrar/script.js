// Lista inicial de comidas
let comidas = [
  {
    id: 1,
    nombre: "Lomo Saltado",
    descripcion: "Tiras de carne salteadas con cebolla, tomate y papas fritas.",
    precio: 25.0,
    cantidad: 10,
    imagen: "https://i.ytimg.com/vi/sWXRJbGi6yQ/maxresdefault.jpg"
  },
  {
    id: 2,
    nombre: "Ají de Gallina",
    descripcion: "Pollo deshilachado en crema de ají amarillo y queso.",
    precio: 20.0,
    cantidad: 8,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV5wRKNcwCgoGM94gz5DmKo_HWcE-vAgSVHg&s"
  },
  {
    id: 3,
    nombre: "Ceviche",
    descripcion: "Pescado fresco marinado en limón con cebolla, ají y camote.",
    precio: 22.0,
    cantidad: 12,
    imagen: "https://www.recetasnestle.cl/sites/default/files/srh_recipes/379d1ba605985c4bc3ea975cabacce13.jpg"
  },
  {
    id: 4,
    nombre: "Anticuchos",
    descripcion: "Brochetas de corazón de res marinadas y asadas.",
    precio: 15.0,
    cantidad: 15,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSTWfGUY9814nmbvW1LlP2OrSNoN4u2dVifQ&s"
  },
  {
    id: 5,
    nombre: "Arroz con Pollo",
    descripcion: "Arroz verde acompañado con presa de pollo jugoso.",
    precio: 18.0,
    cantidad: 9,
    imagen: "https://i.ytimg.com/vi/3YCVrs0_BCw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCRZrBn_7FI4nj_lUDaCAHrUUzaTQ"
  },
  {
    id: 6,
    nombre: "Pachamanca",
    descripcion: "Carne, papas y hierbas andinas cocidas bajo tierra.",
    precio: 30.0,
    cantidad: 5,
    imagen: "https://www.comida-peruana.com/base/stock/Recipe/pachamanca-a-la-olla/pachamanca-a-la-olla_web.jpg"
  }
];

let editandoId = null;

// Función principal para mostrar el menú
function mostrarMenu(vista) {
  const contenedor = document.getElementById("contenedor-menu");
  contenedor.innerHTML = "";

  comidas.forEach((comida) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.style.position = "relative";

    tarjeta.innerHTML = `
      <img src="${comida.imagen}" alt="${comida.nombre}">
      <h2>${comida.nombre}</h2>
      <p>${comida.descripcion}</p>
      <p><strong>S/ ${comida.precio.toFixed(2)}</strong></p>
      <p>Disponibles: ${comida.cantidad}</p>
    `;

    if (vista === "admin") {
      const botonAcciones = document.createElement("button");
      botonAcciones.textContent = "⋮";
      botonAcciones.classList.add("btn-acciones");

      // Menú de opciones oculto
      const menuOpciones = document.createElement("div");
      menuOpciones.classList.add("opciones");

      const btnEditar = document.createElement("button");
      btnEditar.textContent = "✏️ Editar";
      btnEditar.addEventListener("click", () => {
        menuOpciones.style.display = "none";
        editarComida(comida.id);
      });

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "🗑️ Eliminar";
      btnEliminar.addEventListener("click", () => {
        eliminarComida(comida.id);
      });

      menuOpciones.appendChild(btnEditar);
      menuOpciones.appendChild(btnEliminar);

      tarjeta.appendChild(botonAcciones);
      tarjeta.appendChild(menuOpciones);

      botonAcciones.addEventListener("click", () => {
        menuOpciones.style.display =
          menuOpciones.style.display === "flex" ? "none" : "flex";
      });

      // Cerrar menú si se hace clic fuera
      document.addEventListener("click", (e) => {
        if (!tarjeta.contains(e.target)) {
          menuOpciones.style.display = "none";
        }
      });
    }

    contenedor.appendChild(tarjeta);
  });
}

// Eliminar
function eliminarComida(id) {
  comidas = comidas.filter((c) => c.id !== id);
  mostrarMenu("admin");
}

// Editar
function editarComida(id) {
  const comida = comidas.find((c) => c.id === id);
  if (!comida) return;

  document.getElementById("modal").classList.remove("oculto");
  document.getElementById("titulo-modal").textContent = "Editar Plato";

  document.getElementById("nombre").value = comida.nombre;
  document.getElementById("descripcion").value = comida.descripcion;
  document.getElementById("precio").value = comida.precio;
  document.getElementById("cantidad").value = comida.cantidad;
  document.getElementById("imagen").value = comida.imagen;

  editandoId = id;
}

// Abrir modal para agregar
function abrirModal() {
  document.getElementById("modal").classList.remove("oculto");
  document.getElementById("titulo-modal").textContent = "Agregar Plato";

  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("imagen").value = "";

  editandoId = null;
}

// Guardar cambios o agregar nuevo
document.getElementById("guardar")?.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value;
  const descripcion = document.getElementById("descripcion").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const imagen = document.getElementById("imagen").value;

  if (!nombre || !descripcion || !precio || !cantidad || !imagen) {
    alert("Por favor llena todos los campos.");
    return;
  }

  if (editandoId) {
    // Editar
    const comida = comidas.find((c) => c.id === editandoId);
    comida.nombre = nombre;
    comida.descripcion = descripcion;
    comida.precio = precio;
    comida.cantidad = cantidad;
    comida.imagen = imagen;
  } else {
    // Agregar
    const nuevaComida = {
      id: Date.now(),
      nombre,
      descripcion,
      precio,
      cantidad,
      imagen
    };
    comidas.push(nuevaComida);
  }

  document.getElementById("modal").classList.add("oculto");
  mostrarMenu("admin");
});

// Cancelar modal
document.getElementById("cancelar")?.addEventListener("click", () => {
  document.getElementById("modal").classList.add("oculto");
});
