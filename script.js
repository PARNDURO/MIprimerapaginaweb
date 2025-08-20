document.getElementById('imageInput').addEventListener('change', function(event) {
    const files = Array.from(event.target.files);
    const carouselImages = document.getElementById('carouselImages');
    const carouselContainer = document.getElementById('carouselContainer');
    
    //ejemplo de una constante
    //const carousel = document.getElementById('carouselImages');

    // el nombre de la constante es carousel y el nombre del id es carouselImages

    carouselImages.innerHTML = '';// limipiar las imagenes anteriores
    if (files.length === 0){
        carouselContainer.style.display = 'none';
        return;
    }
    
    // Agregar las nuevas imágenes al carrusel existente
    files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const div = document.createElement('div');
            div.classList.add('carousel-item');
            
            // Solo la primera imagen nueva será activa si no hay imágenes existentes
            const existingItems = carouselImages.querySelectorAll('.carousel-item');
            if (existingItems.length === 0 && index === 0) {
                div.classList.add('active');
            }
            
            div.innerHTML = `<img src="${e.target.result}" class="d-block w-100 img-fluid" alt="Imagen ${existingItems.length + index + 1}">`;
            carouselImages.appendChild(div);
        };
        reader.readAsDataURL(file);
    });
    
    // Mostrar el carrusel si no está visible
    carouselContainer.style.display = 'block';
});

// Función para limpiar todas las imágenes del carrusel
function limpiarCarrusel() {
    const carouselImages = document.getElementById('carouselImages');
    carouselImages.innerHTML = '';
}

// Función para agregar una imagen específica
function agregarImagen(ruta, alt) {
    const carouselImages = document.getElementById('carouselImages');
    const carouselContainer = document.getElementById('carouselContainer');
    
    const div = document.createElement('div');
    div.classList.add('carousel-item');
    
    // Solo será activa si es la primera imagen
    const existingItems = carouselImages.querySelectorAll('.carousel-item');
    if (existingItems.length === 0) {
        div.classList.add('active');
    }
    
    div.innerHTML = `<img src="${ruta}" class="d-block w-100 img-fluid" alt="${alt}">`;
    carouselImages.appendChild(div);
    
    carouselContainer.style.display = 'block';
}