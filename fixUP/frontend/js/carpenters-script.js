// Sample carpenters data
const carpenters = [
    {
        id: 1,
        name: "Mike Carpenter",
        tagline: "Master Carpenter - 15+ years experience",
        rating: 4.8,
        reviews: 124,
        jobsCompleted: 89,
        responseTime: "2 hours",
        price: "$75/hr",
        experience: 15,
        distance: "2.3 miles",
        skills: ["Custom Furniture", "Cabinet Making", "Renovations", "Woodworking"],
        specialties: ["furniture", "cabinets", "renovations"],
        availability: ["emergency", "weekend"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        verified: true
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
        experience: 8,
        distance: "1.8 miles",
        skills: ["Custom Tables", "Chairs", "Wood Carving", "Restoration"],
        specialties: ["furniture", "repairs"],
        availability: ["weekend"],
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        verified: true
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
        experience: 12,
        distance: "4.1 miles",
        skills: ["Furniture Repair", "Installations", "General Repairs", "Assembly"],
        specialties: ["repairs"],
        availability: ["emergency"],
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        verified: true
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
        experience: 10,
        distance: "3.5 miles",
        skills: ["Cabinet Installation", "Kitchen Remodel", "Built-ins", "Custom Storage"],
        specialties: ["cabinets", "renovations"],
        availability: [],
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        verified: false
    },
    {
        id: 5,
        name: "Alex Woodcraft",
        tagline: "Fine woodworking specialist",
        rating: 4.9,
        reviews: 56,
        jobsCompleted: 42,
        responseTime: "6 hours",
        price: "$95/hr",
        experience: 6,
        distance: "5.2 miles",
        skills: ["Fine Woodworking", "Custom Joinery", "Finish Carpentry", "Design"],
        specialties: ["furniture"],
        availability: [],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        verified: true
    }
];

// Initialize carpenters page
document.addEventListener('DOMContentLoaded', function() {
    loadCarpenters();
    setupSearch();
});

// Load carpenters grid
function loadCarpenters(filteredCarpenters = null) {
    const grid = document.getElementById('carpentersGrid');
    const workersToShow = filteredCarpenters || carpenters;
    
    grid.innerHTML = '';
    
    if (workersToShow.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No carpenters found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    workersToShow.forEach(carpenter => {
        const carpenterCard = createCarpenterCard(carpenter);
        grid.appendChild(carpenterCard);
    });
}

// Create carpenter card
function createCarpenterCard(carpenter) {
    const card = document.createElement('div');
    card.className = 'worker-card';
    card.onclick = () => viewCarpenterProfile(carpenter.id);
    
    const verifiedBadge = carpenter.verified ? '<span class="verified-badge">✅ Verified</span>' : '';
    
    card.innerHTML = `
        <div class="worker-header">
            <img src="${carpenter.image}" alt="${carpenter.name}" class="worker-avatar">
            <div class="worker-basic-info">
                <h3>${carpenter.name} ${verifiedBadge}</h3>
                <p class="worker-tagline">${carpenter.tagline}</p>
                <div class="worker-rating">
                    <span class="rating-stars">${getStarRating(carpenter.rating)}</span>
                    <span class="rating-text">${carpenter.rating} (${carpenter.reviews} reviews)</span>
                </div>
            </div>
        </div>
        
        <div class="worker-stats">
            <div class="stat-item">
                <div class="stat-value">${carpenter.experience}+ yrs</div>
                <div class="stat-label">Experience</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${carpenter.responseTime}</div>
                <div class="stat-label">Response Time</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${carpenter.distance}</div>
                <div class="stat-label">Distance</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${carpenter.jobsCompleted}</div>
                <div class="stat-label">Jobs Done</div>
            </div>
        </div>
        
        <div class="worker-skills">
            ${carpenter.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        
        ${carpenter.availability.includes('emergency') ? '<div class="emergency-badge">🚨 Emergency Service</div>' : ''}
        
        <div class="worker-footer">
            <div class="worker-price">${carpenter.price}</div>
            <div class="worker-actions">
                <button class="view-profile-btn" onclick="event.stopPropagation(); viewCarpenterProfile(${carpenter.id})">View Profile</button>
                <button class="book-now-btn" onclick="event.stopPropagation(); bookCarpenter(${carpenter.id})">Book Now</button>
            </div>
        </div>
    `;
    
    return card;
}

// View carpenter profile
function viewCarpenterProfile(carpenterId) {
    const carpenter = carpenters.find(c => c.id === carpenterId);
    if (carpenter) {
        window.location.href = `worker-profile.html?id=${carpenterId}&service=carpenter`;
    }
}

// Book carpenter
function bookCarpenter(carpenterId) {
    const carpenter = carpenters.find(c => c.id === carpenterId);
    if (carpenter) {
        if (confirm(`Book ${carpenter.name} for your project?`)) {
            window.location.href = `booking.html?workerId=${carpenterId}&service=carpenter`;
        }
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterCarpenters();
        });
    }
}

