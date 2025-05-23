// Variables para el slider
let currentImageIndex = 0;
let galleryImages = [];
const sliderModal = document.getElementById('sliderModal');
const sliderImage = document.getElementById('sliderImage');
const paginationContainer = document.getElementById('pagination');
const closeBtn = document.querySelector('.close-btn');

// Función para abrir el slider con las imágenes correspondientes
document.querySelectorAll('.image-thumbnail').forEach((img, index) => {
    img.addEventListener('click', function() {
        const galleryName = img.getAttribute('data-gallery');
        
        // Aquí puedes definir las imágenes específicas para cada galería
        galleryImages = getGalleryImages(galleryName);

        // Abrir el modal y mostrar la primera imagen
        sliderModal.style.display = 'flex';
        currentImageIndex = 0;
        showImage(currentImageIndex);
        generatePagination(galleryImages.length);
    });
});

// Función para mostrar una imagen en el slider
function showImage(index) {
    sliderImage.src = galleryImages[index];
    updatePagination(index);
}

// Función para cambiar de imagen en el slider
function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    showImage(currentImageIndex);
}

// Función para obtener las imágenes de la galería seleccionada
function getGalleryImages(galleryName) {
    // Definir las imágenes para cada galería
    const galleries = {
        'ArbolMerkle': [
            'images/infografias/ArbolMerkle/Artboard 2.png',
            'images/infografias/ArbolMerkle/Artboard 3.png',
            'images/infografias/ArbolMerkle/Artboard 4.png'
        ],
        'Blockchain': [
            'images/infografias/Blockchain 1/Artboard 2-100.jpg',
            'images/infografias/Blockchain 1/Artboard 3-100.jpg',
            'images/infografias/Blockchain 1/Artboard 4-100.jpg'
        ],
        'Dapps': [
            'images/infografias/Dapps/Artboard 2.png',
            'images/infografias/Dapps/Artboard 4.png'
        ],
        'Estructura': [
            'images/infografias/ESTRUCTURA/Artboard 2.png',
            'images/infografias/ESTRUCTURA/Artboard 3.png',
            'images/infografias/ESTRUCTURA/Artboard 4.png',
            'images/infografias/ESTRUCTURA/Artboard 5.png'
        ],
        'FirmaDigital': [
            'images/infografias/FIRMADIGITAL/Artboard 2.png',
            'images/infografias/FIRMADIGITAL/Artboard 3.png',
            'images/infografias/FIRMADIGITAL/Artboard 4.png'
        ],
        'Hash': [
            'images/infografias/HASH/Artboard 2.png',
            'images/infografias/HASH/Artboard 3.png',
            'images/infografias/HASH/Artboard 4.png',
            'images/infografias/HASH/Artboard 5.png'
        ],
        'Ppos': [
            'images/infografias/PPoS/Artboard 2-100.jpg',
            'images/infografias/PPoS/Artboard 3-100.jpg',
            'images/infografias/PPoS/Artboard 4-100.jpg'
        ],
        'ProtocolosConsenso': [
            'images/infografias/Protocolos de Consenso/Artboard 2-100.jpg',
            'images/infografias/Protocolos de Consenso/Artboard 3-100.jpg',
            'images/infografias/Protocolos de Consenso/Artboard 4-100.jpg'
        ],
        'SmartContract': [
            'images/infografias/Smart Contract/Artboard 2.png',
            'images/infografias/Smart Contract/Artboard 3.png',
            'images/infografias/Smart Contract/Artboard 4.png',
            'images/infografias/Smart Contract/Artboard 5.png'
        ],
        'Wallet': [
            'images/infografias/Wallet/Artboard 2.png',
            'images/infografias/Wallet/Artboard 3.png',
            'images/infografias/Wallet/Artboard 4.png',
            'images/infografias/Wallet/Artboard 5.png',
            'images/infografias/Wallet/Artboard 6.png',
            'images/infografias/Wallet/Artboard 7.png'
        ]
    };

    return galleries[galleryName] || [];
}

function generatePagination(numImages) {
    paginationContainer.innerHTML = ''; // Limpiar cualquier contenido previo
    for (let i = 0; i < numImages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('pagination-dot');
        dot.addEventListener('click', () => {
            currentImageIndex = i;
            showImage(i);
        });
        paginationContainer.appendChild(dot);
    }
    updatePagination(currentImageIndex); // Asegúrate de que el primer punto esté seleccionado
}

// Función para actualizar el punto seleccionado
function updatePagination(index) {
    const dots = document.querySelectorAll('.pagination-dot');
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('selected');
        } else {
            dot.classList.remove('selected');
        }
    });
}

// Cerrar el slider cuando se hace clic en la 'X'
closeBtn.addEventListener('click', () => {
    sliderModal.style.display = 'none';
});

// Cerrar el slider si se hace clic fuera de la imagen (en el fondo del modal)
sliderModal.addEventListener('click', function(event) {
    if (event.target === sliderModal) {
        sliderModal.style.display = 'none';
    }
});

// Navegación con teclado
document.addEventListener('keydown', function(event) {
    if (sliderModal.style.display === 'flex') { // Solo si el modal está abierto
        switch(event.key) {
            case 'ArrowLeft':
                changeImage(-1); // Ir a la imagen anterior
                break;
            case 'ArrowRight':
                changeImage(1);  // Ir a la imagen siguiente
                break;
            case 'Escape':
                event.preventDefault();
                sliderModal.style.display = 'none'; // Cerrar con ESC
                break;
        }
    }
});
