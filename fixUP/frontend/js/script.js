function selectRole(role) {
    // Add loading animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0.7';
        card.style.pointerEvents = 'none';
    });

    // Show loading state
    const selectedCard = document.querySelector(`.${role}-card`);
    selectedCard.style.transform = 'scale(0.95)';
    
    // Simulate loading and redirect
    setTimeout(() => {
        if (role === 'user') {
            window.location.href = 'pages/user-home.html';
        } else {
            window.location.href = 'pages/worker-home.html';
        }
    }, 800);
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
});