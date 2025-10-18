// Sample constructors data
const constructors = [
    {
        id: 1,
        name: "Mike Constructor",
        tagline: "Licensed General Contractor - 20+ years experience",
        rating: 4.8,
        reviews: 189,
        jobsCompleted: 145,
        responseTime: "4 hours",
        price: "$95/hr",
        experience: 20,
        distance: "3.2 miles",
        skills: ["Home Renovation", "Structural Repair", "Room Additions", "Remodeling"],
        specialties: ["renovation", "repair", "additions"],
        availability: [],
        image: "https://images.unsplash.com/photo-1581094794321-8410e6a0d9d2?w=150&h=150&fit=crop&crop=face",
        verified: true,
        licensed: true
    },
    {
        id: 2,
        name: "Sarah BuildPro",
        tagline: "Renovation & Remodeling Specialist",
        rating: 4.7,
        reviews: 134,
        jobsCompleted: 98,
        responseTime: "3 hours",
        price: "$85/hr",
        experience: 12,
        distance: "2.5 miles",
        skills: ["Kitchen Remodel", "Bathroom Renovation", "Flooring", "Tile Work"],
        specialties: ["renovation", "remodeling"],
        availability: ["weekend"],
        image: "https://images.unsplash.com/photo-1581089778245-3ce67677f718?w=150&h=150&fit=crop&crop=face",
        verified: true,
        licensed: true
    },
    {
        id: 3,
        name: "John StructureMaster",
        tagline: "Structural Repair & Foundation Expert",
        rating: 4.9,
        reviews: 112,
        jobsCompleted: 78,
        responseTime: "6 hours",
        price: "$120/hr",
        experience: 18,
        distance: "4.5 miles",
        skills: ["Foundation Repair", "Structural Engineering", "Water Damage", "Load-bearing"],
        specialties: ["repair", "foundation"],
        availability: [],
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        verified: true,
        licensed: true
    },
    {
        id: 4,
        name: "David DeckBuilder",
        tagline: "Deck, Patio & Outdoor Specialist",
        rating: 4.6,
        reviews: 89,
        jobsCompleted: 67,
        responseTime: "2 hours",
        price: "$75/hr",
        experience: 8,
        distance: "2.1 miles",
        skills: ["Deck Building", "Patio Construction", "Outdoor Living", "Pergolas"],
        specialties: ["deck"],
        availability: ["weekend"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        verified: true,
        licensed: false
    },
    {
        id: 5,
        name: "Alex SmallProjects",
        tagline: "Small Project & Handyman Services",
        rating: 4.5,
        reviews: 156,
        jobsCompleted: 132,
        responseTime: "1.5 hours",
        price: "$65/hr",
        experience: 6,
        distance: "1.8 miles",
        skills: ["Small Repairs", "Drywall", "Painting", "Basic Carpentry"],
        specialties: ["small"],
        availability: ["emergency", "weekend"],
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        verified: true,
        licensed: false
    }
];

// Initialize constructors page
document.addEventListener('DOMContentLoaded', function() {
    loadConstructors();
    setupSearch();
});

// Load constructors grid
function loadConstructors(filteredConstructors = null) {
    const grid = document.getElementById('constructorsGrid');
    const workersToShow = filteredConstructors || constructors;
    
    grid.innerHTML = '';
    
    if (workersToShow.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No constructors found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    workersToShow.forEach(constructor => {
        const constructorCard = createConstructorCard(constructor);
        grid.appendChild(constructorCard);
    });
}

// Create constructor card
function createConstructorCard(constructor) {
    const card = document.createElement('div');
    card.className = 'worker-card';
    card.onclick = () => viewConstructorProfile(constructor.id);
    
    const verifiedBadge = constructor.verified ? '<span class="verified-badge">✅ Verified</span>' : '';
    const licensedBadge = constructor.licensed ? '<span class="licensed-badge">📜 Licensed</span>' : '';
    
    card.innerHTML = `
        <div class="worker-header">
            <img src="${constructor.image}" alt="${constructor.name}" class="worker-avatar">
            <div class="worker-basic-info">
                <h3>${constructor.name} ${verifiedBadge} ${licensedBadge}</h3>
                <p class="worker-tagline">${constructor.tagline}</p>
                <div class="worker-rating">
                    <span class="rating-stars">${getStarRating(constructor.rating)}</span>
                    <span class="rating-text">${constructor.rating} (${constructor.reviews} reviews)</span>
                </div>
            </div>
        </div>
        
        <div class="worker-stats">
            <div class="stat-item">
                <div class="stat-value">${constructor.experience}+ yrs</div>
                <div class="stat-label">Experience</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${constructor.responseTime}</div>
                <div class="stat-label">Response Time</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${constructor.distance}</div>
                <div class="stat-label">Distance</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${constructor.jobsCompleted}</div>
                <div class="stat-label">Jobs Done</div>
            </div>
        </div>
        
        <div class="worker-skills">
            ${constructor.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        
        ${constructor.availability.includes('emergency') ? '<div class="emergency-badge">🚨 Quick Service</div>' : ''}
        
        <div class="worker-footer">
            <div class="worker-price">${constructor.price}</div>
            <div class="worker-actions">
                <button class="view-profile-btn" onclick="event.stopPropagation(); viewConstructorProfile(${constructor.id})">View Profile</button>
                <button class="book-now-btn" onclick="event.stopPropagation(); bookConstructor(${constructor.id})">Book Now</button>
            </div>
        </div>
    `;
    
    return card;
}

// View constructor profile
function viewConstructorProfile(constructorId) {
    const constructor = constructors.find(c => c.id === constructorId);
    if (constructor) {
        window.location.href = `worker-profile.html?id=${constructorId}&service=constructor`;
    }
}

// Book constructor
function bookConstructor(constructorId) {
    const constructor = constructors.find(c => c.id === constructorId);
    if (constructor) {
        if (confirm(`Book ${constructor.name} for your construction project?`)) {
            window.location.href = `booking.html?workerId=${constructorId}&service=constructor`;
        }
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            filterConstructors();
        });
    }
}

