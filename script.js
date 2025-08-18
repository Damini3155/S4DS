// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const goToTopBtn = document.getElementById('goToTop');
    
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        goToTopBtn.classList.add('visible');
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
        goToTopBtn.classList.remove('visible');
    }
});

// Go to top button functionality
document.getElementById('goToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Scroll indicator functionality
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    const nextSection = document.querySelector('#events');
    if (nextSection) {
        nextSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .about-card, .event-card, .team-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    // Don't start typing immediately, wait for loading screen to complete
});

// Form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('.form-submit');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Button click effects
document.querySelectorAll('.cta-button, .form-submit').forEach(button => {
    button.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Glowing cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor) {
        const glowCursor = document.createElement('div');
        glowCursor.className = 'cursor-glow';
        glowCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(glowCursor);
    }
    
    const glowElement = document.querySelector('.cursor-glow');
    glowElement.style.left = (e.clientX - 10) + 'px';
    glowElement.style.top = (e.clientY - 10) + 'px';
});

// Add particle effect on button hover
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        createParticles(this);
    });
});

function createParticles(element) {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #00ffff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
            `;
            
            const rect = element.getBoundingClientRect();
            particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            particle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            
            document.body.appendChild(particle);
            
            // Animate particle
            const animation = particle.animate([
                { transform: 'translateY(0px)', opacity: 1 },
                { transform: 'translateY(-50px)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => particle.remove();
        }, i * 100);
    }
}

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00ffff, #0080ff);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.overflow = 'hidden';
    
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        flex-direction: column;
    `;
    
    const loaderText = document.createElement('div');
    loaderText.textContent = 'S4DS';
    loaderText.style.cssText = `
        font-size: 4rem;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 20px;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    `;
    
    const loaderBar = document.createElement('div');
    loaderBar.style.cssText = `
        width: 200px;
        height: 3px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
        overflow: hidden;
    `;
    
    const loaderProgress = document.createElement('div');
    loaderProgress.style.cssText = `
        width: 0%;
        height: 100%;
        background: #2563eb;
        border-radius: 3px;
        animation: loading 2s ease-in-out forwards;
    `;
    
    const loadingKeyframes = `
        @keyframes loading {
            to { width: 100%; }
        }
    `;
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = loadingKeyframes;
    document.head.appendChild(loadingStyle);
    
    loaderBar.appendChild(loaderProgress);
    loader.appendChild(loaderText);
    loader.appendChild(loaderBar);
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.transition = 'opacity 0.5s ease';
        document.body.style.overflow = 'auto';
        
        // Start typing effect after loading screen fades out
        setTimeout(() => {
            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (heroSubtitle) {
                const originalText = heroSubtitle.textContent;
                heroSubtitle.textContent = ''; // Clear the text first
                typeWriter(heroSubtitle, originalText, 100);
            }
        }, 500); // Wait for loading screen fade out to complete
        
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 2500);
});

// Roadmap Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, looking for roadmap elements...');
    const tabButtons = document.querySelectorAll('.tab-button');
    const roadmapContents = document.querySelectorAll('.roadmap-content');
    
    console.log('Found', tabButtons.length, 'tab buttons');
    console.log('Found', roadmapContents.length, 'roadmap contents');
    
    // Only proceed if we're on the roadmaps page
    if (tabButtons.length === 0 || roadmapContents.length === 0) {
        console.log('No roadmap elements found, skipping...');
        return;
    }
    
    tabButtons.forEach((button, index) => {
        console.log('Setting up button', index, 'with data-tab:', button.getAttribute('data-tab'));
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = button.getAttribute('data-tab');
            console.log('Button clicked, targeting:', targetTab);
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
                console.log('Removed active from button:', btn.getAttribute('data-tab'));
            });
            roadmapContents.forEach(content => {
                content.classList.remove('active');
                console.log('Removed active from content:', content.id);
            });
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            console.log('Added active to button:', targetTab);
            
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log('Added active to content:', targetTab);
            } else {
                console.error('Could not find content with ID:', targetTab);
            }
        });
    });
});
