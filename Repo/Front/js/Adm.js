const form = document.getElementById("form-producto");
const cancelarBtn = document.getElementById("cancelar");
const tablaProductos = document.getElementById("tabla-productos");

// Cargar productos al iniciar
async function cargarProductos() {
    try {
        const res = await fetch("/api/productos");
        const productos = await res.json();

        tablaProductos.innerHTML = "";
        productos.forEach(p => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${p.ProductoID}</td>
                <td>${p.nombre}</td>
                <td>${p.Precio}</td>
                <td>${p.Ingredientes || ""}</td>
                <td>${p.RutaImagen || ""}</td>
                <td>
                    <button onclick="editarProducto(${p.ProductoID}, '${p.nombre}', ${p.Precio}, '${p.Ingredientes || ""}', '${p.RutaImagen || ""}')">Editar</button>
                    <button onclick="eliminarProducto(${p.ProductoID})">Eliminar</button>
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

    const producto = { nombre, precio, descripcion, imagen };

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
window.editarProducto = (id, nombre, precio, descripcion, imagen) => {
    document.getElementById("producto-id").value = id;
    document.getElementById("nombre").value = nombre;
    document.getElementById("precio").value = precio;
    document.getElementById("descripcion").value = descripcion;
    document.getElementById("imagen").value = imagen;
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
cargarProductos();
