// ================================
// MAIN JAVASCRIPT
// ================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ================================
    // MOBILE NAVIGATION TOGGLE
    // ================================
    
    // Create hamburger menu for mobile
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.classList.add('nav-toggle');
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    
    // Insert hamburger before nav links
    navContainer.insertBefore(hamburger, navLinks);
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    const navLinkItems = document.querySelectorAll('.nav-link');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navContainer.contains(e.target) && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // ================================
    // PROJECT MODAL FUNCTIONALITY
    // ================================
    
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    // Project data
    const projectData = {
        '1': {
            title: 'Brand Campaign',
            objective: 'To reposition a heritage brand for a younger, digitally-native audience without losing the trust of existing customers.',
            problem: 'The brand was perceived as outdated and irrelevant by millennials and Gen Z, despite having strong brand equity with older demographics.',
            audience: 'Urban millennials (25-35) who value authenticity, sustainability, and brands with clear values.',
            insight: 'Young consumers don\'t reject heritage—they reject brands that feel stuck in the past. They want brands that honor their history while being part of today\'s conversation.',
            idea: 'A campaign that positions the brand as "Timeless, Not Timid"—celebrating its legacy while showing how it\'s evolving for modern times.',
            execution: 'Multi-channel campaign including social media storytelling, influencer partnerships, and experiential pop-ups that blend vintage aesthetics with contemporary design. User-generated content encouraged through #TimelessNotTimid.',
            images: ['assets/images/projects/detail-1.jpg']
        },
        '2': {
            title: 'Cultural Insight Project',
            objective: 'To understand and communicate the evolving relationship between traditional crafts and modern lifestyle in urban India.',
            problem: 'Traditional artisans were struggling to connect with contemporary consumers who saw handmade goods as old-fashioned rather than valuable.',
            audience: 'Design-conscious urban professionals (28-40) who appreciate quality and craftsmanship but need modern relevance.',
            insight: 'People don\'t buy crafts—they buy stories, connection, and meaning. The value isn\'t in the object; it\'s in understanding the hands that made it.',
            idea: '"Makers & Stories"—a platform that transforms each handmade product into a narrative experience, connecting buyers directly with artisans.',
            execution: 'Documentary-style brand films, AR packaging that reveals the maker\'s story, and a digital platform where customers can meet their artisan and see the making process. Each purchase includes a handwritten note from the craftsperson.',
            images: ['assets/images/projects/detail-1.jpg']
        },
        '3': {
            title: 'Visual Identity',
            objective: 'To create a distinctive visual identity for a wellness startup that stands out in an oversaturated market.',
            problem: 'The wellness category is crowded with similar aesthetics—pastel colors, minimalist design, and generic "calm" imagery.',
            audience: 'Busy professionals seeking authentic, no-nonsense wellness solutions, not aspirational lifestyle content.',
            insight: 'Real wellness isn\'t always serene and beautiful—it\'s messy, challenging, and deeply personal. People are tired of wellness that looks perfect.',
            idea: '"Honestly Well"—a visual identity that embraces imperfection, uses bold colors and honest photography instead of stock imagery.',
            execution: 'Brand identity featuring vibrant earth tones, real customer photography, hand-drawn illustrations, and copy that speaks to the reality of wellness journeys. Packaging design that feels human, not clinical.',
            images: ['assets/images/projects/detail-1.jpg']
        },
        '4': {
            title: 'Digital Campaign',
            objective: 'To drive engagement and conversions for a sustainable fashion brand\'s new collection launch.',
            problem: 'Sustainable fashion often focuses on the "sacrifice" narrative rather than celebrating style and desirability.',
            audience: 'Fashion-forward consumers (22-35) who care about sustainability but won\'t compromise on style.',
            insight: 'People want to feel good about their choices, but they want to look good first. Sustainability is a bonus, not the main story.',
            idea: '"Style Without Compromise"—a campaign that leads with fashion, then reveals the sustainability story.',
            execution: 'Instagram-first campaign with fashion influencers showcasing pieces styled in unexpected ways. Swipe-through posts reveal the sustainable story behind each look. TikTok challenges encouraging creative styling. Shoppable Instagram Stories with behind-the-scenes content on sustainable production.',
            images: ['assets/images/projects/detail-1.jpg']
        }
    };
    
    // Open modal when project card is clicked
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                // Update modal content
                document.querySelector('.modal-project-title').textContent = project.title;
                
                const briefSections = document.querySelectorAll('.brief-section');
                briefSections[0].querySelector('p').textContent = project.objective;
                briefSections[1].querySelector('p').textContent = project.problem;
                briefSections[2].querySelector('p').textContent = project.audience;
                briefSections[3].querySelector('p').textContent = project.insight;
                briefSections[4].querySelector('p').textContent = project.idea;
                briefSections[5].querySelector('p').textContent = project.execution;
                
                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Close modal on close button click
    modalClose.addEventListener('click', closeModal);
    
    // Close modal on overlay click
    modalOverlay.addEventListener('click', closeModal);
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // ================================
    // ACTIVE NAVIGATION HIGHLIGHT
    // ================================
    
    const sections = document.querySelectorAll('.section');
    const navLinksArray = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ================================
    // YEAR AUTO UPDATE
    // ================================
    
    const yearElements = document.querySelectorAll('.year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // ================================
    // CONSOLE MESSAGE
    // ================================
    
    console.log('%c👋 Welcome to Mitasha\'s Portfolio', 'font-size: 20px; font-weight: bold; color: #2C666E;');
    console.log('%cDesigned with intention. Built with care.', 'font-size: 14px; color: #666;');
    
});