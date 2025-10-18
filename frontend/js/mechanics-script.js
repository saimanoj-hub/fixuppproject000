// Sample mechanics data
const mechanics = [
    {
        id: 1,
        name: "Mike Mechanic",
        tagline: "ASE Certified Master Technician - 12+ years experience",
        rating: 4.7,
        reviews: 167,
        jobsCompleted: 132,
        responseTime: "2 hours",
        price: "$85/hr",
        experience: 12,
        distance: "2.5 miles",
        skills: ["Engine Repair", "Brake Systems", "Diagnostics", "Transmission"],
        specialties: ["engine", "brakes", "diagnostics"],
        availability: ["emergency", "mobile"],
        image: "https://images.unsplash.com/photo-1581094794321-8410e6a0d9d2?w=150&h=150&fit=crop&crop=face",
        verified: true,
        certified: true
    },
    {
        id: 2,
        name: "Sarah AutoCare",
        tagline: "Electrical & Diagnostics Specialist",
        rating: 4.8,
        reviews: 94,
        jobsCompleted: 71,
        responseTime: "1.5 hours",
        price: "$95/hr",
        experience: 8,
        distance: "1.8 miles",
        skills: ["Auto Electrical", "Computer Diagnostics", "AC Repair", "Sensors"],
        specialties: ["electrical", "diagnostics", "ac"],
        availability: ["mobile"],
        image: "https://images.unsplash.com/photo-1581089778245-3ce67677f718?w=150&h=150&fit=crop&crop=face",
        verified: true,
        certified: true
    },
    {
        id: 3,
        name: "John BrakeMaster",
        tagline: "Brake & Suspension Expert",
        rating: 4.6,
        reviews: 203,
        jobsCompleted: 178,
        responseTime: "3 hours",
        price: "$75/hr",
        experience: 15,
        distance: "3.2 miles",
        skills: ["Brake Repair", "Suspension", "Alignment", "Steering"],
        specialties: ["brakes"],
        availability: ["emergency", "weekend"],
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        verified: true,
        certified: true
    },
    {
        id: 4,
        name: "David EnginePro",
        tagline: "Engine & Transmission Specialist",
        rating: 4.9,
        reviews: 145,
        jobsCompleted: 112,
        responseTime: "4 hours",
        price: "$110/hr",
        experience: 18,
        distance: "4.1 miles",
        skills: ["Engine Repair", "Transmission", "Timing Belts", "Performance"],
        specialties: ["engine"],
        availability: [],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        verified: true,
        certified: true
    },
    {
        id: 5,
        name: "Alex MobileMechanic",
        tagline: "Mobile Repair Service - We Come to You",
        rating: 4.5,
        reviews: 89,
        jobsCompleted: 67,
        responseTime: "1 hour",
        price: "$90/hr",
        experience: 6,
        distance: "2.2 miles",
        skills: ["Mobile Service", "Quick Repairs", "Maintenance", "Tire Service"],
        specialties: ["maintenance"],
        availability: ["mobile", "emergency", "weekend"],
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        verified: true,
        certified: false
    }
];

// Initialize mechanics page
document.addEventListener('DOMContentLoaded', function() {
    loadMechanics();
    setupSearch();
});

