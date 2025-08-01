// Global variables
let currentUser = null;
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initNavigation();
    initSearchTabs();
    initAuthState();
    
    // Add smooth scrolling for navigation links
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
});

// Theme Management
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Navigation Management
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Search Tabs Management
function initSearchTabs() {
    const searchTabs = document.querySelectorAll('.search-tab');
    const searchPanels = document.querySelectorAll('.search-panel');
    
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            switchSearchTab(target);
        });
    });
}

function switchSearchTab(tabName) {
    // Remove active class from all tabs and panels
    document.querySelectorAll('.search-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.search-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Add active class to selected tab and panel
    document.querySelector(`[onclick*="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-search`).classList.add('active');
}

// Authentication Management
function initAuthState() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthState();
    }
}

function updateAuthState() {
    const authButton = document.querySelector('.btn-auth');
    
    if (currentUser) {
        authButton.innerHTML = `
            <i class="fas fa-user"></i>
            ${currentUser.name}
        `;
        authButton.onclick = () => openCabinet();
    } else {
        authButton.innerHTML = `
            <i class="fas fa-user"></i>
            Войти
        `;
        authButton.onclick = () => openAuthModal('login');
    }
}

// Modal Management
function openAuthModal(type) {
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (type === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clear form fields
    document.querySelectorAll('#authModal input').forEach(input => {
        input.value = '';
    });
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

// Form Handlers
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Пожалуйста, заполните все поля', 'error');
        return;
    }
    
    // Simulate login
    currentUser = {
        name: email.split('@')[0],
        email: email
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthState();
    closeAuthModal();
    showNotification('Успешный вход в систему!', 'success');
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
    const privacyAgreement = document.getElementById('registerPrivacy').checked;
    
    // Validation
    if (!name || !email || !phone || !password || !passwordConfirm) {
        showNotification('Пожалуйста, заполните все поля', 'error');
        return;
    }
    
    if (password !== passwordConfirm) {
        showNotification('Пароли не совпадают', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Пароль должен содержать минимум 6 символов', 'error');
        return;
    }
    
    if (!privacyAgreement) {
        showNotification('Необходимо согласиться с политикой конфиденциальности', 'error');
        return;
    }
    
    // Simulate registration
    currentUser = {
        name: name,
        email: email,
        phone: phone
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthState();
    closeAuthModal();
    showNotification('Регистрация прошла успешно!', 'success');
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthState();
    showNotification('Вы вышли из системы', 'info');
}

// Personal Cabinet
function openCabinet() {
    // For now, just show user info
    if (currentUser) {
        showNotification(`Добро пожаловать, ${currentUser.name}!`, 'success');
    }
}

// Search Functionality
function performSearch() {
    const searchType = document.querySelector('.search-tab.active').textContent.trim();
    showNotification(`Поиск ${searchType.toLowerCase()}...`, 'info');
    
    // Simulate search delay
    setTimeout(() => {
        showNotification('Результаты поиска будут показаны в новой версии сайта', 'info');
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    return colors[type] || colors.info;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-content button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: background 0.3s ease;
    }
    
    .notification-content button:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .header.scrolled {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(style);

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('authModal');
    if (event.target === modal) {
        closeAuthModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAuthModal();
    }
});

// Add search button functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.btn-search');
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
});

// Add favorite button functionality
document.addEventListener('DOMContentLoaded', function() {
    const favoriteButton = document.querySelector('.btn-secondary');
    if (favoriteButton) {
        favoriteButton.addEventListener('click', function() {
            showNotification('Тур добавлен в избранное', 'success');
        });
    }
});
