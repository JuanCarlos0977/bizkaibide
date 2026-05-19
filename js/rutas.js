document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-routes');
    const difficultyChips = document.querySelectorAll('.filter-chip');
    const sortSelect = document.getElementById('sort-routes');
    const resultsCount = document.getElementById('results-count');
    const rutasGrid = document.querySelector('.rutas-grid');
    const rutaCards = Array.from(document.querySelectorAll('.ruta-card'));

    let activeDifficulty = 'todos';
    let searchQuery = '';

    // Initialize counter
    updateCounter(rutaCards.length, rutaCards.length);

    // 1. Search Input Handler
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterAndSortCards();
    });

    // 2. Difficulty Filter Chips Handler
    difficultyChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Update active chip styling
            difficultyChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            activeDifficulty = chip.getAttribute('data-dificultad');
            filterAndSortCards();
        });
    });

    // 3. Sort Select Handler
    sortSelect.addEventListener('change', () => {
        filterAndSortCards();
    });

    // 4. Filtering and Sorting Logic
    function filterAndSortCards() {
        let visibleCards = [];
        let hiddenCards = [];

        // Determine visibility
        rutaCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('.ruta-descripcion').textContent.toLowerCase();
            const difficulty = card.getAttribute('data-dificultad');

            const matchesSearch = title.includes(searchQuery) || description.includes(searchQuery);
            const matchesDifficulty = activeDifficulty === 'todos' || difficulty === activeDifficulty;

            if (matchesSearch && matchesDifficulty) {
                card.style.display = '';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                visibleCards.push(card);
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                hiddenCards.push(card);
            }
        });

        // Sort visible cards if order criteria selected
        const sortBy = sortSelect.value;
        if (sortBy !== 'relevancia') {
            visibleCards.sort((a, b) => {
                const valA = parseFloat(a.getAttribute(`data-${sortBy}`));
                const valB = parseFloat(b.getAttribute(`data-${sortBy}`));

                // Sort ascending for distance, time, and elevation
                return valA - valB;
            });
        }

        // Re-append sorted nodes to the grid container
        visibleCards.forEach(card => {
            rutasGrid.appendChild(card);
        });
        
        // Also re-append hidden cards (they are hidden but need to stay in grid)
        hiddenCards.forEach(card => {
            rutasGrid.appendChild(card);
        });

        updateCounter(visibleCards.length, rutaCards.length);
    }

    function updateCounter(visible, total) {
        if (visible === total) {
            resultsCount.textContent = `Mostrando las ${total} rutas`;
        } else if (visible === 1) {
            resultsCount.textContent = `Mostrando 1 ruta encontrada`;
        } else if (visible === 0) {
            resultsCount.textContent = `No se encontraron rutas para tu búsqueda`;
        } else {
            resultsCount.textContent = `Mostrando ${visible} de ${total} rutas`;
        }
    }
});
