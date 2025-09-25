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

// Funcionalidad para las pestañas de navegación
document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los botones de navegación
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    
    // Agregar event listeners a cada botón
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el target de la pestaña
            const targetId = this.getAttribute('data-bs-target');
            const targetTab = document.querySelector(targetId);
            
            if (targetTab) {
                // Ocultar todas las pestañas
                const allTabs = document.querySelectorAll('.tab-pane');
                allTabs.forEach(tab => {
                    tab.classList.remove('show', 'active');
                });
                
                // Remover clase active de todos los botones
                const allButtons = document.querySelectorAll('.nav-link');
                allButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                
                // Mostrar la pestaña seleccionada
                targetTab.classList.add('show', 'active');
                
                // Marcar el botón como activo
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
            }
        });
    });
});

// Funcionalidad para la sección Candy Bar
document.addEventListener('DOMContentLoaded', function() {
    // Juego del dulce escondido
    const findCandyBtn = document.getElementById('findCandy');
    const candyResult = document.getElementById('candyResult');
    
    if (findCandyBtn && candyResult) {
        findCandyBtn.addEventListener('click', function() {
            const dulces = [
                '🍫 Chocolate con almendras',
                '🍬 Caramelo de fresa',
                '🍭 Piruleta de limón',
                '🍪 Galleta de chocolate',
                '🧁 Cupcake de vainilla',
                '🍰 Pastel de chocolate',
                '🍡 Malvavisco rosa',
                '🍦 Helado de vainilla'
            ];
            
            const dulceEncontrado = dulces[Math.floor(Math.random() * dulces.length)];
            candyResult.textContent = `¡Encontraste: ${dulceEncontrado}! 🎉`;
            
            // Efecto visual
            candyResult.style.animation = 'none';
            candyResult.offsetHeight; // Trigger reflow
            candyResult.style.animation = 'candyFound 0.5s ease-in-out';
        });
    }
    
    // Efectos para los botones de dulces
    const candyButtons = document.querySelectorAll('.btn-candy');
    candyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const dulce = this.closest('.candy-card').querySelector('.card-title').textContent;
            alert(`¡Perfecto! Has seleccionado: ${dulce} 🍬\n\nEste dulce virtual está siendo preparado especialmente para ti. ¡Disfruta!`);
            
            // Efecto de confeti virtual
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Efectos para las recetas
    const recipeItems = document.querySelectorAll('.list-group-item');
    recipeItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const receta = this.querySelector('h5').textContent;
            const descripcion = this.querySelector('p').textContent;
            
            // Mostrar modal con la receta
            showRecipeModal(receta, descripcion);
        });
    });
});

// Función para mostrar modal de receta
function showRecipeModal(titulo, descripcion) {
    // Crear modal dinámicamente
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'recipeModal';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">🍰 ${titulo}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>${descripcion}</p>
                    <div class="recipe-details">
                        <h6>Ingredientes principales:</h6>
                        <ul>
                            <li>Harina de trigo</li>
                            <li>Azúcar</li>
                            <li>Huevos</li>
                            <li>Mantequilla</li>
                            <li>Esencia de vainilla</li>
                        </ul>
                        <h6>Tiempo de preparación:</h6>
                        <p>30-45 minutos</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary">Guardar Receta</button>
                </button>
            </div>
        </div>
    `;
    
    // Agregar modal al body
    document.body.appendChild(modal);
    
    // Mostrar modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
    
    // Limpiar modal después de cerrar
    modal.addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(modal);
    });
}