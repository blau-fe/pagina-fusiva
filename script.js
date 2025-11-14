document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Smooth Scrolling para el menú de navegación ---
    // Busca los enlaces del menú que apuntan a secciones de la página.
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Evita el salto brusco
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- 2. Funcionalidad del carrusel de CÁPSULAS ---
    // Selecciona los botones y el contenedor específicos para el carrusel de cápsulas.
    const nextBtnCatalogo = document.getElementById('next-btn-catalogo');
    const prevBtnCatalogo = document.getElementById('prev-btn-catalogo');
    const trackCatalogo = document.getElementById('track-catalogo');

    // Se asegura de que los elementos existan antes de añadir la funcionalidad.
    if(nextBtnCatalogo && prevBtnCatalogo && trackCatalogo){
        nextBtnCatalogo.addEventListener('click', () => {
            // Mueve el carrusel hacia la derecha
            trackCatalogo.scrollBy({ left: 366, behavior: 'smooth' }); // 350px de ancho de tarjeta + 16px de espacio
        });
        prevBtnCatalogo.addEventListener('click', () => {
            // Mueve el carrusel hacia la izquierda
            trackCatalogo.scrollBy({ left: -366, behavior: 'smooth' });
        });
    }
    
    // --- 3. Funcionalidad del carrusel de PODCAST ---
    // Selecciona los botones y el contenedor específicos para el carrusel de podcast.
    const nextBtnPodcast = document.getElementById('next-btn-podcast');
    const prevBtnPodcast = document.getElementById('prev-btn-podcast');
    const trackPodcast = document.getElementById('track-podcast');

    // Se asegura de que los elementos existan antes de añadir la funcionalidad.
    if(nextBtnPodcast && prevBtnPodcast && trackPodcast){
        nextBtnPodcast.addEventListener('click', () => {
            trackPodcast.scrollBy({ left: 366, behavior: 'smooth' });
        });
        prevBtnPodcast.addEventListener('click', () => {
            trackPodcast.scrollBy({ left: -366, behavior: 'smooth' });
        });
    }

    // --- 4. Funcionalidad para el formulario de Formspree ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener("submit", async function(e) {
            e.preventDefault(); // Evita que la página se recargue
            const data = new FormData(form);
            
            try {
                // Intenta enviar los datos al endpoint de Formspree
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                // Si el envío fue exitoso...
                if (response.ok) {
                    formStatus.innerHTML = "¡Gracias por tu mensaje! Lo hemos recibido.";
                    form.reset(); // Limpia el formulario
                } else {
                    // Si hubo un error en el servidor...
                    formStatus.innerHTML = "Oops! Hubo un problema al enviar tu formulario.";
                }
            } catch (error) {
                // Si hubo un error de red...
                formStatus.innerHTML = "Oops! Hubo un problema de conexión.";
            }
        });
    }

    // --- 4. Funcionalidad del carrusel de IASITORIO ---
// Selecciona los botones y el contenedor específicos para el nuevo carrusel.
const nextBtnIasitorio = document.getElementById('next-btn-iasitorio');
const prevBtnIasitorio = document.getElementById('prev-btn-iasitorio');
const trackIasitorio = document.getElementById('track-iasitorio');

// Se asegura de que los elementos existan antes de añadir la funcionalidad.
if(nextBtnIasitorio && prevBtnIasitorio && trackIasitorio){
    nextBtnIasitorio.addEventListener('click', () => {
        // Mueve el carrusel hacia la derecha
        trackIasitorio.scrollBy({ left: 366, behavior: 'smooth' }); // 350px de ancho de tarjeta + 1.5rem (24px) de espacio
    });
    prevBtnIasitorio.addEventListener('click', () => {
        // Mueve el carrusel hacia la izquierda
        trackIasitorio.scrollBy({ left: -366, behavior: 'smooth' });
    });
}

});