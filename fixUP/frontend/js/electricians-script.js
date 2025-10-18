// Sample electricians data
const electricians = [
    {
        id: 1,
        name: "Mike Electrician",
        tagline: "Master Electrician - 15+ years experience",
        rating: 4.9,
        reviews: 189,
        jobsCompleted: 145,
        responseTime: "1.5 hours",
        price: "$95/hr",
        experience: 15,
        distance: "2.2 miles",
        skills: ["Electrical Wiring", "Panel Upgrade", "Troubleshooting", "Safety Inspection"],
        specialties: ["wiring", "panel", "troubleshooting"],
        availability: ["emergency"],
        image: "https://images.unsplash.com/photo-1581094794321-8410e6a0d9d2?w=150&h=150&fit=crop&crop=face",
        verified: true,
        licensed: true
    },
    {
        id: 2,
        name: "Sarah Lights",
        tagline: "Lighting & Fixture Specialist",
        rating: 4.8,
        reviews: 112,
        jobsCompleted: 83,
        responseTime: "2 hours",
        price: "$85/hr",
        experience: 8,
        distance: "1.8 miles",
        skills: ["Light Fixtures", "Smart Home", "Outlets", "Ceiling Fans"],
        specialties: ["fixtures", "outlets"],
        availability: ["weekend"],
        image: "https://images.unsplash.com/photo-1581089778245-3ce67677f718?w=150&h=150&fit=crop&crop=face",
        verified: true,
        licensed: true
    },
    {
        id: 3,
        name: "John Power",
        tagline: "Emergency Electrical Services",
        rating: 4.7,
        reviews: 234,
        jobsCompleted: 192,
        responseTime: "45 mins",
        price: "$120/hr",
        experience: 12,
        distance: "3.1 miles",
        skills: ["Emergency Repair", "Circuit Breaker", "Power Outage", "Safety Checks"],
        specialties: ["troubleshooting", "wiring"],
        availability: ["emergency", "weekend"],
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        verified: true,
        licensed: true
    },
    {
        id: 4,
        name: "David Wiring",
        tagline: "Residential Wiring Expert",
        rating: 4.8,
        reviews: 167,
        jobsCompleted: 124,
        responseTime: "3 hours",
        price: "$110/hr",
        experience: 18,
        distance: "4.3 miles",
        skills: ["New Construction", "Rewiring", "Code Compliance", "Electrical Design"],
        specialties: ["wiring", "panel"],
        availability: [],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        verified: true,
        licensed: true
    },
    {
        id: 5,
        name: "Alex Current",
        tagline: "Smart Home & Automation",
        rating: 4.9,
        reviews: 78,
        jobsCompleted: 56,
        responseTime: "4 hours",
        price: "$105/hr",
        experience: 7,
        distance: "2.7 miles",
        skills: ["Smart Home", "Home Automation", "Security Systems", "Network Wiring"],
        specialties: ["fixtures", "outlets"],
        availability: ["weekend"],
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        verified: false,
        licensed: true
    }
];

// Initialize electricians page
document.addEventListener('DOMContentLoaded', function() {
    loadElectricians();
    setupSearch();
});

