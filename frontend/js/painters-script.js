// Sample painters data
const painters = [
    {
        id: 1,
        name: "Mike Painter",
        tagline: "Master Painter - 15+ years experience",
        rating: 4.6,
        reviews: 134,
        jobsCompleted: 98,
        responseTime: "2 hours",
        price: "$65/hr",
        experience: 15,
        distance: "1.8 miles",
        skills: ["Interior Painting", "Exterior Painting", "Wallpaper", "Decorative"],
        specialties: ["interior", "exterior", "decorative"],
        availability: ["weekend"],
        image: "https://images.unsplash.com/photo-1581094794321-8410e6a0d9d2?w=150&h=150&fit=crop&crop=face",
        verified: true,
        providesMaterials: true
    },
    {
        id: 2,
        name: "Sarah Colors",
        tagline: "Interior Painting Specialist",
        rating: 4.8,
        reviews: 89,
        jobsCompleted: 67,
        responseTime: "1.5 hours",
        price: "$70/hr",
        experience: 8,
        distance: "2.3 miles",
        skills: ["Interior Painting", "Color Consulting", "Wall Preparation", "Finish Work"],
        specialties: ["interior", "decorative"],
        availability: [],
        image: "https://images.unsplash.com/photo-1581089778245-3ce67677f718?w=150&h=150&fit=crop&crop=face",
        verified: true,
        providesMaterials: false
    },
    {
        id: 3,
        name: "John ExteriorPro",
        tagline: "Exterior & Commercial Painting Expert",
        rating: 4.7,
        reviews: 156,
        jobsCompleted: 124,
        responseTime: "3 hours",
        price: "$75/hr",
        experience: 12,
        distance: "3.1 miles",
        skills: ["Exterior Painting", "Commercial", "Spray Painting", "Surface Prep"],
        specialties: ["exterior", "commercial", "spray"],
        availability: ["weekend"],
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        verified: true,
        providesMaterials: true
    },
    {
        id: 4,
        name: "David WallMaster",
        tagline: "Wallpaper & Decorative Specialist",
        rating: 4.9,
        reviews: 78,
        jobsCompleted: 56,
        responseTime: "4 hours",
        price: "$80/hr",
        experience: 10,
        distance: "2.7 miles",
        skills: ["Wallpaper Installation", "Decorative Painting", "Faux Finishes", "Murals"],
        specialties: ["wallpaper", "decorative"],
        availability: [],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        verified: true,
        providesMaterials: true
    },
    {
        id: 5,
        name: "Alex QuickPaint",
        tagline: "Quick & Efficient Painting Service",
        rating: 4.5,
        reviews: 112,
        jobsCompleted: 89,
        responseTime: "1 hour",
        price: "$60/hr",
        experience: 6,
        distance: "1.5 miles",
        skills: ["Quick Painting", "Room Painting", "Touch-ups", "Small Projects"],
        specialties: ["interior"],
        availability: ["emergency", "weekend"],
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        verified: false,
        providesMaterials: false
    }
];

// Initialize painters page
document.addEventListener('DOMContentLoaded', function() {
    loadPainters();
    setupSearch();
});

