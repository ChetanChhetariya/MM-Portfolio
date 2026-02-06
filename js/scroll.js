// ================================
// SCROLL ANIMATIONS WITH GSAP
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // ================================
    // SCROLL PROGRESS BAR
    // ================================
    
    window.addEventListener('scroll', () => {
        const scrollProgress = document.querySelector('.scroll-progress');
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
    
    // ================================
    // SMOOTH SCROLL FOR NAVIGATION
    // ================================
    
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
            }
        });
    });
    
    // ================================
    // SECTION HEADERS ANIMATION
    // ================================
    
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.querySelector('.section-number'), {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        gsap.from(header.querySelector('.section-title'), {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });
        
        gsap.from(header.querySelector('.section-subtitle'), {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.4,
            ease: 'power3.out'
        });
    });
    
    // ================================
    // ABOUT SECTION - LARGE TEXT
    // ================================
    
    gsap.from('.large-text', {
        scrollTrigger: {
            trigger: '.large-text',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });
    
    // ================================
    // JOURNEY STEPS ANIMATION
    // ================================
    
    gsap.utils.toArray('.journey-step').forEach((step, index) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out'
        });
    });
    
    // ================================
    // PROJECT CARDS ANIMATION
    // ================================
    
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 80,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });
    
    // ================================
    // HIGHLIGHT UNDERLINE ANIMATION
    // ================================
    
    gsap.utils.toArray('.highlight').forEach(highlight => {
        gsap.from(highlight, {
            scrollTrigger: {
                trigger: highlight,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            '--underline-width': '0%',
            duration: 1.2,
            ease: 'power2.out'
        });
    });
    
    // ================================
    // HOW TO NAVIGATE SECTION
    // ================================
    
    gsap.from('.navigate-content h3', {
        scrollTrigger: {
            trigger: '.navigate-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.navigate-content p', {
        scrollTrigger: {
            trigger: '.navigate-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    // ================================
    // CONTACT LINKS ANIMATION
    // ================================
    
    gsap.utils.toArray('.contact-link').forEach((link, index) => {
        gsap.from(link, {
            scrollTrigger: {
                trigger: link,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            x: -60,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out'
        });
    });
    
    // ================================
    // PARALLAX EFFECT (Light)
    // ================================
    
    gsap.utils.toArray('.hero-title .word').forEach((word, index) => {
        gsap.to(word, {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: (index + 1) * 30,
            opacity: 0.5,
            ease: 'none'
        });
    });
    
    // ================================
    // FADE IN HERO BRIEF NOTE
    // ================================
    
    gsap.from('.hero-brief-note', {
        scrollTrigger: {
            trigger: '.hero-brief-note',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    // ================================
    // NAVIGATION BACKGROUND ON SCROLL
    // ================================
    
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');
        
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(247, 245, 242, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        } else {
            nav.style.backgroundColor = 'rgba(247, 245, 242, 0.95)';
            nav.style.boxShadow = 'none';
        }
    });
    
    // ================================
    // FOOTER FADE IN
    // ================================
    
    gsap.from('.footer', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // ================================
    // REFRESH SCROLLTRIGGER ON LOAD
    // ================================
    
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });
    
    // ================================
    // UPDATE ON RESIZE
    // ================================
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
    
});