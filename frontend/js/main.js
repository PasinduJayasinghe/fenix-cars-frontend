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