// Landing Screen Functionality
document.addEventListener('DOMContentLoaded', function() {
    const landingScreen = document.getElementById('landing-screen');
    const mainContent = document.getElementById('main-content');
    const companyChoice = document.getElementById('company-choice');
    const creatorChoice = document.getElementById('creator-choice');

    // Add click handlers for choice buttons
    companyChoice.addEventListener('click', function() {
        handleChoice('company');
    });

    creatorChoice.addEventListener('click', function() {
        handleChoice('creator');
    });

    // Add hover sound effect simulation (visual feedback)
    [companyChoice, creatorChoice].forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    function handleChoice(type) {
        // Prevent multiple clicks
        companyChoice.style.pointerEvents = 'none';
        creatorChoice.style.pointerEvents = 'none';
        
        // Add selection animation
        const selectedBtn = type === 'company' ? companyChoice : creatorChoice;
        const otherBtn = type === 'company' ? creatorChoice : companyChoice;
        
        // Mark as selected
        selectedBtn.classList.add('selected');
        
        // Enhanced selection animation
        selectedBtn.style.transform = 'scale(1.15) translateY(-10px)';
        selectedBtn.style.borderColor = 'var(--accent-color)';
        selectedBtn.style.boxShadow = '0 25px 50px rgba(0, 255, 136, 0.4), 0 0 0 2px rgba(0, 255, 136, 0.3)';
        selectedBtn.style.background = 'rgba(0, 255, 136, 0.1)';
        
        // Animate other button out
        otherBtn.style.opacity = '0.2';
        otherBtn.style.transform = 'scale(0.85) translateY(20px)';
        otherBtn.style.filter = 'blur(2px)';
        
        // Add pulsing effect to selected button
        setTimeout(() => {
            selectedBtn.style.animation = 'pulse 0.6s ease-in-out';
        }, 200);
        
        // Store user choice in localStorage for personalization
        localStorage.setItem('linkzo-user-type', type);
        
        // Show loading indicator
        showLoadingIndicator(selectedBtn);
        
        // Transition to main content after animation
        setTimeout(() => {
            transitionToMainContent(type);
        }, 1200);
    }

    function showLoadingIndicator(selectedBtn) {
        // Add loading dots to the selected button
        const loadingDots = document.createElement('div');
        loadingDots.className = 'loading-dots';
        loadingDots.innerHTML = '<span></span><span></span><span></span>';
        selectedBtn.appendChild(loadingDots);
        
        // Style the loading dots
        const style = document.createElement('style');
        style.textContent = `
            .loading-dots {
                display: flex;
                justify-content: center;
                margin-top: 1rem;
                gap: 0.3rem;
            }
            .loading-dots span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: var(--accent-color);
                animation: loadingDot 1.4s ease-in-out infinite both;
            }
            .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
            .loading-dots span:nth-child(2) { animation-delay: -0.16s; }
            @keyframes loadingDot {
                0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
                40% { transform: scale(1.2); opacity: 1; }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1.15) translateY(-10px); }
                50% { transform: scale(1.2) translateY(-15px); }
            }
        `;
        document.head.appendChild(style);
    }

    function transitionToMainContent(userType) {
        // Enhanced fade out animation for landing screen
        landingScreen.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        landingScreen.style.opacity = '0';
        landingScreen.style.transform = 'scale(0.9)';
        landingScreen.style.filter = 'blur(10px)';
        
        // After fade out, show main content
        setTimeout(() => {
            landingScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Customize content based on user choice
            customizeContentForUser(userType);
            
            // Enhanced fade in for main content
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(30px) scale(0.95)';
            mainContent.style.filter = 'blur(5px)';
            
            setTimeout(() => {
                mainContent.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0) scale(1)';
                mainContent.style.filter = 'blur(0)';
                
                // Add welcome animation
                setTimeout(() => {
                    showWelcomeMessage(userType);
                }, 500);
            }, 100);
            
        }, 1000);
    }

    function showWelcomeMessage(userType) {
        const welcomeMsg = document.createElement('div');
        welcomeMsg.className = 'welcome-message';
        welcomeMsg.innerHTML = `
            <div class="welcome-content">
                <i class="fas fa-check-circle"></i>
                <span>Welcome! We've customized your experience for ${userType === 'company' ? 'businesses' : 'creators'}</span>
            </div>
        `;
        
        // Style the welcome message
        const style = document.createElement('style');
        style.textContent = `
            .welcome-message {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 255, 136, 0.9);
                color: #1a1f36;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                font-weight: 600;
                z-index: 10000;
                animation: slideInRight 0.5s ease-out, fadeOutUp 0.5s ease-in 3s forwards;
                box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
            }
            .welcome-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeOutUp {
                to { transform: translateY(-20px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(welcomeMsg);
        
        // Remove welcome message after animation
        setTimeout(() => {
            welcomeMsg.remove();
        }, 4000);
    }

    function customizeContentForUser(userType) {
        // Customize hero section based on user choice
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (userType === 'company') {
            heroTitle.innerHTML = 'Scale Your Business with Linkzo 🚀';
            heroSubtitle.innerHTML = 'We help companies and brands in Gorakhpur and across India increase visibility, engagement, and sales through strategic digital marketing solutions. Led by CEO Aryan Singh, we deliver enterprise-level results.';
            
            // Highlight business-focused services
            highlightServices(['paid-ads', 'analytics', 'branding']);
        } else {
            heroTitle.innerHTML = 'Grow Your Personal Brand with Linkzo ⭐';
            heroSubtitle.innerHTML = 'We help creators and influencers build authentic personal brands and grow their audience through creative content strategies and social media management. Join 500+ successful creators we\'ve helped.';
            
            // Highlight creator-focused services
            highlightServices(['social-media', 'content-creation', 'audience-growth']);
        }
        
        // Add personalized badge to navigation
        addPersonalizationBadge(userType);
    }

    function highlightServices(serviceIds) {
        // Add highlighting to relevant service cards
        setTimeout(() => {
            serviceIds.forEach((id, index) => {
                const serviceCard = document.querySelector(`[data-service="${id}"]`);
                if (serviceCard) {
                    setTimeout(() => {
                        serviceCard.style.transform = 'scale(1.05)';
                        serviceCard.style.borderColor = 'var(--accent-color)';
                        serviceCard.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.2)';
                        
                        setTimeout(() => {
                            serviceCard.style.transform = 'scale(1)';
                        }, 1000);
                    }, index * 200);
                }
            });
        }, 1000);
    }

    function addPersonalizationBadge(userType) {
        const navbar = document.querySelector('.navbar');
        const badge = document.createElement('div');
        badge.className = 'personalization-badge';
        badge.innerHTML = `<i class="fas fa-${userType === 'company' ? 'building' : 'star'}"></i> ${userType === 'company' ? 'Business' : 'Creator'} Mode`;
        
        const style = document.createElement('style');
        style.textContent = `
            .personalization-badge {
                background: var(--accent-color);
                color: var(--primary-color);
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 0.3rem;
                animation: slideInDown 0.5s ease-out 1s both;
            }
            @keyframes slideInDown {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        navbar.appendChild(badge);
    }

    // Enhanced keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if (landingScreen.style.display !== 'none') {
            if (e.key === '1' || e.key === 'c' || e.key === 'C') {
                e.preventDefault();
                handleChoice('company');
            } else if (e.key === '2' || e.key === 'i' || e.key === 'I') {
                e.preventDefault();
                handleChoice('creator');
            } else if (e.key === 'Escape') {
                // Reset selection if user presses escape
                resetChoiceButtons();
            }
        }
    });

    function resetChoiceButtons() {
        [companyChoice, creatorChoice].forEach(btn => {
            btn.style.transform = '';
            btn.style.opacity = '';
            btn.style.filter = '';
            btn.style.pointerEvents = '';
            btn.classList.remove('selected');
            const loadingDots = btn.querySelector('.loading-dots');
            if (loadingDots) loadingDots.remove();
        });
    }

    // Check if user has already made a choice (returning visitor)
    const savedUserType = localStorage.getItem('linkzo-user-type');
    if (savedUserType && window.location.hash === '') {
        // Show a quick "Welcome back" message for returning users
        setTimeout(() => {
            const welcomeBack = document.createElement('div');
            welcomeBack.className = 'welcome-back';
            welcomeBack.innerHTML = `
                <p>Welcome back! <span>Continue as ${savedUserType === 'company' ? 'Business' : 'Creator'}?</span></p>
                <button onclick="this.parentElement.remove(); handleChoice('${savedUserType}')">Yes</button>
                <button onclick="this.parentElement.remove()">Choose Again</button>
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                .welcome-back {
                    position: absolute;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(30, 39, 73, 0.95);
                    border: 1px solid var(--accent-color);
                    border-radius: 10px;
                    padding: 1rem 1.5rem;
                    text-align: center;
                    z-index: 10001;
                    animation: slideInDown 0.5s ease-out;
                }
                .welcome-back p { margin-bottom: 1rem; color: var(--text-primary); }
                .welcome-back span { color: var(--accent-color); font-weight: 600; }
                .welcome-back button {
                    margin: 0 0.5rem;
                    padding: 0.5rem 1rem;
                    border: 1px solid var(--accent-color);
                    background: transparent;
                    color: var(--accent-color);
                    border-radius: 5px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .welcome-back button:hover {
                    background: var(--accent-color);
                    color: var(--primary-color);
                }
            `;
            document.head.appendChild(style);
            
            landingScreen.appendChild(welcomeBack);
        }, 2000);
    }
});

// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 31, 54, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 31, 54, 0.95)';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Add scroll animation class to elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .about-text, .about-image');
    
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you! Your message has been sent successfully.', 'success');
    contactForm.reset();
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4757' : '#3742fa'};
        color: ${type === 'success' || type === 'error' ? '#1a1f36' : '#ffffff'};
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// CTA Button click handler
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const ctaButton = document.querySelector('.cta-button');
    
    setTimeout(() => heroTitle.classList.add('fade-in-up'), 200);
    setTimeout(() => heroSubtitle.classList.add('fade-in-up'), 400);
    setTimeout(() => ctaButton.classList.add('fade-in-up'), 600);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing animation for hero title
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

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.textContent;
    
    // Start typing animation after a short delay
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 50);
    }, 1000);
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--accent-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .loaded .fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// Add intersection observer for counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target.querySelector('h4');
            const targetValue = parseInt(statElement.textContent);
            animateCounter(statElement, targetValue);
            statsObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Add smooth reveal animation for portfolio items
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.6s ease';
    portfolioObserver.observe(item);
});
