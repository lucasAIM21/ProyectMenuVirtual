const form = document.getElementById("form-producto");
const cancelarBtn = document.getElementById("cancelar");
const tablaProductos = document.getElementById("tabla-productos");
const categoriaSelect = document.getElementById("categoria");
const categoriaPreview = document.getElementById("categoria-preview");

// Cargar categorías al iniciar
async function cargarCategorias() {
    try {
        const res = await fetch("/api/categorias");
        const categorias = await res.json();

        categoriaSelect.innerHTML = "";
        categorias.forEach(c => {
            const option = document.createElement("option");
            option.value = c.id;
            option.textContent = c.nombre; // fallback, algunos navegadores no muestran <img> en option
            option.dataset.imagen = c.imagen; // guardar ruta imagen en dataset
            categoriaSelect.appendChild(option);
        });

        actualizarPreview();
    } catch (err) {
        console.error("❌ Error cargando categorías:", err);
    }
}

function actualizarPreview() {
    const opt = categoriaSelect.selectedOptions[0];
    if (!opt) return;
    const icon = opt.dataset.icon;
    if (icon) {
        categoriaPreview.src = icon;
        categoriaPreview.style.display = "inline-block";
    } else {
        categoriaPreview.style.display = "none";
    }
}

categoriaSelect.addEventListener("change", actualizarPreview);

// Cargar productos al iniciar
async function cargarProductos() {
    try {
        const res = await fetch("/api/productos");
        const productos = await res.json();

        tablaProductos.innerHTML = "";
        productos.forEach(p => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>${p.precio}</td>
                <td>${p.descripcion || ""}</td>
                <td>${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}" width="100">` : ""}</td>
                <td>
                     ${p.categoria ? `<img src="${p.categoria.icono}" width="30"> ${p.categoria.nombre}` : ""}
                </td>
                <td>
                    <button onclick="editarProducto(${p.id}, '${p.nombre}', ${p.precio}, '${p.descripcion || ""}', '${p.imagen || ""}')">Editar</button>
                    <button onclick="eliminarProducto(${p.id})">Eliminar</button>
                </td>
            `;
            tablaProductos.appendChild(fila);
        });
    } catch (err) {
        console.error("❌ Error cargando productos:", err);
    }
}


// Guardar (crear o editar)
form.onsubmit = async (e) => {
    e.preventDefault();

    const id = document.getElementById("producto-id").value;
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const descripcion = document.getElementById("descripcion").value;
    const imagen = document.getElementById("imagen").value;
    const CategoriaId = document.getElementById("categoria").value;

    const producto = { nombre, precio, descripcion, imagen, CategoriaId };

    try {
        let res;
        if (id) {
            // Editar producto
            res = await fetch(`/api/productos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto)
            });
        } else {
            // Crear producto
            res = await fetch("/api/productos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(producto)
            });
        }

        const data = await res.json();
        console.log("✅ Respuesta servidor:", data);

        if (res.ok) {
            alert(id ? "Producto actualizado ✅" : "Producto creado ✅");
            form.reset();
            document.getElementById("producto-id").value = "";
            cancelarBtn.style.display = "none";
            cargarProductos();
        } else {
            alert("❌ Error: " + data.error);
        }
    } catch (err) {
        console.error("❌ Error en fetch:", err);
    }
};

// Editar producto (rellenar formulario)
window.editarProducto = (id, nombre, precio, descripcion, image, CategoriaId) => {
    document.getElementById("producto-id").value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("precio").value = precio;
    document.getElementById("descripcion").value = descripcion;
    document.getElementById("imagen").value = image;
    document.getElementById("categoria").value = CategoriaId;
    cancelarBtn.style.display = "inline";
};

// Cancelar edición
cancelarBtn.onclick = () => {
    form.reset();
    document.getElementById("producto-id").value = "";
    cancelarBtn.style.display = "none";
};

// Eliminar producto
window.eliminarProducto = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este producto?")) return;
    try {
        const res = await fetch(`/api/productos/${id}`, { method: "DELETE" });
        const data = await res.json();
        console.log("🗑️ Producto eliminado:", data);
        if (res.ok) {
            cargarProductos();
        } else {
            alert("❌ Error: " + data.error);
        }
    } catch (err) {
        console.error("❌ Error al eliminar:", err);
    }
};

// Inicial
cargarCategorias();
cargarProductos();
