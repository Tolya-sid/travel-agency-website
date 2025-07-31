// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Initialize theme and auth state
    initTheme();
    checkAuthState();

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Header background on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (window.scrollY > 100) {
        if (currentTheme === 'dark') {
            header.style.background = 'rgba(15, 23, 42, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    } else {
        if (currentTheme === 'dark') {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.boxShadow = 'none';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };

        // Basic validation
        if (!formData.name || !formData.phone || !formData.service) {
            showNotification('Пожалуйста, заполните обязательные поля', 'error');
            return;
        }

        // Check privacy agreement
        const privacyAgreement = document.getElementById('contactPrivacy').checked;
        if (!privacyAgreement) {
            showNotification('Необходимо согласиться с политикой конфиденциальности', 'error');
            return;
        }

        // Phone validation (basic Russian format)
        const phoneRegex = /^[\+]?[7|8]?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
            showNotification('Пожалуйста, введите корректный номер телефона', 'error');
            return;
        }

        // Email validation if provided
        if (formData.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Пожалуйста, введите корректный email', 'error');
                return;
            }
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual backend call)
        setTimeout(() => {
            showNotification('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `;

    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        font-size: 1.2rem;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .destination-card, .contact-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('loading');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateOnScroll, 500);
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value[0] === '8') {
                value = '7' + value.slice(1);
            }
            
            if (value.length > 1) {
                value = '+7 (' + value.slice(1, 4) + ') ' + value.slice(4, 7) + '-' + value.slice(7, 9) + '-' + value.slice(9, 11);
            }
        }
        
        e.target.value = value;
    });
}

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Service selection highlight
const serviceSelect = document.getElementById('service');
if (serviceSelect) {
    serviceSelect.addEventListener('change', function() {
        if (this.value) {
            this.style.borderColor = '#10b981';
        } else {
            this.style.borderColor = '#e5e7eb';
        }
    });
}

// Add click tracking for analytics (when implemented)
function trackEvent(category, action, label) {
    // Analytics tracking will be implemented here
    console.log('Event tracked:', { category, action, label });
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-primary')) {
        trackEvent('Button', 'Click', 'Primary CTA');
    }
    if (e.target.classList.contains('btn-secondary')) {
        trackEvent('Button', 'Click', 'Secondary CTA');
    }
});

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    updateHeaderTheme();
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function updateHeaderTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const header = document.querySelector('.header');
    
    if (header) {
        if (currentTheme === 'dark') {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.borderBottomColor = '#334155';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.borderBottomColor = '#e5e7eb';
        }
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    updateHeaderTheme();
    
    showNotification(`Переключено на ${newTheme === 'dark' ? 'темную' : 'светлую'} тему`, 'info');
}

// Authentication System
let currentUser = null;

function openAuthModal(type = 'login') {
    const modal = document.getElementById('authModal');
    modal.style.display = 'block';
    switchAuthForm(type);
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
}

function switchAuthForm(type) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (type === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simulate login process
    showNotification('Вход выполнен успешно!', 'success');
    
    // Set user data (in real app, this would come from server)
    currentUser = {
        id: 1,
        name: 'Иван Петров',
        email: email,
        phone: '+7 (999) 123-45-67',
        birthdate: '1990-05-15'
    };

    // Save to localStorage (for demo purposes)
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    updateAuthState();
    closeAuthModal();
    
    setTimeout(() => {
        openCabinet();
    }, 1000);
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
    const privacyAgreement = document.getElementById('registerPrivacy').checked;

    // Validate passwords match
    if (password !== passwordConfirm) {
        showNotification('Пароли не совпадают', 'error');
        return;
    }

    // Check privacy agreement
    if (!privacyAgreement) {
        showNotification('Необходимо согласиться с политикой конфиденциальности', 'error');
        return;
    }

    // Simulate registration process
    showNotification('Регистрация прошла успешно!', 'success');
    
    // Set user data
    currentUser = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        birthdate: ''
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    updateAuthState();
    closeAuthModal();
    
    setTimeout(() => {
        openCabinet();
    }, 1000);
}

function checkAuthState() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthState();
    }
}

function updateAuthState() {
    const body = document.body;
    const authButtons = document.querySelector('.auth-buttons');
    const navAuth = document.querySelector('.nav-auth');
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (currentUser) {
        body.classList.add('user-logged-in');
        
        // Create user info display
        let userInfo = document.querySelector('.user-info');
        if (!userInfo) {
            userInfo = document.createElement('div');
            userInfo.className = 'user-info';
            authButtons.parentNode.insertBefore(userInfo, authButtons);
        }
        
        userInfo.innerHTML = `
            <i class="fas fa-user-circle"></i>
            <span onclick="openCabinet()" style="cursor: pointer;">${currentUser.name}</span>
        `;
        
        // Update nav link
        if (navAuth) {
            navAuth.textContent = currentUser.name;
            navAuth.onclick = () => openCabinet();
        }
        
        // Keep theme toggle visible but hide other auth buttons
        if (themeToggle) {
            themeToggle.style.display = 'flex';
        }
    } else {
        body.classList.remove('user-logged-in');
        
        // Show all auth buttons when logged out
        if (themeToggle) {
            themeToggle.style.display = 'flex';
        }
    }
    
    // Update header theme
    updateHeaderTheme();
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthState();
    closeCabinet();
    showNotification('Вы вышли из системы', 'info');
}

