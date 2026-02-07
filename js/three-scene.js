// ================================
// THREE.JS 3D SCENE - OPTIMIZED & CONFLICT-FREE
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('⚠️ Three.js not loaded. 3D effects will be skipped.');
        console.log('Add this to your HTML: <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>');
        return;
    }
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        console.log('Reduced motion preferred - skipping 3D effects');
        return;
    }
    
    // Check if mobile device (disable on mobile for performance)
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        console.log('Mobile device detected - skipping 3D effects for performance');
        return;
    }
    
    console.log('🎮 Initializing Three.js 3D scenes...');
    
    // ================================
    // CONFIGURATION
    // ================================
    
    const config = {
        hero3D: true,
        projectCards3D: false, // Disabled to reduce conflicts
        morphingBlob: true
    };
    
    const activeScenes = [];
    
    // ================================
    // HERO 3D SCENE
    // ================================
    
    function createHero3DScene() {
        if (!config.hero3D) return;
        
        const hero = document.querySelector('.hero');
        if (!hero) {
            console.log('Hero section not found');
            return;
        }
        
        // Check if container already exists
        if (hero.querySelector('.hero-3d-container')) {
            console.log('Hero 3D container already exists, skipping...');
            return;
        }
        
        // Create container for 3D canvas
        const canvasContainer = document.createElement('div');
        canvasContainer.className = 'hero-3d-container';
        hero.insertBefore(canvasContainer, hero.firstChild);
        
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            canvasContainer.offsetWidth / canvasContainer.offsetHeight,
            0.1,
            1000
        );
        
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        canvasContainer.appendChild(renderer.domElement);
        
        camera.position.z = 5;
        
        // Create geometric shapes - REDUCED COUNT
        const geometries = [
            new THREE.TorusGeometry(0.5, 0.15, 16, 100),
            new THREE.OctahedronGeometry(0.5),
            new THREE.IcosahedronGeometry(0.5),
        ];
        
        const material = new THREE.MeshPhongMaterial({
            color: 0x2C666E,
            wireframe: true,
            transparent: true,
            opacity: 0.25
        });
        
        const shapes = [];
        
        // Create shapes - REDUCED TO 4
        for (let i = 0; i < 4; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const mesh = new THREE.Mesh(geometry, material.clone());
            
            mesh.position.x = (Math.random() - 0.5) * 8;
            mesh.position.y = (Math.random() - 0.5) * 8;
            mesh.position.z = (Math.random() - 0.5) * 4;
            
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            
            mesh.userData.rotationSpeed = {
                x: (Math.random() - 0.5) * 0.008,
                y: (Math.random() - 0.5) * 0.008,
                z: (Math.random() - 0.5) * 0.008
            };
            
            mesh.userData.floatSpeed = Math.random() * 0.015 + 0.008;
            mesh.userData.floatAmplitude = Math.random() * 0.4 + 0.2;
            mesh.userData.initialY = mesh.position.y;
            
            scene.add(mesh);
            shapes.push(mesh);
        }
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const pointLight1 = new THREE.PointLight(0xD4A574, 0.8);
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x2C666E, 0.6);
        pointLight2.position.set(-5, -5, 5);
        scene.add(pointLight2);
        
        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetMouseX = 0;
        let targetMouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
            targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Animation loop
        let time = 0;
        let isVisible = true;
        let animationId;
        
        function animate() {
            if (!isVisible) return;
            
            animationId = requestAnimationFrame(animate);
            time += 0.01;
            
            // Smooth mouse interpolation
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;
            
            // Rotate and float shapes
            shapes.forEach((shape, index) => {
                shape.rotation.x += shape.userData.rotationSpeed.x;
                shape.rotation.y += shape.userData.rotationSpeed.y;
                shape.rotation.z += shape.userData.rotationSpeed.z;
                
                // Floating motion
                shape.position.y = shape.userData.initialY + 
                    Math.sin(time * shape.userData.floatSpeed + index) * 
                    shape.userData.floatAmplitude;
                
                // Subtle mouse interaction
                shape.rotation.x += mouseY * 0.0003;
                shape.rotation.y += mouseX * 0.0003;
            });
            
            // Gentle camera movement
            camera.position.x = Math.sin(time * 0.08) * 0.15;
            camera.position.y = Math.cos(time * 0.12) * 0.15;
            camera.lookAt(scene.position);
            
            renderer.render(scene, camera);
        }
        
        // Handle resize
        function handleResize() {
            camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
        }
        window.addEventListener('resize', handleResize);
        
        // Pause when not visible (performance optimization)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                    animate();
                } else {
                    cancelAnimationFrame(animationId);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(hero);
        
        // Start animation
        animate();
        
        // Store cleanup function
        activeScenes.push({
            name: 'hero3D',
            cleanup: () => {
                cancelAnimationFrame(animationId);
                observer.disconnect();
                window.removeEventListener('resize', handleResize);
                renderer.dispose();
                geometries.forEach(g => g.dispose());
                material.dispose();
            }
        });
        
        console.log('✓ Hero 3D scene created');
    }
    
    // ================================
    // MORPHING BLOB BACKGROUND
    // ================================
    
    function createMorphingBlob() {
        if (!config.morphingBlob) return;
        
        const about = document.querySelector('.about');
        if (!about) {
            console.log('About section not found');
            return;
        }
        
        // Check if container already exists
        if (about.querySelector('.blob-3d-container')) {
            console.log('Blob 3D container already exists, skipping...');
            return;
        }
        
        const blobContainer = document.createElement('div');
        blobContainer.className = 'blob-3d-container';
        blobContainer.style.cssText = `
            position: absolute;
            top: 50%;
            right: -150px;
            width: 500px;
            height: 500px;
            transform: translateY(-50%);
            pointer-events: none;
            z-index: 0;
        `;
        about.style.position = 'relative';
        about.appendChild(blobContainer);
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        
        renderer.setSize(500, 500);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        blobContainer.appendChild(renderer.domElement);
        
        camera.position.z = 5;
        
        // Create blob geometry
        const geometry = new THREE.SphereGeometry(2, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0xD4A574,
            transparent: true,
            opacity: 0.15,
            wireframe: false,
            shininess: 100
        });
        
        const blob = new THREE.Mesh(geometry, material);
        scene.add(blob);
        
        // Lighting
        const light1 = new THREE.PointLight(0xffffff, 0.8);
        light1.position.set(5, 5, 5);
        scene.add(light1);
        
        const light2 = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(light2);
        
        // Morphing animation
        const originalPositions = geometry.attributes.position.array.slice();
        let time = 0;
        let isVisible = true;
        let animationId;
        
        function animateBlob() {
            if (!isVisible) return;
            
            animationId = requestAnimationFrame(animateBlob);
            time += 0.008;
            
            const positions = geometry.attributes.position.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                const x = originalPositions[i];
                const y = originalPositions[i + 1];
                const z = originalPositions[i + 2];
                
                const noise = Math.sin(time + x * 1.5) * 
                             Math.cos(time + y * 1.5) * 
                             Math.sin(time + z * 1.5) * 0.2;
                
                positions[i] = x + noise;
                positions[i + 1] = y + noise;
                positions[i + 2] = z + noise;
            }
            
            geometry.attributes.position.needsUpdate = true;
            
            blob.rotation.x += 0.001;
            blob.rotation.y += 0.002;
            
            renderer.render(scene, camera);
        }
        
        // Intersection observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                    animateBlob();
                } else {
                    cancelAnimationFrame(animationId);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(about);
        
        // Start animation
        animateBlob();
        
        // Store cleanup function
        activeScenes.push({
            name: 'morphingBlob',
            cleanup: () => {
                cancelAnimationFrame(animationId);
                observer.disconnect();
                renderer.dispose();
                geometry.dispose();
                material.dispose();
            }
        });
        
        console.log('✓ Morphing blob created');
    }
    
    // ================================
    // INITIALIZE ALL 3D SCENES
    // ================================
    
    function initialize3DScenes() {
        try {
            createHero3DScene();
            createMorphingBlob();
            
            console.log('✅ All 3D scenes initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing 3D scenes:', error);
        }
    }
    
    // Delay initialization slightly
    setTimeout(initialize3DScenes, 200);
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        activeScenes.forEach(scene => {
            if (scene.cleanup) scene.cleanup();
        });
    });
    
});

// Debug helper
window.threeJSEffects = {
    version: '2.0',
    status: 'loaded'
};

console.log('Three.js effects script loaded - v2.0');