// Load mechanics grid
function loadMechanics(filteredMechanics = null) {
    const grid = document.getElementById('mechanicsGrid');
    const workersToShow = filteredMechanics || mechanics;
    
    grid.innerHTML = '';
    
    if (workersToShow.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No mechanics found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    workersToShow.forEach(mechanic => {
        const mechanicCard = createMechanicCard(mechanic);
        grid.appendChild(mechanicCard);
    });
}

// Create mechanic card
function createMechanicCard(mechanic) {
    const card = document.createElement('div');
    card.className = 'worker-card';
    card.onclick = () => viewMechanicProfile(mechanic.id);
    
    const verifiedBadge = mechanic.verified ? '<span class="verified-badge">✅ Verified</span>' : '';
    const certifiedBadge = mechanic.certified ? '<span class="licensed-badge">🏅 Certified</span>' : '';
    
    card.innerHTML = `
        <div class="worker-header">
            <img src="${mechanic.image}" alt="${mechanic.name}" class="worker-avatar">
            <div class="worker-basic-info">
                <h3>${mechanic.name} ${verifiedBadge} ${certifiedBadge}</h3>
                <p class="worker-tagline">${mechanic.tagline}</p>
                <div class="worker-rating">
                    <span class="rating-stars">${getStarRating(mechanic.rating)}</span>
                    <span class="rating-text">${mechanic.rating} (${mechanic.reviews} reviews)</span>
                </div>
            </div>
        </div>
        
        <div class="worker-stats">
            <div class="stat-item">
                <div class="stat-value">${mechanic.experience}+ yrs</div>
                <div class="stat-label">Experience</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${mechanic.responseTime}</div>
                <div class="stat-label">Response Time</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${mechanic.distance}</div>
                <div class="stat-label">Distance</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${mechanic.jobsCompleted}</div>
                <div class="stat-label">Jobs Done</div>
            </div>
        </div>
        
        <div class="worker-skills">
            ${mechanic.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        
        ${mechanic.availability.includes('emergency') ? '<div class="emergency-badge">🚨 Emergency Service</div>' : ''}
        ${mechanic.availability.includes('mobile') ? '<div class="mobile-badge">🚗 Mobile Service</div>' : ''}
        
        <div class="worker-footer">
            <div class="worker-price">${mechanic.price}</div>
            <div class="worker-actions">
                <button class="view-profile-btn" onclick="event.stopPropagation(); viewMechanicProfile(${mechanic.id})">View Profile</button>
                <button class="book-now-btn" onclick="event.stopPropagation(); bookMechanic(${mechanic.id})">Book Now</button>
            </div>
        </div>
    `;
    
    return card;
}

// View mechanic profile
function viewMechanicProfile(mechanicId) {
    const mechanic = mechanics.find(m => m.id === mechanicId);
    if (mechanic) {
        window.location.href = `worker-profile.html?id=${mechanicId}&service=mechanic`;
    }
}

// Book mechanic
function bookMechanic(mechanicId) {
    const mechanic = mechanics.find(m => m.id === mechanicId);
    if (mechanic) {
        if (confirm(`Book ${mechanic.name} for your auto repair?`)) {
            window.location.href = `booking.html?workerId=${mechanicId}&service=mechanic`;
        }
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            filterMechanics();
        });
    }
}

// Filter mechanics based on all criteria
function filterMechanics() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const priceFilter = document.querySelector('.filter-select[onchange*="filterByPrice"]')?.value;
    const experienceFilter = document.querySelector('.filter-select[onchange*="filterByExperience"]')?.value;
    
    const specialtyCheckboxes = document.querySelectorAll('input[name="specialty"]:checked');
    const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]:checked');
    const certificationCheckboxes = document.querySelectorAll('input[name="certification"]:checked');
    
    const specialties = Array.from(specialtyCheckboxes).map(cb => cb.value);
    const availabilities = Array.from(availabilityCheckboxes).map(cb => cb.value);
    const certifiedOnly = Array.from(certificationCheckboxes).some(cb => cb.value === 'certified');
    
    const filtered = mechanics.filter(mechanic => {
        // Search term filter
        const matchesSearch = !searchTerm || 
            mechanic.name.toLowerCase().includes(searchTerm) ||
            mechanic.tagline.toLowerCase().includes(searchTerm) ||
            mechanic.skills.some(skill => skill.toLowerCase().includes(searchTerm));
        
        // Price filter
        const price = parseInt(mechanic.price.replace('$', '').replace('/hr', ''));
        let matchesPrice = true;
        if (priceFilter && priceFilter !== 'all') {
            const maxPrice = parseInt(priceFilter);
            matchesPrice = price <= maxPrice;
        }
        
        // Experience filter
        let matchesExperience = true;
        if (experienceFilter && experienceFilter !== 'all') {
            const minExperience = parseInt(experienceFilter);
            matchesExperience = mechanic.experience >= minExperience;
        }
        
        // Specialty filter
        const matchesSpecialty = specialties.length === 0 || 
            specialties.some(specialty => mechanic.specialties.includes(specialty));
        
        // Availability filter
        const matchesAvailability = availabilities.length === 0 ||
            availabilities.every(availability => mechanic.availability.includes(availability));
        
        // Certification filter
        const matchesCertification = !certifiedOnly || mechanic.certified;
        
        return matchesSearch && matchesPrice && matchesExperience && matchesSpecialty && matchesAvailability && matchesCertification;
    });
    
    loadMechanics(filtered);
}

// Sorting
function sortMechanics(criteria) {
    const sorted = [...mechanics].sort((a, b) => {
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
    
    loadMechanics(sorted);
}

// Filter functions
function filterByPrice(value) {
    filterMechanics();
}

function filterByExperience(value) {
    filterMechanics();
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

// Load more mechanics (simulated)
function loadMoreMechanics() {
    showNotification('Loading more mechanics...', 'info');
    setTimeout(() => {
        showNotification('No more mechanics to load', 'info');
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