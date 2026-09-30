document.addEventListener("DOMContentLoaded", () => {
    
    // Elementos del DOM
    const track = document.getElementById('track');
    const slides = document.querySelectorAll('.slide');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const indicadoresContenedor = document.getElementById('indicadores');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // 1. Generar los indicadores (puntitos) dinámicamente según la cantidad de slides
    slides.forEach((_, index) => {
        const punto = document.createElement('div');
        punto.classList.add('punto');
        if (index === 0) punto.classList.add('activo');
        
        // Al hacer clic en un punto, vamos a esa diapositiva específica
        punto.addEventListener('click', () => {
            irASlide(index);
        });
        
        indicadoresContenedor.appendChild(punto);
    });

    const puntos = document.querySelectorAll('.punto');

    // 2. Función principal para deslizar la pista de diapositivas
    function irASlide(index) {
        // Evitar que el índice se salga de los límites (antes del inicio o después del final)
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;

        currentSlide = index;

        // Mueve el contenedor principal horizontalmente (-100vw por cada slide)
        track.style.transform = `translateX(-${currentSlide * 100}vw)`;

        // Actualizar qué puntito de abajo está iluminado
        puntos.forEach(p => p.classList.remove('activo'));
        puntos[currentSlide].classList.add('activo');

        // Desactivar el botón "Atrás" en la primera lámina y "Adelante" en la última
        btnPrev.style.opacity = currentSlide === 0 ? '0.2' : '1';
        btnPrev.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';

        btnNext.style.opacity = currentSlide === totalSlides - 1 ? '0.2' : '1';
        btnNext.style.pointerEvents = currentSlide === totalSlides - 1 ? 'none' : 'auto';
    }

    // 3. Control de los botones laterales
    btnNext.addEventListener('click', () => irASlide(currentSlide + 1));
    btnPrev.addEventListener('click', () => irASlide(currentSlide - 1));

    // 4. Navegación fluida por teclado para el expositor
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            // Avanza con flecha derecha o barra espaciadora
            irASlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft') {
            // Retrocede con flecha izquierda
            irASlide(currentSlide - 1);
        }
    });

    // Iniciar la presentación en la primera lámina
    irASlide(0);
});