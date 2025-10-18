// Initialize confirmation page
document.addEventListener('DOMContentLoaded', function() {
    loadBookingDetails();
    startConfetti();
});

// Load booking details from URL parameters or localStorage
function loadBookingDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const bookingId = urlParams.get('bookingId');
    
    // For demo purposes, use sample data
    // In real app, you'd fetch from API using bookingId
    const bookingData = {
        workerName: "Mike Carpenter",
        serviceType: "Furniture Repair",
        bookingDate: "January 18, 2024",
        bookingTime: "Morning (8AM - 12PM)",
        bookingLocation: "123 Main St, Downtown",
        bookingCost: "$165"
    };
    
    // Update DOM with booking details
    document.getElementById('workerName').textContent = bookingData.workerName;
    document.getElementById('serviceType').textContent = bookingData.serviceType;
    document.getElementById('bookingDate').textContent = bookingData.bookingDate;
    document.getElementById('bookingTime').textContent = bookingData.bookingTime;
    document.getElementById('bookingLocation').textContent = bookingData.bookingLocation;
    document.getElementById('bookingCost').textContent = bookingData.bookingCost;
    
    // Save to localStorage for demo
    localStorage.setItem('lastBooking', JSON.stringify(bookingData));
}

// Simple confetti effect for celebration
function startConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    `;
    document.body.appendChild(confettiContainer);
    
    // Create some confetti elements
    for (let i = 0; i < 50; i++) {
        createConfettiPiece(confettiContainer);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 3000);
}

function createConfettiPiece(container) {
    const confetti = document.createElement('div');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    const emojis = ['🎉', '✅', '🎊', '⭐', '💫', '✨'];
    
    confetti.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 20 + 15}px;
        top: -50px;
        left: ${Math.random() * 100}%;
        animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
    `;
    
    confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    container.appendChild(confetti);
    
    // Add keyframes for animation
    if (!document.querySelector('#confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confetti-fall {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Share booking details
function shareBooking() {
    const bookingData = JSON.parse(localStorage.getItem('lastBooking') || '{}');
    
    const shareText = `I just booked a service on fixUP!\n\n` +
                     `Professional: ${bookingData.workerName}\n` +
                     `Service: ${bookingData.serviceType}\n` +
                     `Date: ${bookingData.bookingDate}\n` +
                     `Time: ${bookingData.bookingTime}\n\n` +
                     `Book your own services at fixUP!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My fixUP Booking',
            text: shareText,
            url: window.location.href
        }).catch(err => {
            console.log('Error sharing:', err);
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

function fallbackShare(text) {
    // Copy to clipboard as fallback
    navigator.clipboard.writeText(text).then(() => {
        showNotification('📋 Booking details copied to clipboard!', 'success');
    }).catch(() => {
        // Final fallback - show text in alert
        alert('Share this booking:\n\n' + text);
    });
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff6b6b' : '#43e97b'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}