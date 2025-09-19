async function CargarMenu() {
    try{
        const response = await fetch("/routes/productos");
        const productos = await response.json();

        const menu = document.getElementById("menu");
        menu.innerHTML="";

        productos.forEach(p => {
            const item = document.createElement("div");
            item.classList.add("platillo");

            item.innerHTML= `
                <img src="/imgs/${p.imagen}" alt="${p.nombre}">
                <div class = "platillo-info">
                <h2>${p.nombre}</h2>
                <p>${p.descripcion}<p>
                <p class="precio">S/.${p.precio}<p>
                </div>
            `;
            menu.appendChild(item);
        });
    }catch (err) {
        console.error("Error al cargar menu: ",err);
    }
}

CargarMenu();