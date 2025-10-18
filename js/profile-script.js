// Sample reviews data
const reviews = [
    {
        id: 1,
        name: "Jessica Smith",
        rating: 5,
        date: "2 weeks ago",
        text: "Mike did an amazing job on our custom dining table! His attention to detail is incredible. Highly recommended!"
    },
    {
        id: 2,
        name: "Robert Johnson",
        rating: 4,
        date: "1 month ago",
        text: "Great work on the kitchen cabinets. Professional and punctual. Will hire again for future projects."
    },
    {
        id: 3,
        name: "Maria Garcia",
        rating: 5,
        date: "3 months ago",
        text: "Transformed our living room with custom built-ins. Mike is a true craftsman!"
    }
];

// Load reviews
function loadReviews() {
    const reviewsList = document.getElementById('reviewsList');
    
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        reviewElement.innerHTML = `
            <div class="review-header">
                <div class="reviewer-name">${review.name}</div>
                <div class="review-date">${review.date}</div>
            </div>
            <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <div class="review-text">${review.text}</div>
        `;
        
        reviewsList.appendChild(reviewElement);
    });
}

// Contact worker
function contactWorker() {
    const contactBtn = document.querySelector('.btn-primary');
    const originalText = contactBtn.textContent;
    
    contactBtn.textContent = '📞 Calling...';
    contactBtn.disabled = true;
    
    setTimeout(() => {
        alert('📞 Connection established! You can now chat with Mike.');
        contactBtn.textContent = originalText;
        contactBtn.disabled = false;
    }, 1500);
}

// Book appointment
function bookAppointment() {
    // Simulate booking process
    const name = prompt("Enter your name for the booking:");
    if (name) {
        const date = prompt("Preferred date (e.g., Next Monday):");
        if (date) {
            alert(`✅ Booking confirmed!\n\nFor: ${name}\nWith: Mike Carpenter\nDate: ${date}\n\nMike will contact you to confirm details!`);
        }
    }
}

// Initialize profile page
document.addEventListener('DOMContentLoaded', function() {
    loadReviews();
    
    // Add some interactive effects
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Portfolio item click
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            alert('🖼️ Portfolio image enlarged!');
        });
    });
});
function messageWorker() {
    const workerId = new URLSearchParams(window.location.search).get('id');
    if (workerId) {
        window.location.href = `chat.html?workerId=${workerId}`;
    }
}