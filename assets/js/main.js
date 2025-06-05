document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
            mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
        });

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 &&
                !mainNav.contains(e.target) &&
                !e.target.closest('.mobile-menu-toggle')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                mobileMenuToggle.querySelector('i').classList.add('fa-bars');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                mobileMenuToggle.querySelector('i').classList.add('fa-bars');
            }
        });

        mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                    mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }


    let currentPage = 1;
    let totalPages = 1;
    const perPage = 10;
    const allPosts = Array.from(document.querySelectorAll('.post-card'));
    let filteredPosts = [];

    const postsContainer = document.getElementById('postsContainer');
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const pageIndicator = document.getElementById('pageIndicator');

    function applyFiltersAndPagination() {
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

        filteredPosts.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return sortOrder === 'recent' ? dateB - dateA : dateA - dateB;
        });

        totalPages = Math.ceil(filteredPosts.length / perPage);
        currentPage = Math.min(currentPage, totalPages);

        const start = (currentPage - 1) * perPage;
        const end = start + perPage;
        const postsToShow = filteredPosts.slice(start, end);

        postsContainer.innerHTML = '';
        postsToShow.forEach(post => postsContainer.appendChild(post.cloneNode(true)));

        pageIndicator.textContent = `Page ${currentPage} sur ${totalPages}`;
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

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

    applyFiltersAndPagination();
    allPosts.forEach(post => post.style.display = 'none');
});