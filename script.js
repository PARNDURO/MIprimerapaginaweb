document.getElementById ('imageInput').addEventListener('change', function(event){
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
    files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e){
            const div = document.createElement('div');
            div.classList.add('carousel-item');
            if (index === 0){
                div.classList.add('active');

            }
            div.innerHTML = `<img src="${e.target.result}" class="d-block w-100 img-fluid" alt="Imagen ${index +1}">
            `;
            carouselImages.appendChild(div);
        };
        reader.readAsDataURL(file);
    });
    carouselContainer.style.display = 'block';
}
)