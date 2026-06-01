const API_BASE_URL = 'http://localhost:4000';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const excursionId = urlParams.get('id');
    const detalleContainer = document.getElementById('detalleContainer');
    const reviewsList = document.getElementById('reviewsList');
    const reviewForm = document.getElementById('reviewForm');
    const reviewAuthMessage = document.getElementById('reviewAuthMessage');

    // Adaptar cabecera según sesión
    updateHeaderSession();

    if (!excursionId) {
        detalleContainer.innerHTML = '<div class="loader">Error: No se especificó ninguna ruta. <a href="rutas.html" style="color: var(--highlight-color);">Volver a las rutas</a></div>';
        return;
    }

    // Cargar datos de la excursión y reseñas
    fetchExcursionDetails(excursionId);
    fetchReviews(excursionId);
    setupReviewForm(excursionId);

    async function fetchExcursionDetails(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/excursiones/${id}`);
            if (!response.ok) throw new Error('No se pudo cargar el detalle de la excursión');
            const excursion = await response.json();
            renderExcursion(excursion);
            initMap(excursion);
        } catch (error) {
            detalleContainer.innerHTML = `<div class="loader">Error al cargar la ruta: ${error.message}</div>`;
            console.error(error);
        }
    }

    function renderExcursion(excursion) {
        // Actualizar título de la página
        document.title = `Bizkaibide | ${excursion.titulo}`;

        const imageUrl = excursion.imagenes && excursion.imagenes.length > 0 ? excursion.imagenes[0] : '../img/imagen1.jpeg';
        const dificultadLabel = excursion.dificultad ? excursion.dificultad.replace('-', ' / ') : 'Sin dificultad';
        const dificultadClass = (excursion.dificultad || 'otros').toLowerCase().replace(/\s+/g, '-');
        const categoria = excursion.categoria || 'Senderismo';

        detalleContainer.innerHTML = `
            <div class="detalle-header">
                <h1>${excursion.titulo}</h1>
                <div class="detalle-badges">
                    <span class="badge categoria">${categoria}</span>
                    <span class="badge ${dificultadClass}">${dificultadLabel}</span>
                </div>
            </div>

            <div class="detalle-top-section">
                <div class="media-gallery">
                    <img src="${imageUrl}" alt="${excursion.titulo}">
                </div>
                <div class="map-box">
                    <div class="map-title">🗺️ Ubicación de la Ruta</div>
                    <div id="map"></div>
                </div>
            </div>

            <div class="metrics-row">
                <div class="metric-card">
                    <span class="metric-icon">📏</span>
                    <span class="metric-title">Distancia</span>
                    <span class="metric-desc">${excursion.distancia ?? 'N/A'} km</span>
                </div>
                <div class="metric-card">
                    <span class="metric-icon">⏱️</span>
                    <span class="metric-title">Tiempo est.</span>
                    <span class="metric-desc">${excursion.tiempo_estimado || 'N/A'}</span>
                </div>
                <div class="metric-card">
                    <span class="metric-icon">📈</span>
                    <span class="metric-title">Desnivel</span>
                    <span class="metric-desc">${excursion.desnivel ?? 'N/A'} m</span>
                </div>
                <div class="metric-card">
                    <span class="metric-icon">🚌</span>
                    <span class="metric-title">Transporte</span>
                    <span class="metric-desc">${excursion.transporte_recomendado || 'N/A'}</span>
                </div>
                <div class="metric-card gps-card">
                    <span class="metric-icon">📍</span>
                    <span class="metric-title">Coordenadas GPS</span>
                    <span class="metric-desc" style="font-size: 0.95rem; font-weight: normal;">
                        Lat: ${excursion.latitud ?? 'N/A'}<br>Long: ${excursion.longitud ?? 'N/A'}
                    </span>
                </div>
            </div>

            <div class="descripcion-box">
                <h2>Descripción del Recorrido</h2>
                <p>${excursion.descripcion || 'No hay descripción disponible para esta excursión.'}</p>
            </div>
        `;
    }

    function initMap(excursion) {
        const lat = excursion.latitud || 43.2630; // Coordenadas por defecto (Bilbao) si no hay lat
        const lng = excursion.longitud || -2.9350;
        const zoom = excursion.latitud && excursion.longitud ? 13 : 9;

        const map = L.map('map').setView([lat, lng], zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        if (excursion.latitud && excursion.longitud) {
            L.marker([lat, lng]).addTo(map)
                .bindPopup(`<b>${excursion.titulo}</b><br>${excursion.categoria || ''}`)
                .openPopup();
        }
    }

    async function fetchReviews(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/reviews/?excursionId=${id}`);
            if (!response.ok) throw new Error('No se pudieron obtener las reseñas');
            const reviews = await response.json();
            renderReviews(reviews);
        } catch (error) {
            reviewsList.innerHTML = `<p class="no-reviews" style="color: #ff8b8b;">Error al cargar las reseñas: ${error.message}</p>`;
            console.error(error);
        }
    }

    function renderReviews(reviews) {
        if (reviews.length === 0) {
            reviewsList.innerHTML = '<p class="no-reviews">No hay valoraciones para esta ruta todavía. ¡Sé el primero en opinar!</p>';
            return;
        }

        reviewsList.innerHTML = '';
        reviews.forEach(review => {
            const dateStr = review.created_at ? new Date(review.created_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : 'Fecha no disponible';

            const userInitials = (review.usuario_nombre || 'U').substring(0, 2);
            const starsFilled = '★'.repeat(review.puntuacion);
            const starsEmpty = '☆'.repeat(5 - review.puntuacion);

            const item = document.createElement('div');
            item.className = 'review-item';
            item.innerHTML = `
                <div class="review-header">
                    <div class="review-user-info">
                        <div class="user-avatar">${userInitials}</div>
                        <span class="user-name">${review.usuario_nombre || 'Usuario Anónimo'}</span>
                    </div>
                    <div class="review-meta">
                        <span class="review-stars">${starsFilled}<span style="opacity: 0.3;">${starsEmpty}</span></span>
                        <span class="review-date">${dateStr}</span>
                    </div>
                </div>
                <p class="review-text">${review.texto || ''}</p>
            `;
            reviewsList.appendChild(item);
        });
    }

    function setupReviewForm(id) {
        const user = getLoggedUser();

        if (user) {
            // Usuario está logueado
            reviewAuthMessage.classList.add('hidden');
            reviewForm.classList.remove('hidden');

            reviewForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const puntuacionElement = reviewForm.querySelector('input[name="puntuacion"]:checked');
                const textoElement = document.getElementById('reviewText');

                if (!puntuacionElement) {
                    alert('Por favor selecciona una puntuación en estrellas');
                    return;
                }

                const rating = parseInt(puntuacionElement.value);
                const comment = textoElement.value.trim();

                const btnSubmit = document.getElementById('btnSubmitReview');
                btnSubmit.disabled = true;
                btnSubmit.textContent = 'Enviando...';

                try {
                    const response = await fetch(`${API_BASE_URL}/api/reviews/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            excursion_id: parseInt(id),
                            usuario_id: user.id,
                            puntuacion: rating,
                            texto: comment
                        })
                    });

                    if (!response.ok) {
                        const errData = await response.json();
                        throw new Error(errData.error || 'Error al guardar la reseña');
                    }

                    // Reiniciar formulario y refrescar lista
                    reviewForm.reset();
                    await fetchReviews(id);
                } catch (error) {
                    alert(error.message);
                } finally {
                    btnSubmit.disabled = false;
                    btnSubmit.textContent = 'Enviar Valoración';
                }
            });
        } else {
            // Usuario no logueado
            reviewAuthMessage.classList.remove('hidden');
            reviewForm.classList.add('hidden');
        }
    }

    function updateHeaderSession() {
        const user = getLoggedUser();
        const authContainer = document.querySelector('.auth-buttons');
        
        if (user && authContainer) {
            authContainer.innerHTML = `
                <span class="user-greeting" style="margin-right: 1rem; font-weight: 600; font-size: 0.95rem; color: var(--highlight-color);">
                    Hola, ${user.nombre}
                </span>
                <button id="btnLogoutSession" class="btn-login" style="cursor: pointer; background: transparent;">
                    Salir
                </button>
            `;

            document.getElementById('btnLogoutSession').addEventListener('click', () => {
                localStorage.removeItem('bizkaibideUser');
                window.location.reload();
            });
        }
    }

    function getLoggedUser() {
        try {
            return JSON.parse(localStorage.getItem('bizkaibideUser')) || null;
        } catch {
            return null;
        }
    }
});
