document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Smooth Scrolling para el menú de navegación ---
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- 2. Funcionalidad del carrusel de CÁPSULAS ---
    const nextBtnCatalogo = document.getElementById('next-btn-catalogo');
    const prevBtnCatalogo = document.getElementById('prev-btn-catalogo');
    const trackCatalogo = document.getElementById('track-catalogo');

    if (nextBtnCatalogo && trackCatalogo) {
        nextBtnCatalogo.addEventListener('click', () => {
            trackCatalogo.scrollBy({ left: 316, behavior: 'smooth' });
        });
        prevBtnCatalogo.addEventListener('click', () => {
            trackCatalogo.scrollBy({ left: -316, behavior: 'smooth' });
        });
    }

    // --- 3. Funcionalidad del carrusel de PODCAST ---
    const nextBtnPodcast = document.getElementById('next-btn-podcast');
    const prevBtnPodcast = document.getElementById('prev-btn-podcast');
    const trackPodcast = document.getElementById('track-podcast');

    if (nextBtnPodcast && trackPodcast) {
        nextBtnPodcast.addEventListener('click', () => {
            trackPodcast.scrollBy({ left: 316, behavior: 'smooth' });
        });
        prevBtnPodcast.addEventListener('click', () => {
            trackPodcast.scrollBy({ left: -316, behavior: 'smooth' });
        });
    }

    // --- 4. Funcionalidad del Lightbox de Video ---
    // (Este código se mantiene igual, lo incluyo para que tengas el archivo completo)
    const videoTriggers = document.querySelectorAll('.video-trigger');
    const lightbox = document.getElementById('video-lightbox');
    const closeLightboxBtn = document.getElementById('close-lightbox');
    const videoContainer = document.getElementById('video-container');

    if (lightbox) {
        videoTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const videoSrc = trigger.getAttribute('data-video-src');
                if (videoSrc) {
                    videoContainer.innerHTML = `<iframe src="${videoSrc}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
                    lightbox.classList.remove('hidden');
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.add('hidden');
            videoContainer.innerHTML = '';
        };
        closeLightboxBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // --- 5. NUEVO: Funcionalidad para el formulario de Formspree ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener("submit", async function(e) {
            e.preventDefault();
            const data = new FormData(form);
            
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.innerHTML = "¡Gracias por tu mensaje! Lo hemos recibido.";
                    form.reset();
                } else {
                    const responseData = await response.json();
                    if (Object.hasOwn(responseData, 'errors')) {
                        formStatus.innerHTML = responseData.errors.map(error => error.message).join(", ");
                    } else {
                        formStatus.innerHTML = "Oops! Hubo un problema al enviar tu formulario.";
                    }
                }
            } catch (error) {
                formStatus.innerHTML = "Oops! Hubo un problema al enviar tu formulario.";
            }
        });
    }
});