// Filter constructors based on all criteria
function filterConstructors() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const priceFilter = document.querySelector('.filter-select[onchange*="filterByPrice"]')?.value;
    const experienceFilter = document.querySelector('.filter-select[onchange*="filterByExperience"]')?.value;
    
    const specialtyCheckboxes = document.querySelectorAll('input[name="specialty"]:checked');
    const projectSizeCheckboxes = document.querySelectorAll('input[name="project_size"]:checked');
    const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]:checked');
    const certificationCheckboxes = document.querySelectorAll('input[name="certification"]:checked');
    
    const specialties = Array.from(specialtyCheckboxes).map(cb => cb.value);
    const projectSizes = Array.from(projectSizeCheckboxes).map(cb => cb.value);
    const availabilities = Array.from(availabilityCheckboxes).map(cb => cb.value);
    const licensedOnly = Array.from(certificationCheckboxes).some(cb => cb.value === 'licensed');
    
    const filtered = constructors.filter(constructor => {
        // Search term filter
        const matchesSearch = !searchTerm || 
            constructor.name.toLowerCase().includes(searchTerm) ||
            constructor.tagline.toLowerCase().includes(searchTerm) ||
            constructor.skills.some(skill => skill.toLowerCase().includes(searchTerm));
        
        // Price filter
        const price = parseInt(constructor.price.replace('$', '').replace('/hr', ''));
        let matchesPrice = true;
        if (priceFilter && priceFilter !== 'all') {
            const maxPrice = parseInt(priceFilter);
            matchesPrice = price <= maxPrice;
        }
        
        // Experience filter
        let matchesExperience = true;
        if (experienceFilter && experienceFilter !== 'all') {
            const minExperience = parseInt(experienceFilter);
            matchesExperience = constructor.experience >= minExperience;
        }
        
        // Specialty filter
        const matchesSpecialty = specialties.length === 0 || 
            specialties.some(specialty => constructor.specialties.includes(specialty));
        
        // Project size filter
        const matchesProjectSize = projectSizes.length === 0 ||
            projectSizes.some(size => {
                if (size === 'small') return constructor.specialties.includes('small');
                if (size === 'large') return !constructor.specialties.includes('small');
                return true;
            });
        
        // Availability filter
        const matchesAvailability = availabilities.length === 0 ||
            availabilities.every(availability => constructor.availability.includes(availability));
        
        // Certification filter
        const matchesCertification = !licensedOnly || constructor.licensed;
        
        return matchesSearch && matchesPrice && matchesExperience && matchesSpecialty && matchesProjectSize && matchesAvailability && matchesCertification;
    });
    
    loadConstructors(filtered);
}

// Sorting
function sortConstructors(criteria) {
    const sorted = [...constructors].sort((a, b) => {
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
    
    loadConstructors(sorted);
}

// Filter functions
function filterByPrice(value) {
    filterConstructors();
}

function filterByExperience(value) {
    filterConstructors();
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

// Load more constructors (simulated)
function loadMoreConstructors() {
    showNotification('Loading more constructors...', 'info');
    setTimeout(() => {
        showNotification('No more constructors to load', 'info');
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