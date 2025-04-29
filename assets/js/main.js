document.addEventListener('DOMContentLoaded', () => {
    // Menu mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;

    function updateToggleVisibility() {
        const isActive = sidebar.classList.contains('active');
        mobileMenuToggle.style.opacity = isActive ? '0' : '1';
        mobileMenuToggle.style.visibility = isActive ? 'hidden' : 'visible';
    }

    function closeMenu() {
        sidebar.classList.remove('active');
        body.classList.remove('sidebar-active');
        updateToggleVisibility();
    }

    function toggleMenu() {
        sidebar.classList.toggle('active');
        body.classList.toggle('sidebar-active');
        updateToggleVisibility();
    }

    // Gestion du clic sur le bouton
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Fermeture au clic extérieur
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 &&
            !sidebar.contains(e.target) &&
            !e.target.closest('.mobile-menu-toggle')) {
            closeMenu();
        }
    });

    // Fermeture au redimensionnement
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });


    // Configuration de la pagination
    let currentPage = 1;
    let totalPages = 1;
    const perPage = 10;
    const allPosts = Array.from(document.querySelectorAll('.post-card'));
    let filteredPosts = [];

    // Éléments DOM
    const postsContainer = document.getElementById('postsContainer');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const pageIndicator = document.getElementById('pageIndicator');

    // Fonction principale de filtrage et pagination
    function applyFiltersAndPagination() {
        // 1. Filtrer les articles
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const sortOrder = dateFilter.value;

        filteredPosts = allPosts.filter(post => {
            const title = post.querySelector('h3').textContent.toLowerCase();
            const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
            const category = post.dataset.category;
            
            return (title.includes(searchTerm) || excerpt.includes(searchTerm)) &&
                   (selectedCategory ? category === selectedCategory : true);
        });

        // 2. Trier les articles
        filteredPosts.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return sortOrder === 'recent' ? dateB - dateA : dateA - dateB;
        });

        // 3. Pagination
        totalPages = Math.ceil(filteredPosts.length / perPage);
        currentPage = Math.min(currentPage, totalPages);
        
        // 4. Afficher la page courante
        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        const postsToShow = filteredPosts.slice(start, end);

        // Vider le conteneur
        postsContainer.innerHTML = '';
        postsToShow.forEach(post => postsContainer.appendChild(post.cloneNode(true)));

        // Mettre à jour l'interface
        pageIndicator.textContent = `Page ${currentPage} sur ${totalPages}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    // Gestionnaires d'événements
    searchInput.addEventListener('input', () => {
        currentPage = 1;
        applyFiltersAndPagination();
    });

    categoryFilter.addEventListener('change', () => {
        currentPage = 1;
        applyFiltersAndPagination();
    });

    dateFilter.addEventListener('change', () => {
        currentPage = 1;
        applyFiltersAndPagination();
    });

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            applyFiltersAndPagination();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            applyFiltersAndPagination();
        }
    });

    // Initialisation
    applyFiltersAndPagination();

    // Cacher tous les articles initiaux
    allPosts.forEach(post => post.style.display = 'none');


});