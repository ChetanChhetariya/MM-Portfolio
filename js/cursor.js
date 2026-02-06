// ================================
// CUSTOM CURSOR
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Check if device supports hover (not touch device)
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    
    if (!isTouchDevice) {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let followerX = 0;
        let followerY = 0;
        
        // Update mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Animate cursor
        function animateCursor() {
            // Cursor follows mouse immediately
            cursorX += (mouseX - cursorX) * 0.9;
            cursorY += (mouseY - cursorY) * 0.9;
            
            // Follower has delay
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .nav-link, .contact-link');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        });
        
        // Special cursor for project cards
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                cursorFollower.style.width = '80px';
                cursorFollower.style.height = '80px';
                cursorFollower.style.borderColor = 'var(--accent)';
            });
            
            card.addEventListener('mouseleave', () => {
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
                cursorFollower.style.borderColor = 'white';
            });
        });
        
    } else {
        // Hide cursors on touch devices
        document.querySelector('.cursor').style.display = 'none';
        document.querySelector('.cursor-follower').style.display = 'none';
        document.body.style.cursor = 'auto';
    }
    
});