// DOM Elements
const landingScreen = document.getElementById('landing-screen');
const companyForm = document.getElementById('company-form');
const creatorForm = document.getElementById('creator-form');
const companyChoice = document.getElementById('company-choice');
const creatorChoice = document.getElementById('creator-choice');
const backFromCompany = document.getElementById('back-from-company');
const backFromCreator = document.getElementById('back-from-creator');
const companyOrderForm = document.getElementById('company-order-form');
const creatorRegisterForm = document.getElementById('creator-register-form');
const successModal = document.getElementById('success-modal');
const errorModal = document.getElementById('error-modal');

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Add event listeners
    companyChoice.addEventListener('click', () => showForm('company'));
    creatorChoice.addEventListener('click', () => showForm('creator'));
    backFromCompany.addEventListener('click', () => showLanding());
    backFromCreator.addEventListener('click', () => showLanding());
    
    // Form submissions
    companyOrderForm.addEventListener('submit', handleCompanySubmission);
    creatorRegisterForm.addEventListener('submit', handleCreatorSubmission);
    
    // Modal close handlers
    document.getElementById('success-ok').addEventListener('click', closeSuccessModal);
    document.getElementById('error-ok').addEventListener('click', closeErrorModal);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Add hover effects to choice buttons
    addHoverEffects();
}

function addHoverEffects() {
    [companyChoice, creatorChoice].forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

function showForm(type) {
    // Add selection animation
    const selectedBtn = type === 'company' ? companyChoice : creatorChoice;
    const otherBtn = type === 'company' ? creatorChoice : companyChoice;
    
    // Animate selection
    selectedBtn.classList.add('selected');
    selectedBtn.style.transform = 'scale(1.1)';
    selectedBtn.style.borderColor = 'var(--accent-color)';
    selectedBtn.style.boxShadow = '0 0 30px rgba(0, 255, 136, 0.4)';
    
    otherBtn.style.opacity = '0.3';
    otherBtn.style.transform = 'scale(0.9)';
    
    // Transition to form after animation
    setTimeout(() => {
        landingScreen.style.opacity = '0';
        landingScreen.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            landingScreen.classList.add('hidden');
            
            if (type === 'company') {
                companyForm.classList.remove('hidden');
            } else {
                creatorForm.classList.remove('hidden');
            }
            
            // Reset landing screen for next time
            resetLandingScreen();
        }, 300);
    }, 600);
}

function showLanding() {
    // Hide forms
    companyForm.classList.add('hidden');
    creatorForm.classList.add('hidden');
    
    // Show landing screen
    landingScreen.classList.remove('hidden');
    landingScreen.style.opacity = '1';
    landingScreen.style.transform = 'scale(1)';
}

function resetLandingScreen() {
    setTimeout(() => {
        [companyChoice, creatorChoice].forEach(btn => {
            btn.classList.remove('selected');
            btn.style.transform = '';
            btn.style.opacity = '';
            btn.style.borderColor = '';
            btn.style.boxShadow = '';
        });
    }, 100);
}

async function handleCompanySubmission(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Show loading state
    setLoadingState(submitBtn, btnText, btnLoader, true);
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch('/api/company-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showSuccessModal('Order Submitted Successfully!', 'Thank you for choosing Linkzo! We will contact you within 24 hours to discuss your requirements.');
            e.target.reset();
        } else {
            showErrorModal(result.message || 'Failed to submit order. Please try again.');
        }
    } catch (error) {
        console.error('Error submitting order:', error);
        showErrorModal('Network error. Please check your connection and try again.');
    } finally {
        setLoadingState(submitBtn, btnText, btnLoader, false);
    }
}

async function handleCreatorSubmission(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // Show loading state
    setLoadingState(submitBtn, btnText, btnLoader, true);
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch('/api/creator-register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showSuccessModal('Registration Successful!', 'Welcome to the Linkzo creator network! We will review your profile and get back to you soon with collaboration opportunities.');
            e.target.reset();
        } else {
            showErrorModal(result.message || 'Failed to register. Please try again.');
        }
    } catch (error) {
        console.error('Error registering creator:', error);
        showErrorModal('Network error. Please check your connection and try again.');
    } finally {
        setLoadingState(submitBtn, btnText, btnLoader, false);
    }
}

function setLoadingState(submitBtn, btnText, btnLoader, isLoading) {
    if (isLoading) {
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        btnLoader.classList.remove('hidden');
    } else {
        submitBtn.disabled = false;
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
    }
}

function showSuccessModal(title, message) {
    document.getElementById('success-title').textContent = title;
    document.getElementById('success-message').textContent = message;
    successModal.classList.remove('hidden');
}

function showErrorModal(message) {
    document.getElementById('error-message').textContent = message;
    errorModal.classList.remove('hidden');
}

function closeSuccessModal() {
    successModal.classList.add('hidden');
    showLanding();
}

function closeErrorModal() {
    errorModal.classList.add('hidden');
}

function handleKeyboardNavigation(e) {
    // Only handle keyboard navigation on landing screen
    if (!landingScreen.classList.contains('hidden')) {
        if (e.key === '1' || e.key.toLowerCase() === 'c') {
            e.preventDefault();
            showForm('company');
        } else if (e.key === '2' || e.key.toLowerCase() === 'i') {
            e.preventDefault();
            showForm('creator');
        }
    }
    
    // Close modals with Escape key
    if (e.key === 'Escape') {
        if (!successModal.classList.contains('hidden')) {
            closeSuccessModal();
        }
        if (!errorModal.classList.contains('hidden')) {
            closeErrorModal();
        }
    }
}

// Form validation helpers
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateURL(url) {
    if (!url) return true; // Optional field
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Add real-time validation
document.addEventListener('DOMContentLoaded', function() {
    // Email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#ff4757';
                showTooltip(this, 'Please enter a valid email address');
            } else {
                this.style.borderColor = 'var(--accent-color)';
                hideTooltip(this);
            }
        });
    });
    
    // URL validation for social links
    const urlInputs = document.querySelectorAll('input[type="url"]');
    urlInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateURL(this.value)) {
                this.style.borderColor = '#ff4757';
                showTooltip(this, 'Please enter a valid URL (e.g., https://example.com)');
            } else {
                this.style.borderColor = 'var(--accent-color)';
                hideTooltip(this);
            }
        });
    });
});

function showTooltip(element, message) {
    // Remove existing tooltip
    hideTooltip(element);
    
    const tooltip = document.createElement('div');
    tooltip.className = 'validation-tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: #ff4757;
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        top: 100%;
        left: 0;
        margin-top: 0.25rem;
        z-index: 1000;
        white-space: nowrap;
    `;
    
    element.parentElement.style.position = 'relative';
    element.parentElement.appendChild(tooltip);
}

function hideTooltip(element) {
    const tooltip = element.parentElement.querySelector('.validation-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Add smooth scrolling for better UX
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Performance optimization: Debounce function for input validation
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading animation to page
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add error handling for network issues
window.addEventListener('online', function() {
    console.log('Connection restored');
});

window.addEventListener('offline', function() {
    showErrorModal('You are currently offline. Please check your internet connection.');
});
