// ================================
// MOTION EFFECTS - OPTIMIZED & CONFLICT-FREE
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        console.log('Reduced motion preferred - skipping motion effects');
        return;
    }
    
    // ================================
    // INITIALIZATION FLAGS
    // ================================
    
    const effectsConfig = {
        floatingShapes: true,
        particleSystem: true,
        rotatingAccents: true,
        parallaxEffect: true,
        magneticCursor: true
    };
    
    // ================================
    // FLOATING VECTOR SHAPES
    // ================================
    
    function createFloatingShapes() {
        if (!effectsConfig.floatingShapes) return;
        
        const hero = document.querySelector('.hero');
        const about = document.querySelector('.about');
        const work = document.querySelector('.work');
        
        const sections = [
            { element: hero, count: 6, colors: ['#2C666E', '#D4A574', '#B7C4C2'] },
            { element: about, count: 5, colors: ['#B7C4C2', '#D4A574'] },
            { element: work, count: 4, colors: ['#2C666E', '#D4A574'] }
        ];
        
        sections.forEach(section => {
            if (!section.element) return;
            
            // Check if container already exists
            if (section.element.querySelector('.floating-shapes-container')) {
                console.log('Floating shapes already exist, skipping...');
                return;
            }
            
            const shapesContainer = document.createElement('div');
            shapesContainer.className = 'floating-shapes-container';
            
            for (let i = 0; i < section.count; i++) {
                const shape = createSVGShape(section.colors);
                shapesContainer.appendChild(shape);
            }
            
            section.element.style.position = 'relative';
            section.element.insertBefore(shapesContainer, section.element.firstChild);
        });
        
        console.log('✓ Floating shapes created');
    }
    
    function createSVGShape(colors) {
        const shapes = [
            // Circle
            `<circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="2"/>`,
            // Triangle
            `<polygon points="50,15 85,75 15,75" fill="none" stroke="currentColor" stroke-width="2"/>`,
            // Square
            `<rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(45 50 50)"/>`,
            // Hexagon
            `<polygon points="50,15 75,30 75,60 50,75 25,60 25,30" fill="none" stroke="currentColor" stroke-width="2"/>`,
        ];
        
        const size = Math.random() * 80 + 40; // 40-120px
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const wrapper = document.createElement('div');
        wrapper.className = 'floating-shape';
        wrapper.innerHTML = `
            <svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                ${shape}
            </svg>
        `;
        
        wrapper.style.cssText = `
            position: absolute;
            left: ${Math.random() * 90}%;
            top: ${Math.random() * 90}%;
            color: ${color};
            opacity: ${Math.random() * 0.25 + 0.1};
            animation: float${Math.floor(Math.random() * 3) + 1} ${Math.random() * 15 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        return wrapper;
    }
    
    // ================================
    // PARTICLE SYSTEM (2D CANVAS)
    // ================================
    
    function createParticleSystem() {
        if (!effectsConfig.particleSystem) return;
        
        // Check if canvas already exists
        if (document.querySelector('.particle-canvas')) {
            console.log('Particle canvas already exists, skipping...');
            return;
        }
        
        const canvas = document.createElement('canvas');
        canvas.className = 'particle-canvas';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let animationId;
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);
        
        // Track mouse with throttling
        let mouseTimeout;
        document.addEventListener('mousemove', (e) => {
            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            }, 16); // ~60fps
        });
        
        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
                this.opacity = Math.random() * 0.4 + 0.1;
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -10;
                this.speed = Math.random() * 0.8 + 0.3;
                this.size = Math.random() * 2.5 + 0.5;
                this.opacity = Math.random() * 0.4 + 0.1;
            }
            
            update() {
                this.y += this.speed;
                
                // Mouse interaction - only when close
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    const force = (80 - distance) / 80;
                    this.x -= (dx / distance) * force * 1.5;
                    this.y -= (dy / distance) * force * 1.5;
                }
                
                // Reset if out of bounds
                if (this.y > canvas.height + 10 || this.x < -10 || this.x > canvas.width + 10) {
                    this.reset();
                }
            }
            
            draw() {
                ctx.fillStyle = `rgba(44, 102, 110, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Create particles - reduced count for better performance
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            animationId = requestAnimationFrame(animate);
        }
        
        animate();
        
        console.log('✓ Particle system created');
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            cancelAnimationFrame(animationId);
        });
    }
    
    // ================================
    // ROTATING ACCENT ELEMENTS
    // ================================
    
    function createRotatingAccents() {
        if (!effectsConfig.rotatingAccents) return;
        
        const sections = document.querySelectorAll('.about, .work');
        
        sections.forEach((section, index) => {
            // Check if accent already exists
            if (section.querySelector('.rotating-accent')) {
                return;
            }
            
            const accent = document.createElement('div');
            accent.className = 'rotating-accent';
            accent.innerHTML = `
                <svg width="150" height="150" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="70" fill="none" stroke="#D4A574" stroke-width="1.5" opacity="0.3" stroke-dasharray="8 4"/>
                    <circle cx="100" cy="100" r="50" fill="none" stroke="#2C666E" stroke-width="1" opacity="0.2"/>
                </svg>
            `;
            
            accent.style.cssText = `
                position: absolute;
                top: ${index % 2 === 0 ? '15%' : '70%'};
                ${index % 2 === 0 ? 'right' : 'left'}: ${Math.random() * 10 + 5}%;
                pointer-events: none;
                opacity: 0.3;
                z-index: 0;
            `;
            
            section.style.position = 'relative';
            section.appendChild(accent);
        });
        
        console.log('✓ Rotating accents created');
    }
    
    // ================================
    // ENHANCED PARALLAX
    // ================================
    
    function enhancedParallax() {
        if (!effectsConfig.parallaxEffect) return;
        
        const parallaxElements = document.querySelectorAll('.floating-shape, .rotating-accent');
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    
                    parallaxElements.forEach((element, index) => {
                        const speed = (index % 3 + 1) * 0.3;
                        const rect = element.getBoundingClientRect();
                        
                        if (rect.top < window.innerHeight && rect.bottom > 0) {
                            const yPos = -(scrolled * speed * 0.1);
                            element.style.transform = `translateY(${yPos}px)`;
                        }
                    });
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
        
        console.log('✓ Parallax effect initialized');
    }
    
    // ================================
    // MAGNETIC CURSOR EFFECT
    // ================================
    
    function magneticCursor() {
        if (!effectsConfig.magneticCursor) return;
        
        const magneticElements = document.querySelectorAll('.project-card, .contact-link, .cta-button');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                // Reduced magnetic strength
                this.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
        
        console.log('✓ Magnetic cursor effect initialized');
    }
    
    // ================================
    // HERO BLOB BACKGROUND
    // ================================
    
    function createHeroBlob() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // Check if blob already exists
        if (hero.querySelector('.hero-blob-bg')) {
            return;
        }
        
        const blob = document.createElement('div');
        blob.className = 'hero-blob-bg';
        hero.insertBefore(blob, hero.firstChild);
        
        console.log('✓ Hero blob background created');
    }
    
    // ================================
    // INTERSECTION OBSERVER FOR PERFORMANCE
    // ================================
    
    function setupPerformanceObserver() {
        const sections = document.querySelectorAll('.hero, .about, .work, .contact');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const shapesContainer = entry.target.querySelector('.floating-shapes-container');
                const rotatingAccent = entry.target.querySelector('.rotating-accent');
                
                if (entry.isIntersecting) {
                    if (shapesContainer) shapesContainer.style.opacity = '1';
                    if (rotatingAccent) rotatingAccent.style.opacity = '0.3';
                } else {
                    if (shapesContainer) shapesContainer.style.opacity = '0';
                    if (rotatingAccent) rotatingAccent.style.opacity = '0';
                }
            });
        }, {
            threshold: 0.1
        });
        
        sections.forEach(section => observer.observe(section));
        
        console.log('✓ Performance observer setup');
    }
    
    // ================================
    // INITIALIZE ALL EFFECTS
    // ================================
    
    function initializeEffects() {
        console.log('🎨 Initializing motion effects...');
        
        try {
            createHeroBlob();
            createFloatingShapes();
            createParticleSystem();
            createRotatingAccents();
            enhancedParallax();
            magneticCursor();
            setupPerformanceObserver();
            
            console.log('✅ All motion effects initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing motion effects:', error);
        }
    }
    
    // Small delay to ensure DOM is fully ready
    setTimeout(initializeEffects, 100);
    
});

// Debug helper
window.motionEffects = {
    version: '2.0',
    status: 'loaded'
};

console.log('Motion effects script loaded - v2.0');