// Filter carpenters based on all criteria
function filterCarpenters() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const priceFilter = document.querySelector('.filter-select[onchange*="filterByPrice"]')?.value;
    const experienceFilter = document.querySelector('.filter-select[onchange*="filterByExperience"]')?.value;
    
    const specialtyCheckboxes = document.querySelectorAll('input[name="specialty"]:checked');
    const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]:checked');
    
    const specialties = Array.from(specialtyCheckboxes).map(cb => cb.value);
    const availabilities = Array.from(availabilityCheckboxes).map(cb => cb.value);
    
    const filtered = carpenters.filter(carpenter => {
        // Search term filter
        const matchesSearch = !searchTerm || 
            carpenter.name.toLowerCase().includes(searchTerm) ||
            carpenter.tagline.toLowerCase().includes(searchTerm) ||
            carpenter.skills.some(skill => skill.toLowerCase().includes(searchTerm));
        
        // Price filter
        const price = parseInt(carpenter.price.replace('$', '').replace('/hr', ''));
        let matchesPrice = true;
        if (priceFilter && priceFilter !== 'all') {
            const maxPrice = parseInt(priceFilter);
            matchesPrice = price <= maxPrice;
        }
        
        // Experience filter
        let matchesExperience = true;
        if (experienceFilter && experienceFilter !== 'all') {
            const minExperience = parseInt(experienceFilter);
            matchesExperience = carpenter.experience >= minExperience;
        }
        
        // Specialty filter
        const matchesSpecialty = specialties.length === 0 || 
            specialties.some(specialty => carpenter.specialties.includes(specialty));
        
        // Availability filter
        const matchesAvailability = availabilities.length === 0 ||
            availabilities.every(availability => carpenter.availability.includes(availability));
        
        return matchesSearch && matchesPrice && matchesExperience && matchesSpecialty && matchesAvailability;
    });
    
    loadCarpenters(filtered);
}

// Sorting
function sortCarpenters(criteria) {
    const sorted = [...carpenters].sort((a, b) => {
        switch(criteria) {
            case 'rating':
                return b.rating - a.rating;
            case 'experience':
                return b.experience - a.experience;
            case 'price':
                const priceA = parseInt(a.price.replace('$', '').replace('/hr', ''));
                const priceB = parseInt(b.price.replace('$', '').replace('/hr', ''));
                return priceA - priceB;
            case 'distance':
                const distA = parseFloat(a.distance);
                const distB = parseFloat(b.distance);
                return distA - distB;
            default:
                return 0;
        }
    });
    
    loadCarpenters(sorted);
}

// Filter functions
function filterByPrice(value) {
    filterCarpenters();
}

function filterByExperience(value) {
    filterCarpenters();
}

// Toggle advanced filters
function toggleAdvancedFilters() {
    const advancedFilters = document.getElementById('advancedFilters');
    if (advancedFilters.style.display === 'none') {
        advancedFilters.style.display = 'block';
        event.target.textContent = '⚙️ Fewer Filters';
    } else {
        advancedFilters.style.display = 'none';
        event.target.textContent = '⚙️ More Filters';
    }
}

// Load more carpenters (simulated)
function loadMoreCarpenters() {
    // In real app, this would fetch more data from API
    showNotification('Loading more carpenters...', 'info');
    setTimeout(() => {
        showNotification('No more carpenters to load', 'info');
    }, 1000);
}

// Helper function for star ratings
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
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
        background: ${type === 'error' ? '#ff6b6b' : type === 'success' ? '#43e97b' : '#667eea'};
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
    }, 3000);
}