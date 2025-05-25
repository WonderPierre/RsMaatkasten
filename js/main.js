// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll behavior
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down & past the header
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up or at the top
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
            // Here you would typically send the data to your backend
            // For now, we'll just log it and show a success message
            console.log('Form data:', data);
            
            // Show success message
            alert('Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.');
            contactForm.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Er is een fout opgetreden. Probeer het later opnieuw of neem telefonisch contact op.');
        }
    });
}

// Enhanced Portfolio lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const portfolioGrid = document.querySelector('.portfolio-grid');
let currentImageIndex = 0;
let portfolioImages = [];

// Get all portfolio images
const updatePortfolioImages = () => {
    portfolioImages = Array.from(document.querySelectorAll('.portfolio-item img')).map(img => ({
        src: img.src,
        alt: img.alt
    }));
};

updatePortfolioImages();

// Open lightbox
const openLightbox = (image, index) => {
    lightbox.classList.add('active');
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    currentImageIndex = index;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
};

// Close lightbox
const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = ''; // Re-enable scrolling
};

// Navigate to previous image
const showPrevImage = () => {
    currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
    lightboxImg.src = portfolioImages[currentImageIndex].src;
    lightboxImg.alt = portfolioImages[currentImageIndex].alt;
};

// Navigate to next image
const showNextImage = () => {
    currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
    lightboxImg.src = portfolioImages[currentImageIndex].src;
    lightboxImg.alt = portfolioImages[currentImageIndex].alt;
};

// Event Listeners
if (portfolioGrid) {
    portfolioGrid.addEventListener('click', (e) => {
        const portfolioItem = e.target.closest('.portfolio-item');
        if (portfolioItem) {
            const img = portfolioItem.querySelector('img');
            if (img) {
                const index = portfolioImages.findIndex(image => image.src === img.src);
                openLightbox(img, index);
            }
        }
    });
}

// Close lightbox when clicking close button or outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        closeLightbox();
    }
});

// Previous and Next buttons
document.querySelector('.lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevImage();
});

document.querySelector('.lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    showNextImage();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll); 