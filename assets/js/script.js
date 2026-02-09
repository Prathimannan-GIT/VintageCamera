// Vintage Camera Store - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Active Navigation Highlighting
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Dashboard Sidebar Toggle
    const dashboardHamburger = document.querySelector('.dashboard-hamburger');
    const sidebar = document.querySelector('.sidebar');
    
    if (dashboardHamburger && sidebar) {
        dashboardHamburger.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff4444';
                    
                    // Remove error styling on input
                    field.addEventListener('input', function() {
                        this.style.borderColor = '';
                    });
                }
            });
            
            if (isValid) {
                // Simulate form submission
                showNotification('Form submitted successfully!', 'success');
                form.reset();
            } else {
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });
    
    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            backgroundColor: type === 'success' ? '#4CAF50' : 
                           type === 'error' ? '#f44336' : '#2196F3',
            color: 'white',
            borderRadius: '5px',
            zIndex: '10000',
            maxWidth: '300px',
            wordWrap: 'break-word',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Image Lazy Loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Gallery Lightbox
    const galleryImages = document.querySelectorAll('.gallery-image');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
    `;
    
    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
    `;
    
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightbox.style.display = 'flex';
        });
    });
    
    lightbox.addEventListener('click', function() {
        this.style.display = 'none';
    });
    
    // Search Functionality
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (searchInput && searchResults) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            searchTimeout = setTimeout(() => {
                if (query.length > 2) {
                    performSearch(query);
                } else {
                    searchResults.style.display = 'none';
                }
            }, 300);
        });
        
        function performSearch(query) {
            // Simulate search results
            const mockResults = [
                { title: 'Vintage Canon AE-1', category: 'Film Cameras', price: '$450' },
                { title: 'Leica M3', category: 'Collector Editions', price: '$2,800' },
                { title: 'Nikon F2', category: 'Film Cameras', price: '$650' }
            ];
            
            searchResults.innerHTML = '';
            
            if (mockResults.length > 0) {
                mockResults.forEach(result => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    resultItem.innerHTML = `
                        <h4>${result.title}</h4>
                        <p>${result.category} - ${result.price}</p>
                    `;
                    searchResults.appendChild(resultItem);
                });
                searchResults.style.display = 'block';
            } else {
                searchResults.innerHTML = '<p>No results found</p>';
                searchResults.style.display = 'block';
            }
        }
    }
    
    // Cart Functionality
    let cart = JSON.parse(localStorage.getItem('vintageCameraCart')) || [];
    
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
            cartCount.style.display = cart.length > 0 ? 'block' : 'none';
        }
    }
    
    function addToCart(product) {
        cart.push(product);
        localStorage.setItem('vintageCameraCart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`${product.name} added to cart!`, 'success');
    }
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = {
                id: this.dataset.productId,
                name: this.dataset.productName,
                price: this.dataset.productPrice
            };
            addToCart(product);
        });
    });
    
    // Initialize cart count
    updateCartCount();
    
    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            }
        });
    }
    
    // Scroll to Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background-color: #333;
                color: white;
                padding: 5px 10px;
                border-radius: 3px;
                font-size: 12px;
                z-index: 10000;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
});

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
