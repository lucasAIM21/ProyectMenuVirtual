const API = '/api/productos';
const tabla = document.getElementById('tabla-productos');
const form = document.getElementById('form-producto');
const cancelarBtn = document.getElementById('cancelar');
let editando = false;

function cargarProductos() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            tabla.innerHTML = '';
            data.forEach(prod => {
                tabla.innerHTML += `
                    <tr>
                        <td>${prod.id}</td>
                        <td>${prod.nombre}</td>
                        <td>${prod.precio}</td>
                        <td>${prod.descripcion || ''}</td>
                        <td>${prod.imagen ? `<img src="${prod.imagen}" width="50">` : ''}</td>
                        <td>
                            <button onclick="editarProducto(${prod.id}, '${prod.nombre}', ${prod.precio}, '${prod.descripcion || ''}', '${prod.imagen || ''}')">Editar</button>
                        </td>
                    </tr>
                `;
            });
        });
}

window.editarProducto = function(id, nombre, precio, descripcion, imagen) {
    document.getElementById('producto-id').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('precio').value = precio;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('imagen').value = imagen;
    editando = true;
    cancelarBtn.style.display = 'inline';
};

cancelarBtn.onclick = function() {
    form.reset();
    editando = false;
    cancelarBtn.style.display = 'none';
};

form.onsubmit = function(e) {
    e.preventDefault();
    const id = document.getElementById('producto-id').value;
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagen = document.getElementById('imagen').value;
    const datos = { nombre, precio, descripcion, imagen };
    if (editando && id) {
        fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        }).then(() => {
            form.reset();
            editando = false;
            cancelarBtn.style.display = 'none';
            cargarProductos();
        });
    } else {
        fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        }).then(() => {
            form.reset();
            cargarProductos();
        });
    }
};

cargarProductos();
