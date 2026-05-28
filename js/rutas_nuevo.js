const API_BASE_URL = 'http://localhost:4000';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-routes');
    const difficultyChips = document.querySelectorAll('.filter-chip');
    const sortSelect = document.getElementById('sort-routes');
    const resultsCount = document.getElementById('results-count');
    const rutasGrid = document.getElementById('rutasGrid');

    let excursiones = [];
    let activeDifficulty = 'todos';
    let searchQuery = '';

    async function fetchExcursiones() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/excursiones`);
            if (!response.ok) throw new Error('No se pudo cargar la lista de excursiones');
            excursiones = await response.json();
            renderExcursiones(excursiones);
            filterAndSortCards();
        } catch (error) {
            resultsCount.textContent = 'Error al cargar las rutas. Revisa el backend.';
            console.error(error);
        }
    }

    function renderExcursiones(list) {
        rutasGrid.innerHTML = '';
        list.forEach((excursion) => {
            const card = document.createElement('div');
            card.className = 'ruta-card';
            card.dataset.dificultad = excursion.dificultad || 'otros';
            card.dataset.distancia = excursion.distancia || 0;
            card.dataset.tiempo = parseFloat((excursion.tiempo_estimado || '0').replace(',', '.')) || 0;
            card.dataset.desnivel = excursion.desnivel || 0;

            const imageUrl = excursion.imagenes.length > 0 ? excursion.imagenes[0] : '../img/imagen1.jpeg';
            const dificultadLabel = excursion.dificultad ? excursion.dificultad.replace('-', ' / ') : 'Sin dificultad';
            const dificultadClass = (excursion.dificultad || 'otros').toLowerCase().replace(/\s+/g, '-');

            card.innerHTML = `
                <div class="ruta-img-container">
                    <img src="${imageUrl}" alt="${excursion.titulo}">
                    <span class="dificultad-badge ${dificultadClass}">${dificultadLabel}</span>
                </div>
                <div class="ruta-content">
                    <h3>${excursion.titulo}</h3>
                    <p class="ruta-descripcion">${excursion.descripcion}</p>
                    <div class="ruta-metrics">
                        <div class="metric-item">
                            <span class="metric-label">Distancia</span>
                            <span class="metric-value">${excursion.distancia ?? 'N/A'} km</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">Tiempo</span>
                            <span class="metric-value">${excursion.tiempo_estimado || 'N/A'}</span>
                        </div>
                        <div class="metric-item">
                            <span class="metric-label">Desnivel</span>
                            <span class="metric-value">${excursion.desnivel ?? 'N/A'} m</span>
                        </div>
                    </div>
                    <button class="btn-explorar" type="button">Explorar Ruta</button>
                </div>
            `;

            const button = card.querySelector('.btn-explorar');
            button.addEventListener('click', () => {
                alert(`Más información de la ruta → ${excursion.titulo}.\nTransporte recomendado: ${excursion.transporte_recomendado || 'N/A'}.`);
            });

            rutasGrid.appendChild(card);
        });
    }

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterAndSortCards();
    });

    difficultyChips.forEach(chip => {
        chip.addEventListener('click', () => {
            difficultyChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeDifficulty = chip.getAttribute('data-dificultad');
            filterAndSortCards();
        });
    });

    sortSelect.addEventListener('change', () => {
        filterAndSortCards();
    });

    function filterAndSortCards() {
        const cards = Array.from(rutasGrid.children);
        let visibleCount = 0;

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.ruta-descripcion').textContent.toLowerCase();
            const category = card.querySelector('.dificultad-badge').textContent.toLowerCase();
            const difficulty = card.dataset.dificultad.toLowerCase();
            const matchesSearch = title.includes(searchQuery) || description.includes(searchQuery) || category.includes(searchQuery);
            const matchesDifficulty = activeDifficulty === 'todos' || difficulty === activeDifficulty;

            if (matchesSearch && matchesDifficulty) {
                card.style.display = '';
                visibleCount += 1;
            } else {
                card.style.display = 'none';
            }
        });

        const visibleCards = cards.filter(card => card.style.display !== 'none');
        const sortBy = sortSelect.value;
        if (sortBy !== 'relevancia') {
            visibleCards.sort((a, b) => {
                const valA = parseFloat(a.dataset[sortBy]) || 0;
                const valB = parseFloat(b.dataset[sortBy]) || 0;
                return valA - valB;
            });
            visibleCards.forEach(card => rutasGrid.appendChild(card));
        }

        updateCounter(visibleCount, cards.length);
    }

    function updateCounter(visible, total) {
        if (total === 0) {
            resultsCount.textContent = 'No hay rutas disponibles.';
            return;
        }
        if (visible === total) {
            resultsCount.textContent = `Mostrando las ${total} rutas`;
        } else if (visible === 1) {
            resultsCount.textContent = 'Mostrando 1 ruta encontrada';
        } else if (visible === 0) {
            resultsCount.textContent = 'No se encontraron rutas para tu búsqueda';
        } else {
            resultsCount.textContent = `Mostrando ${visible} de ${total} rutas`;
        }
    }

    fetchExcursiones();
});
