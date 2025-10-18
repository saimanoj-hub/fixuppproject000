// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const submitBtn = event.target.querySelector('.auth-btn');
    
    // Show loading state
    submitBtn.textContent = 'Signing In...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // For demo purposes, always succeed
        const userData = {
            email: email,
            name: email.split('@')[0],
            role: 'user' // In real app, this would come from backend
        };
        
        // Save to localStorage
        localStorage.setItem('fixUP_user', JSON.stringify(userData));
        
        // Show success and redirect
        showNotification('🎉 Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            // Redirect based on user role (in real app, this would be determined by backend)
            window.location.href = 'user-home.html';
        }, 1500);
        
    }, 2000);
}

// Handle register form submission
function handleRegister(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.querySelector('input[name="role"]:checked').value;
    const submitBtn = event.target.querySelector('.auth-btn');
    
    // Basic validation
    if (password !== confirmPassword) {
        showNotification('❌ Passwords do not match!', 'error');
        return;
    }
    
    if (password.length < 8) {
        showNotification('❌ Password must be at least 8 characters', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.textContent = 'Creating Account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        const userData = {
            name: fullName,
            email: email,
            role: role
        };
        
        // Save to localStorage
        localStorage.setItem('fixUP_user', JSON.stringify(userData));
        
        // Show success
        showNotification('🎉 Account created successfully!', 'success');
        
        setTimeout(() => {
            // Redirect based on selected role
            if (role === 'user') {
                window.location.href = 'user-home.html';
            } else {
                window.location.href = 'worker-home.html';
            }
        }, 1500);
        
    }, 2000);
}

// Social login handlers
function handleGoogleLogin() {
    showNotification('🔍 Redirecting to Google...', 'info');
    // In real app: window.location.href = '/auth/google';
}

function handleFacebookLogin() {
    showNotification('📘 Redirecting to Facebook...', 'info');
    // In real app: window.location.href = '/auth/facebook';
}

// Notification system
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#43e97b' : '#667eea'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Update main script.js for new landing page
function getStarted() {
    window.location.href = 'pages/register.html';
}

// Add social login event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Social buttons
    const googleBtns = document.querySelectorAll('.google-btn');
    const facebookBtns = document.querySelectorAll('.facebook-btn');
    
    googleBtns.forEach(btn => {
        btn.addEventListener('click', handleGoogleLogin);
    });
    
    facebookBtns.forEach(btn => {
        btn.addEventListener('click', handleFacebookLogin);
    });
    
    // Role selection animations
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.parentElement.querySelector('input').checked) {
                this.style.transform = 'scale(1.02)';
                this.style.borderColor = '#cbd5e0';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.parentElement.querySelector('input').checked) {
                this.style.transform = 'scale(1)';
                this.style.borderColor = '#e2e8f0';
            }
        });
    });
});

// Check if user is logged in (for other pages)
function checkAuth() {
    const user = localStorage.getItem('fixUP_user');
    if (!user) {
        window.location.href = 'pages/login.html';
        return null;
    }
    return JSON.parse(user);
}

// Logout function
function logout() {
    localStorage.removeItem('fixUP_user');
    window.location.href = '../index.html';
}