// Load electricians grid
function loadElectricians(filteredElectricians = null) {
    const grid = document.getElementById('electriciansGrid');
    const workersToShow = filteredElectricians || electricians;
    
    grid.innerHTML = '';
    
    if (workersToShow.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No electricians found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    workersToShow.forEach(electrician => {
        const electricianCard = createElectricianCard(electrician);
        grid.appendChild(electricianCard);
    });
}

// Create electrician card
function createElectricianCard(electrician) {
    const card = document.createElement('div');
    card.className = 'worker-card';
    card.onclick = () => viewElectricianProfile(electrician.id);
    
    const verifiedBadge = electrician.verified ? '<span class="verified-badge">✅ Verified</span>' : '';
    const licensedBadge = electrician.licensed ? '<span class="licensed-badge">📜 Licensed</span>' : '';
    
    card.innerHTML = `
        <div class="worker-header">
            <img src="${electrician.image}" alt="${electrician.name}" class="worker-avatar">
            <div class="worker-basic-info">
                <h3>${electrician.name} ${verifiedBadge} ${licensedBadge}</h3>
                <p class="worker-tagline">${electrician.tagline}</p>
                <div class="worker-rating">
                    <span class="rating-stars">${getStarRating(electrician.rating)}</span>
                    <span class="rating-text">${electrician.rating} (${electrician.reviews} reviews)</span>
                </div>
            </div>
        </div>
        
        <div class="worker-stats">
            <div class="stat-item">
                <div class="stat-value">${electrician.experience}+ yrs</div>
                <div class="stat-label">Experience</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${electrician.responseTime}</div>
                <div class="stat-label">Response Time</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${electrician.distance}</div>
                <div class="stat-label">Distance</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${electrician.jobsCompleted}</div>
                <div class="stat-label">Jobs Done</div>
            </div>
        </div>
        
        <div class="worker-skills">
            ${electrician.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        
        ${electrician.availability.includes('emergency') ? '<div class="emergency-badge">🚨 Emergency Service</div>' : ''}
        
        <div class="worker-footer">
            <div class="worker-price">${electrician.price}</div>
            <div class="worker-actions">
                <button class="view-profile-btn" onclick="event.stopPropagation(); viewElectricianProfile(${electrician.id})">View Profile</button>
                <button class="book-now-btn" onclick="event.stopPropagation(); bookElectrician(${electrician.id})">Book Now</button>
            </div>
        </div>
    `;
    
    return card;
}

// View electrician profile
function viewElectricianProfile(electricianId) {
    const electrician = electricians.find(e => e.id === electricianId);
    if (electrician) {
        window.location.href = `worker-profile.html?id=${electricianId}&service=electrician`;
    }
}

// Book electrician
function bookElectrician(electricianId) {
    const electrician = electricians.find(e => e.id === electricianId);
    if (electrician) {
        if (confirm(`Book ${electrician.name} for your electrical work?`)) {
            window.location.href = `booking.html?workerId=${electricianId}&service=electrician`;
        }
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            filterElectricians();
        });
    }
}

// Filter electricians based on all criteria
function filterElectricians() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const priceFilter = document.querySelector('.filter-select[onchange*="filterByPrice"]')?.value;
    const experienceFilter = document.querySelector('.filter-select[onchange*="filterByExperience"]')?.value;
    
    const specialtyCheckboxes = document.querySelectorAll('input[name="specialty"]:checked');
    const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]:checked');
    const certificationCheckboxes = document.querySelectorAll('input[name="certification"]:checked');
    
    const specialties = Array.from(specialtyCheckboxes).map(cb => cb.value);
    const availabilities = Array.from(availabilityCheckboxes).map(cb => cb.value);
    const licensedOnly = Array.from(certificationCheckboxes).some(cb => cb.value === 'licensed');
    
    const filtered = electricians.filter(electrician => {
        // Search term filter
        const matchesSearch = !searchTerm || 
            electrician.name.toLowerCase().includes(searchTerm) ||
            electrician.tagline.toLowerCase().includes(searchTerm) ||
            electrician.skills.some(skill => skill.toLowerCase().includes(searchTerm));
        
        // Price filter
        const price = parseInt(electrician.price.replace('$', '').replace('/hr', ''));
        let matchesPrice = true;
        if (priceFilter && priceFilter !== 'all') {
            const maxPrice = parseInt(priceFilter);
            matchesPrice = price <= maxPrice;
        }
        
        // Experience filter
        let matchesExperience = true;
        if (experienceFilter && experienceFilter !== 'all') {
            const minExperience = parseInt(experienceFilter);
            matchesExperience = electrician.experience >= minExperience;
        }
        
        // Specialty filter
        const matchesSpecialty = specialties.length === 0 || 
            specialties.some(specialty => electrician.specialties.includes(specialty));
        
        // Availability filter
        const matchesAvailability = availabilities.length === 0 ||
            availabilities.every(availability => electrician.availability.includes(availability));
        
        // Certification filter
        const matchesCertification = !licensedOnly || electrician.licensed;
        
        return matchesSearch && matchesPrice && matchesExperience && matchesSpecialty && matchesAvailability && matchesCertification;
    });
    
    loadElectricians(filtered);
}

// Sorting
function sortElectricians(criteria) {
    const sorted = [...electricians].sort((a, b) => {
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
    
    loadElectricians(sorted);
}

// Filter functions
function filterByPrice(value) {
    filterElectricians();
}

function filterByExperience(value) {
    filterElectricians();
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

// Load more electricians (simulated)
function loadMoreElectricians() {
    showNotification('Loading more electricians...', 'info');
    setTimeout(() => {
        showNotification('No more electricians to load', 'info');
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