// ============================================
// Gorkha Kitchen - Interactive JavaScript
// ============================================

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        }
    });
});

// Gallery: List of image filenames from /images folder
const galleryImages = [
    '07_95_biryani_01.jpg',
    'a45df21f1fe6efb5dc4344437b77b69a.jpg',
    'Gorkha Kitchen (1800 x 910 mm)1023kb.png',
    'Gorkha Kitchen (650 x 099mm).png',
    'gorkha restudent (5).png',
    'Jhol-Momo-in-spicy-tomato-sauce-nepali-recipe.jpg',
    'MOMO-500x500.jpg',
    'P039922454_480.jpg',
    'Tibetan-Veggie-Momos-1.jpg.webp',
    'ゴルカキッチン (630 x 99 mm) (630 x 99 mm) (650 x 99 mm)100円.png',
    'ゴルカキッチン20251120(550ⅹ110mm).png'
];

// Filter out non-image files (videos, PDFs, etc.)
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const validGalleryImages = galleryImages.filter(filename => {
    const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
    return imageExtensions.includes(ext);
});

// Load gallery images dynamically
function loadGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    validGalleryImages.forEach((imageName, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'col-md-4 col-sm-6 gallery-item fade-in-on-scroll';
        galleryItem.setAttribute('data-index', index);

        const img = document.createElement('img');
        img.src = `images/${imageName}`;
        img.alt = `Gallery Image ${index + 1}`;
        img.loading = 'lazy';
        img.onerror = function() {
            // Hide items with broken images
            galleryItem.style.display = 'none';
        };

        galleryItem.appendChild(img);
        galleryItem.addEventListener('click', () => openGalleryModal(index));
        galleryGrid.appendChild(galleryItem);
    });

    // Trigger fade-in animations on scroll
    observeElements();
}

// Open gallery modal with specific image
function openGalleryModal(index) {
    const modal = new bootstrap.Modal(document.getElementById('galleryModal'));
    const modalImage = document.getElementById('modalImage');
    
    currentImageIndex = index;
    updateModalImage();
    modal.show();

    // Update modal image alt text
    modalImage.alt = `Gallery Image ${index + 1}`;
}

// Global variable to track current image index
let currentImageIndex = 0;

// Update modal image
function updateModalImage() {
    const modalImage = document.getElementById('modalImage');
    if (modalImage && validGalleryImages[currentImageIndex]) {
        modalImage.src = `images/${validGalleryImages[currentImageIndex]}`;
        modalImage.alt = `Gallery Image ${currentImageIndex + 1}`;
    }
}

// Navigation buttons for gallery modal
document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateGallery(-1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateGallery(1);
        });
    }

    // Keyboard navigation for gallery modal
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('galleryModal');
        if (modal && modal.classList.contains('show')) {
            if (e.key === 'ArrowLeft') {
                navigateGallery(-1);
            } else if (e.key === 'ArrowRight') {
                navigateGallery(1);
            } else if (e.key === 'Escape') {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) {
                    bsModal.hide();
                }
            }
        }
    });
});

// Navigate gallery (prev/next)
function navigateGallery(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = validGalleryImages.length - 1;
    } else if (currentImageIndex >= validGalleryImages.length) {
        currentImageIndex = 0;
    }
    
    updateModalImage();
}

// Intersection Observer for fade-in animations on scroll
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in-on-scroll class
    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Add fade-in-on-scroll class to menu cards
document.addEventListener('DOMContentLoaded', function() {
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach((card, index) => {
        card.classList.add('fade-in-on-scroll');
        // Stagger animation delay
        card.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load gallery
    loadGallery();

    // Observe all fade-in elements
    observeElements();

    // Add fade-in-on-scroll to about section elements
    const aboutElements = document.querySelectorAll('.about-section .fade-in-left, .about-section .fade-in-right');
    aboutElements.forEach(el => {
        el.classList.add('fade-in-on-scroll');
        el.classList.remove('fade-in-left', 'fade-in-right');
    });

    // Update active nav link on page load
    updateActiveNavLink();

    // Handle modal close and reset
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        galleryModal.addEventListener('hidden.bs.modal', function() {
            // Reset to first image when modal closes (optional)
            // currentImageIndex = 0;
        });
    }
});

// Lazy loading enhancement for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Preload hero image for better performance
const preloadImage = document.createElement('link');
preloadImage.rel = 'preload';
preloadImage.as = 'image';
preloadImage.href = 'images/gorkha restudent (5).png';
document.head.appendChild(preloadImage);

// Console message (for debugging)
console.log('🍜 Gorkha Kitchen website loaded successfully!');