// Personal Cabinet
function openCabinet() {
    if (!currentUser) {
        openAuthModal('login');
        return;
    }
    
    const cabinet = document.getElementById('personalCabinet');
    cabinet.style.display = 'block';
    
    // Load user data into profile form
    document.getElementById('profileName').value = currentUser.name || '';
    document.getElementById('profileEmail').value = currentUser.email || '';
    document.getElementById('profilePhone').value = currentUser.phone || '';
    document.getElementById('profileBirthdate').value = currentUser.birthdate || '';
    
    // Show default tab
    showCabinetTab('profile');
}

function closeCabinet() {
    const cabinet = document.getElementById('personalCabinet');
    cabinet.style.display = 'none';
}

function showCabinetTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.cabinet-tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.cabinet-tab:not(.cabinet-logout)');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName + 'Tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to selected button
    const selectedButton = Array.from(tabButtons).find(btn => 
        btn.onclick.toString().includes(tabName)
    );
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
}

function updateProfile(event) {
    event.preventDefault();
    
    // Update current user data
    currentUser.name = document.getElementById('profileName').value;
    currentUser.email = document.getElementById('profileEmail').value;
    currentUser.phone = document.getElementById('profilePhone').value;
    currentUser.birthdate = document.getElementById('profileBirthdate').value;
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    // Update UI
    updateAuthState();
    
    showNotification('Профиль обновлен успешно!', 'success');
}

function loadUserBookings() {
    const bookingsList = document.getElementById('bookingsList');
    
    // Demo bookings data
    const bookings = [
        {
            id: 1,
            title: 'Тур в Турцию - Анталья',
            status: 'confirmed',
            statusText: 'Подтвержден',
            dates: '15.08.2024 - 25.08.2024',
            guests: 2,
            price: '85 000 ₽',
            hotel: 'Hotel Grand Resort 5*'
        },
        {
            id: 2,
            title: 'Экскурсионный тур в Грецию',
            status: 'pending',
            statusText: 'Ожидает подтверждения',
            dates: '01.09.2024 - 10.09.2024',
            guests: 2,
            price: '95 000 ₽',
            hotel: 'Athens Luxury Hotel 4*'
        }
    ];
    
    if (bookings.length === 0) {
        bookingsList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                <i class="fas fa-suitcase" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>У вас пока нет бронирований</p>
                <button class="btn btn-primary" onclick="scrollToSection('contact'); closeCabinet();">
                    Забронировать тур
                </button>
            </div>
        `;
        return;
    }
    
    bookingsList.innerHTML = bookings.map(booking => `
        <div class="booking-item">
            <div class="booking-header">
                <div class="booking-title">${booking.title}</div>
                <div class="booking-status status-${booking.status}">${booking.statusText}</div>
            </div>
            <div class="booking-details">
                <div class="booking-detail">
                    <i class="fas fa-calendar"></i> Даты: <span>${booking.dates}</span>
                </div>
                <div class="booking-detail">
                    <i class="fas fa-users"></i> Гостей: <span>${booking.guests}</span>
                </div>
                <div class="booking-detail">
                    <i class="fas fa-hotel"></i> Отель: <span>${booking.hotel}</span>
                </div>
                <div class="booking-detail">
                    <i class="fas fa-ruble-sign"></i> Стоимость: <span>${booking.price}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function loadUserPayments() {
    const paymentsList = document.getElementById('paymentsList');
    
    // Demo payments data
    const payments = [
        {
            id: 1,
            description: 'Тур в Турцию - первоначальный взнос',
            date: '01.07.2024',
            amount: '25 000 ₽',
            method: 'Банковская карта'
        },
        {
            id: 2,
            description: 'Тур в Турцию - рассрочка 1/3',
            date: '01.08.2024',
            amount: '30 000 ₽',
            method: 'Банковская карта'
        }
    ];
    
    if (payments.length === 0) {
        paymentsList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
                <i class="fas fa-credit-card" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>История платежей пуста</p>
            </div>
        `;
        return;
    }
    
    paymentsList.innerHTML = payments.map(payment => `
        <div class="payment-item">
            <div class="payment-info">
                <h5>${payment.description}</h5>
                <p>${payment.date} • ${payment.method}</p>
            </div>
            <div class="payment-amount">${payment.amount}</div>
        </div>
    `).join('');
}

// Add loading animation to cards
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Check if user is logged in
    checkAuthState();
    loadUserBookings();
    loadUserPayments();
    
    const cards = document.querySelectorAll('.service-card, .destination-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100 + 500);
    });
});

// Close modals when clicking outside
window.onclick = function(event) {
    const authModal = document.getElementById('authModal');
    const cabinetModal = document.getElementById('personalCabinet');
    
    if (event.target === authModal) {
        closeAuthModal();
    }
    if (event.target === cabinetModal) {
        closeCabinet();
    }
};