// Load painters grid
function loadPainters(filteredPainters = null) {
    const grid = document.getElementById('paintersGrid');
    const workersToShow = filteredPainters || painters;
    
    grid.innerHTML = '';
    
    if (workersToShow.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No painters found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    workersToShow.forEach(painter => {
        const painterCard = createPainterCard(painter);
        grid.appendChild(painterCard);
    });
}

// Create painter card
function createPainterCard(painter) {
    const card = document.createElement('div');
    card.className = 'worker-card';
    card.onclick = () => viewPainterProfile(painter.id);
    
    const verifiedBadge = painter.verified ? '<span class="verified-badge">✅ Verified</span>' : '';
    const materialsBadge = painter.providesMaterials ? '<span class="materials-badge">🎨 Provides Materials</span>' : '';
    
    card.innerHTML = `
        <div class="worker-header">
            <img src="${painter.image}" alt="${painter.name}" class="worker-avatar">
            <div class="worker-basic-info">
                <h3>${painter.name} ${verifiedBadge} ${materialsBadge}</h3>
                <p class="worker-tagline">${painter.tagline}</p>
                <div class="worker-rating">
                    <span class="rating-stars">${getStarRating(painter.rating)}</span>
                    <span class="rating-text">${painter.rating} (${painter.reviews} reviews)</span>
                </div>
            </div>
        </div>
        
        <div class="worker-stats">
            <div class="stat-item">
                <div class="stat-value">${painter.experience}+ yrs</div>
                <div class="stat-label">Experience</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${painter.responseTime}</div>
                <div class="stat-label">Response Time</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${painter.distance}</div>
                <div class="stat-label">Distance</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${painter.jobsCompleted}</div>
                <div class="stat-label">Jobs Done</div>
            </div>
        </div>
        
        <div class="worker-skills">
            ${painter.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        
        ${painter.availability.includes('emergency') ? '<div class="emergency-badge">🚨 Quick Service</div>' : ''}
        
        <div class="worker-footer">
            <div class="worker-price">${painter.price}</div>
            <div class="worker-actions">
                <button class="view-profile-btn" onclick="event.stopPropagation(); viewPainterProfile(${painter.id})">View Profile</button>
                <button class="book-now-btn" onclick="event.stopPropagation(); bookPainter(${painter.id})">Book Now</button>
            </div>
        </div>
    `;
    
    return card;
}

// View painter profile
function viewPainterProfile(painterId) {
    const painter = painters.find(p => p.id === painterId);
    if (painter) {
        window.location.href = `worker-profile.html?id=${painterId}&service=painter`;
    }
}

// Book painter
function bookPainter(painterId) {
    const painter = painters.find(p => p.id === painterId);
    if (painter) {
        if (confirm(`Book ${painter.name} for your painting project?`)) {
            window.location.href = `booking.html?workerId=${painterId}&service=painter`;
        }
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            filterPainters();
        });
    }
}

// Filter painters based on all criteria
function filterPainters() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const priceFilter = document.querySelector('.filter-select[onchange*="filterByPrice"]')?.value;
    const experienceFilter = document.querySelector('.filter-select[onchange*="filterByExperience"]')?.value;
    
    const specialtyCheckboxes = document.querySelectorAll('input[name="specialty"]:checked');
    const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]:checked');
    const materialsCheckboxes = document.querySelectorAll('input[name="materials"]:checked');
    
    const specialties = Array.from(specialtyCheckboxes).map(cb => cb.value);
    const availabilities = Array.from(availabilityCheckboxes).map(cb => cb.value);
    const providesMaterials = Array.from(materialsCheckboxes).some(cb => cb.value === 'materials');
    
    const filtered = painters.filter(painter => {
        // Search term filter
        const matchesSearch = !searchTerm || 
            painter.name.toLowerCase().includes(searchTerm) ||
            painter.tagline.toLowerCase().includes(searchTerm) ||
            painter.skills.some(skill => skill.toLowerCase().includes(searchTerm));
        
        // Price filter
        const price = parseInt(painter.price.replace('$', '').replace('/hr', ''));
        let matchesPrice = true;
        if (priceFilter && priceFilter !== 'all') {
            const maxPrice = parseInt(priceFilter);
            matchesPrice = price <= maxPrice;
        }
        
        // Experience filter
        let matchesExperience = true;
        if (experienceFilter && experienceFilter !== 'all') {
            const minExperience = parseInt(experienceFilter);
            matchesExperience = painter.experience >= minExperience;
        }
        
        // Specialty filter
        const matchesSpecialty = specialties.length === 0 || 
            specialties.some(specialty => painter.specialties.includes(specialty));
        
        // Availability filter
        const matchesAvailability = availabilities.length === 0 ||
            availabilities.every(availability => painter.availability.includes(availability));
        
        // Materials filter
        const matchesMaterials = !providesMaterials || painter.providesMaterials;
        
        return matchesSearch && matchesPrice && matchesExperience && matchesSpecialty && matchesAvailability && matchesMaterials;
    });
    
    loadPainters(filtered);
}

// Sorting
function sortPainters(criteria) {
    const sorted = [...painters].sort((a, b) => {
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
    
    loadPainters(sorted);
}

// Filter functions
function filterByPrice(value) {
    filterPainters();
}

function filterByExperience(value) {
    filterPainters();
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

// Load more painters (simulated)
function loadMorePainters() {
    showNotification('Loading more painters...', 'info');
    setTimeout(() => {
        showNotification('No more painters to load', 'info');
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