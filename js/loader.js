// ================================
// FULL SCREEN PAGE LOADER
// ================================

window.addEventListener('load', function() {
    
    const loader = document.querySelector('.page-loader');
    const loaderLogo = document.querySelector('.loader-logo');
    const loaderText = document.querySelector('.loader-text');
    
    // Animate logo
    if (loaderLogo) {
        loaderLogo.style.animation = 'logoSpin 1.5s ease-in-out';
    }
    
    // Animate text
    if (loaderText) {
        loaderText.style.animation = 'textPulse 1.5s ease-in-out infinite';
    }
    
    // Hide loader after 2 seconds
    setTimeout(() => {
        if (loader) {
            loader.classList.add('loader-hidden');
            
            // Remove from DOM after animation
            setTimeout(() => {
                loader.remove();
                document.body.classList.add('loaded');
            }, 600);
        }
    }, 2000);
    
});

// Prevent scrolling while loader is active
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 2600);
});