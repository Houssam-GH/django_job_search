// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-container input[type="text"]');
    const locationInput = document.querySelector('.search-container input[type="text"]:last-of-type');
    const jobTypeSelect = document.querySelector('.job-type-select');
    const jobCategorySelect = document.querySelector('.job-category-select');

    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        const location = locationInput.value.trim();
        
        if (searchTerm || location) {
            alert(`Searching for: ${searchTerm} in ${location}`);
        } else {
            alert('Please enter a job title or location');
        }
    });

    // Jobs Slider functionality
    const slider = document.querySelector('.jobs-slider');
    const slides = document.querySelectorAll('.jobs-slide');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    let currentSlide = 0;

    function updateSlider() {
        const slideWidth = slides[0].offsetWidth;
        slider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            updateSlider();
        }
    });

    // Apply button functionality
    const applyButtons = document.querySelectorAll('.apply-btn');
    applyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const jobTitle = button.parentElement.querySelector('h3').textContent;
            alert(`Applying for: ${jobTitle}`);
        });
    });

    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Add hover effect for job cards
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Companies Slider
    const companiesGrid = document.querySelector('.companies-grid');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let companiesCurrentSlide = 0;
    const slidesPerView = 3;
    const totalSlides = Math.ceil(document.querySelectorAll('.company-card').length / slidesPerView);

    function updateCompaniesSlider() {
        const slideWidth = 100 / slidesPerView;
        const offset = companiesCurrentSlide * slideWidth;
        companiesGrid.style.transform = `translateX(-${offset}%)`;
    }

    prevArrow.addEventListener('click', () => {
        if (companiesCurrentSlide > 0) {
            companiesCurrentSlide--;
            updateCompaniesSlider();
        }
    });

    nextArrow.addEventListener('click', () => {
        if (companiesCurrentSlide < totalSlides - 1) {
            companiesCurrentSlide++;
            updateCompaniesSlider();
        }
    });

    // Jobs List Page Functionality
    // Filter functionality
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    const resetFiltersBtn = document.querySelector('.reset-filters-btn');
    const filterCheckboxes = document.querySelectorAll('.checkbox-container input');
    const jobsListCards = document.querySelectorAll('.job-card');
    const jobsSearchInput = document.querySelector('.jobs-header .search-box input');
    const sortSelect = document.querySelector('.sort-options select');
    const pageButtons = document.querySelectorAll('.page-btn');

    // Apply filters
    applyFiltersBtn.addEventListener('click', () => {
        const selectedFilters = {
            jobType: Array.from(document.querySelectorAll('input[name="job-type"]:checked')).map(cb => cb.value),
            experience: Array.from(document.querySelectorAll('input[name="experience"]:checked')).map(cb => cb.value),
            workMode: Array.from(document.querySelectorAll('input[name="work-mode"]:checked')).map(cb => cb.value),
            salary: Array.from(document.querySelectorAll('input[name="salary"]:checked')).map(cb => cb.value)
        };

        jobsListCards.forEach(card => {
            const jobType = card.querySelector('.job-tags span:first-child').textContent.toLowerCase();
            const workMode = card.querySelector('.job-tags span:nth-child(2)').textContent.toLowerCase();
            const salary = card.querySelector('.job-tags span:last-child').textContent;

            const matchesJobType = selectedFilters.jobType.length === 0 || selectedFilters.jobType.includes(jobType);
            const matchesWorkMode = selectedFilters.workMode.length === 0 || selectedFilters.workMode.includes(workMode);
            const matchesSalary = selectedFilters.salary.length === 0 || selectedFilters.salary.some(range => {
                if (range === '0-50k') return salary.includes('$0') || salary.includes('$50k');
                if (range === '50k-100k') return salary.includes('$50k') || salary.includes('$100k');
                if (range === '100k+') return salary.includes('$100k') || salary.includes('$150k');
                return false;
            });

            card.style.display = matchesJobType && matchesWorkMode && matchesSalary ? 'grid' : 'none';
        });
    });

    // Reset filters
    resetFiltersBtn.addEventListener('click', () => {
        filterCheckboxes.forEach(cb => cb.checked = false);
        jobsListCards.forEach(card => card.style.display = 'grid');
    });

    // Search functionality
    jobsSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        jobsListCards.forEach(card => {
            const jobTitle = card.querySelector('h3').textContent.toLowerCase();
            const company = card.querySelector('.company').textContent.toLowerCase();
            const description = card.querySelector('.job-description').textContent.toLowerCase();
            
            const matches = jobTitle.includes(searchTerm) || 
                          company.includes(searchTerm) || 
                          description.includes(searchTerm);
            
            card.style.display = matches ? 'grid' : 'none';
        });
    });

    // Sort functionality
    sortSelect.addEventListener('change', (e) => {
        const sortBy = e.target.value;
        const jobsArray = Array.from(jobsListCards);
        
        jobsArray.sort((a, b) => {
            if (sortBy === 'newest') return 0; // Assuming newest is already in order
            if (sortBy === 'oldest') return 0; // Assuming oldest is already in order
            
            if (sortBy === 'salary-high' || sortBy === 'salary-low') {
                const salaryA = parseInt(a.querySelector('.job-tags span:last-child').textContent.match(/\d+/)[0]);
                const salaryB = parseInt(b.querySelector('.job-tags span:last-child').textContent.match(/\d+/)[0]);
                return sortBy === 'salary-high' ? salaryB - salaryA : salaryA - salaryB;
            }
        });

        const jobsGrid = document.querySelector('.jobs-grid');
        jobsArray.forEach(job => jobsGrid.appendChild(job));
    });

    // Pagination
    pageButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('active')) return;
            
            pageButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Here you would typically fetch new jobs for the selected page
            // For now, we'll just scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Companies slider for homepage (horizontal, all companies in one row)
    if (document.querySelector('.companies-slider-container')) {
        const companiesGrid = document.querySelector('.companies-grid');
        const companyCards = Array.from(companiesGrid.querySelectorAll('.company-card'));
        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');
        let currentIndex = 0;
        const visibleCount = 3;
        const total = companyCards.length;

        function updateCompaniesSlider() {
            // Move the grid horizontally by percentage
            const percent = (100 / total) * currentIndex;
            companiesGrid.style.transform = `translateX(-${percent}%)`;
        }

        prevArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCompaniesSlider();
            }
        });

        nextArrow.addEventListener('click', () => {
            if (currentIndex < total - visibleCount) {
                currentIndex++;
                updateCompaniesSlider();
            }
        });

        // Set width of grid and cards for smooth sliding
        companiesGrid.style.width = `${(100 / visibleCount) * total}%`;
        companyCards.forEach(card => {
            card.style.flex = `0 0 ${100 / total}%`;
            card.style.maxWidth = `${100 / total}%`;
            card.style.display = 'block';
        });

        updateCompaniesSlider();
        window.addEventListener('resize', updateCompaniesSlider);
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}); 