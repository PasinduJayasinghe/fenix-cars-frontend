// Clone testimonials for infinite scroll
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonials-track');
    if (track) {
        const clonedItems = [...track.children].map(item => item.cloneNode(true));
        clonedItems.forEach(item => track.appendChild(item));
    }
})
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
        }
    });
});

// Hide loading screen after all resources are loaded
window.addEventListener('load', function() {
    const loader = document.querySelector('.loading-screen');
    if (!loader) return;
    // Trigger fade-out transition defined in CSS
    loader.classList.add('hidden');

    const removeLoader = function() {
        if (loader && loader.parentNode) {
            loader.parentNode.removeChild(loader);
        }
    };

    // Remove from DOM after transition completes
    loader.addEventListener('transitionend', removeLoader, { once: true });
    // Fallback in case transitionend doesn't fire
    setTimeout(removeLoader, 800);
});

// Hero video overlay transition
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.querySelector('.hero-video-background');
    const heroVideoElement = document.querySelector('.hero-video-background video');
    
    if (heroVideo && heroVideoElement) {
        // Start video after a delay to show background image first
        setTimeout(() => {
            heroVideo.classList.add('playing');
        }, 2000); // 2 second delay to show background image
        
        // Handle video loading
        heroVideoElement.addEventListener('loadeddata', () => {
            console.log('Hero video loaded and ready to play');
        });
        
        // Handle video errors
        heroVideoElement.addEventListener('error', () => {
            console.log('Hero video failed to load, showing background image only');
        });
    }
});

// Scroll-based section reveals with varied animations per section
document.addEventListener('DOMContentLoaded', function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Map sections to different reveal styles
    const sectionSelectors = [
        '.hero-section',
        '.car-models-section',
        '.features-section',
        '.special-discounts-section .discount-content',
        '.special-discounts-section .discount-image',
        '.testimonials-section',
        '.page-header',
        '.about-hero-section',
        '.about-content-section .about-text-content',
        '.about-content-section .about-image-content',
        '.about-features-section .about-feature-card',
        '.services-section .service-card',
        '.contact-hero-section',
        '.contact-section .contact-form-container',
        '.contact-section .contact-info-container',
        '.map-section',
        '.footer'
    ];

    const revealClasses = [
        ['reveal-base', 'reveal-up'],
        ['reveal-base', 'reveal-right'],
        ['reveal-base', 'reveal-left'],
        ['reveal-base', 'reveal-up'],
        ['reveal-base', 'reveal-right'],
        ['reveal-base', 'reveal-zoom'],
        ['reveal-base', 'reveal-up'],
        ['reveal-base', 'reveal-up'],
        ['reveal-base', 'reveal-left'],
        ['reveal-base', 'reveal-right'],
        ['reveal-base', 'reveal-up'],
        ['reveal-base', 'reveal-up'],
        ['reveal-base', 'reveal-up'],
        ['reveal-base', 'reveal-left'],
        ['reveal-base', 'reveal-right'],
        ['reveal-base', 'reveal-up'],
        ['reveal-base', 'reveal-up']
    ];

    const elements = [];
    
    sectionSelectors.forEach((sel, idx) => {
        if (sel === '.services-section .service-card' || sel === '.about-features-section .about-feature-card') {
            // Handle multiple cards
            const cards = document.querySelectorAll(sel);
            cards.forEach(card => {
                elements.push({ el: card, classes: revealClasses[idx] });
            });
        } else {
            // Handle single elements
            const el = document.querySelector(sel);
            if (el) {
                elements.push({ el, classes: revealClasses[idx] });
            }
        }
    });

    elements.forEach(({ el, classes }) => {
        el.classList.add(...classes);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    elements.forEach(({ el }) => observer.observe(el));
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show success message (in a real implementation, this would send to a server)
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
});