// ================================
// EXTREME SCROLL ANIMATIONS
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Register GSAP ScrollTrigger
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // ================================
    // SCROLL PROGRESS BAR
    // ================================
    
    window.addEventListener('scroll', () => {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (scrollProgress) {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / scrollHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        }
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
    // INTERSECTION OBSERVER - REVEALS
    // ================================
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // ================================
    // SECTION HEADERS
    // ================================
    
    document.querySelectorAll('.section-header').forEach(header => {
        revealObserver.observe(header);
        
        const number = header.querySelector('.section-number');
        const title = header.querySelector('.section-title');
        const subtitle = header.querySelector('.section-subtitle');
        
        if (number) revealObserver.observe(number);
        if (title) revealObserver.observe(title);
        if (subtitle) revealObserver.observe(subtitle);
    });
    
    // ================================
    // ABOUT SECTION
    // ================================
    
    document.querySelectorAll('.large-text').forEach(el => {
        revealObserver.observe(el);
    });
    
    document.querySelectorAll('.journey-step').forEach(step => {
        revealObserver.observe(step);
    });
    
    // ================================
    // PROJECT CARDS
    // ================================
    
    document.querySelectorAll('.project-card').forEach(card => {
        revealObserver.observe(card);
    });
    
    // ================================
    // CONTACT LINKS
    // ================================
    
    document.querySelectorAll('.contact-link').forEach(link => {
        revealObserver.observe(link);
    });
    
    // ================================
    // HOW TO NAVIGATE
    // ================================
    
    const navigateContent = document.querySelector('.navigate-content');
    if (navigateContent) {
        revealObserver.observe(navigateContent);
    }
    
    // ================================
    // NAVIGATION BEHAVIOR
    // ================================
    
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav');
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            nav.style.backgroundColor = 'rgba(247, 245, 242, 0.98)';
            nav.style.boxShadow = '0 6px 40px rgba(44, 102, 110, 0.12)';
            nav.style.backdropFilter = 'blur(12px)';
        } else {
            nav.style.backgroundColor = 'rgba(247, 245, 242, 0.95)';
            nav.style.boxShadow = 'none';
            nav.style.backdropFilter = 'blur(6px)';
        }
        
        // Hide/show nav on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            nav.style.transform = 'translateY(-110%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Add smooth transition to nav
    const nav = document.querySelector('.nav');
    if (nav) {
        nav.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    // ================================
    // MOBILE MENU TOGGLE
    // ================================
    
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // ================================
    // HERO PARALLAX
    // ================================
    
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero && window.scrollY < window.innerHeight) {
            const scrolled = window.scrollY;
            const heroTitle = hero.querySelector('.hero-title');
            
            if (heroTitle) {
                heroTitle.style.transform = `translateY(${scrolled * 0.4}px)`;
                heroTitle.style.opacity = 1 - (scrolled / 1000);
            }
        }
    });
    
    // ================================
    // ACTIVE NAVIGATION
    // ================================
    
    const sections = document.querySelectorAll('.section');
    const navLinksArray = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.style.color = 'var(--primary)';
                link.style.fontWeight = '700';
            } else {
                link.style.color = 'var(--text-primary)';
                link.style.fontWeight = '500';
            }
        });
    });
    
    // ================================
    // GSAP ADVANCED ANIMATIONS
    // ================================
    
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        
        // Section number rotation on scroll
        gsap.utils.toArray('.section-number').forEach(num => {
            gsap.from(num, {
                scrollTrigger: {
                    trigger: num,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                rotation: 720,
                scale: 0,
                duration: 1,
                ease: 'back.out(2)'
            });
        });
        
        // Parallax on images
        gsap.utils.toArray('.project-image').forEach(img => {
            gsap.to(img, {
                scrollTrigger: {
                    trigger: img,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -50,
                ease: 'none'
            });
        });
    }
    
    // ================================
    // REFRESH ON LOAD & RESIZE
    // ================================
    
    window.addEventListener('load', () => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 250);
    });
    
});