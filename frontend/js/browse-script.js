// Sample workers data
const workers = [
    {
        id: 1,
        name: "Mike Carpenter",
        tagline: "Master Carpenter - 15+ years experience",
        rating: 4.8,
        reviews: 124,
        jobsCompleted: 89,
        responseTime: "2 hours",
        price: "$75/hr",
        skills: ["Custom Furniture", "Cabinet Making", "Renovations"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 2,
        name: "Sarah Woodworks",
        tagline: "Custom Furniture Specialist",
        rating: 4.9,
        reviews: 87,
        jobsCompleted: 64,
        responseTime: "1 hour",
        price: "$85/hr",
        skills: ["Custom Tables", "Chairs", "Wood Carving"],
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 3,
        name: "John Handyman",
        tagline: "All-around repair expert",
        rating: 4.6,
        reviews: 203,
        jobsCompleted: 156,
        responseTime: "3 hours",
        price: "$65/hr",
        skills: ["Furniture Repair", "Installations", "General Repairs"],
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 4,
        name: "David Construction",
        tagline: "Professional cabinet installer",
        rating: 4.7,
        reviews: 91,
        jobsCompleted: 72,
        responseTime: "4 hours",
        price: "$70/hr",
        skills: ["Cabinet Installation", "Kitchen Remodel", "Built-ins"],
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
];

// Load workers grid
function loadWorkers() {
    const grid = document.getElementById('workersGrid');
    
    workers.forEach(worker => {
        const workerCard = document.createElement('div');
        workerCard.className = 'worker-card';
        workerCard.onclick = () => viewWorkerProfile(worker.id);
        
        workerCard.innerHTML = `
            <div class="worker-header">
                <img src="${worker.image}" alt="${worker.name}" class="worker-avatar">
                <div class="worker-basic-info">
                    <h3>${worker.name}</h3>
                    <p class="worker-tagline">${worker.tagline}</p>
                    <div class="worker-rating">
                        <span class="rating-stars">${getStarRating(worker.rating)}</span>
                        <span class="rating-text">${worker.rating} (${worker.reviews} reviews)</span>
                    </div>
                </div>
            </div>
            
            <div class="worker-stats">
                <div class="stat-item">
                    <div class="stat-value">${worker.jobsCompleted}</div>
                    <div class="stat-label">Jobs Done</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${worker.responseTime}</div>
                    <div class="stat-label">Response Time</div>
                </div>
            </div>
            
            <div class="worker-skills">
                ${worker.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            
            <div class="worker-footer">
                <div class="worker-price">${worker.price}</div>
                <button class="view-profile-btn" onclick="event.stopPropagation(); viewWorkerProfile(${worker.id})">View Profile</button>
            </div>
        `;
        
        grid.appendChild(workerCard);
    });
}

// Helper function to convert rating to stars
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

// View worker profile
function viewWorkerProfile(workerId) {
    // Add loading animation
    const cards = document.querySelectorAll('.worker-card');
    cards.forEach(card => card.style.opacity = '0.6');
    
    const selectedCard = document.querySelector(`.worker-card:nth-child(${workerId})`);
    if (selectedCard) {
        selectedCard.style.opacity = '1';
        selectedCard.style.transform = 'scale(1.02)';
    }
    
    // Redirect to profile page
    setTimeout(() => {
        window.location.href = `worker-profile.html?id=${workerId}`;
    }, 600);
}

// Sorting functionality
function sortWorkers(criteria) {
    const grid = document.getElementById('workersGrid');
    const cards = Array.from(grid.children);
    
    cards.sort((a, b) => {
        // This would be enhanced with actual data sorting
        return Math.random() - 0.5; // Simple shuffle for demo
    });
    
    // Re-append sorted cards
    cards.forEach(card => grid.appendChild(card));
}

// Filter functionality
function toggleFilters() {
    alert('🔧 More filter options would open here!');
}

// Initialize browse page
document.addEventListener('DOMContentLoaded', function() {
    loadWorkers();
});