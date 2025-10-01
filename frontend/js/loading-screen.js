// Execute when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('.navbar');

    // Initially hide the main content
    if (mainContent) {
        mainContent.style.opacity = '0';
    }

    let hasHidden = false;

    function hideLoadingScreen() {
        if (hasHidden) return; // Prevent multiple executions
        hasHidden = true;

        // Hide loading screen
        loadingScreen.classList.add('hidden');
        
        // Show main content
        if (mainContent) {
            mainContent.style.transition = 'opacity 0.5s ease-in';
            mainContent.style.opacity = '1';
        }
        
        // Remove the loading screen from DOM after animation
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }

    // When all content is loaded (images, styles, etc.)
    window.addEventListener('load', function() {
        setTimeout(hideLoadingScreen, 2000);
    });

    // Fallback: Force hide after maximum wait time (e.g., 5 seconds)
    setTimeout(function() {
        console.warn('Loading screen hidden via timeout fallback');
        hideLoadingScreen();
    }, 5000); // Adjust this timeout as needed
});