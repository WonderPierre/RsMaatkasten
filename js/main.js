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
    
    // Altijd header tonen als we bovenaan zijn (binnen eerste 100px)
    if (currentScroll <= 100) {
        header.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down & past the header - verberg header
        header.style.transform = 'translateY(-100%)';
    } else if (currentScroll < lastScroll) {
        // Scrolling up - toon header
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Contact form handling with PHP backend
const contactForm = document.getElementById('contactForm');
const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Disable submit button and show loading state
        if (submitButton) {
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Verzenden...';
            
            try {
                // Get form data
                const formData = new FormData(contactForm);
                const data = {
                    naam: formData.get('naam'),
                    email: formData.get('email'),
                    telefoon: formData.get('telefoon') || '',
                    bericht: formData.get('bericht')
                };
                
                // Send to PHP backend
                const response = await fetch('send-email.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Show success message
                    showFormMessage('success', result.message || 'Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.');
                    contactForm.reset();
                } else {
                    // Show error message
                    showFormMessage('error', result.message || 'Er is een fout opgetreden. Probeer het later opnieuw of neem telefonisch contact op.');
                }
                
            } catch (error) {
                console.error('Error submitting form:', error);
                
                // Check if it's a network error or server error
                let errorMessage = 'Er is een fout opgetreden bij het verzenden. ';
                
                if (error.message.includes('fetch')) {
                    errorMessage += 'Kan geen verbinding maken met de server. Controleer je internetverbinding.';
                } else if (error.message.includes('JSON')) {
                    errorMessage += 'Server antwoord is ongeldig.';
                } else {
                    errorMessage += 'Probeer het later opnieuw of neem telefonisch contact op via info@rsmaatkasten.be';
                }
                
                showFormMessage('error', errorMessage);
            } finally {
                // Re-enable submit button
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }
            }
        }
    });
}

// Function to show form messages
function showFormMessage(type, message) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message form-message-${type}`;
    messageEl.textContent = message;
    
    // Insert message before submit button
    if (contactForm && submitButton) {
        contactForm.insertBefore(messageEl, submitButton);
        
        // Scroll to message
        messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-remove after 8 seconds for success, 10 seconds for error
        const timeout = type === 'success' ? 8000 : 10000;
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.opacity = '0';
                messageEl.style.transition = 'opacity 0.3s ease-out';
                setTimeout(() => messageEl.remove(), 300);
            }
        }, timeout);
    } else {
        // Fallback to alert if form structure is different
        alert(message);
    }
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

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
}); 