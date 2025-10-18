// Sample plumbers data
const plumbers = [
    {
        id: 1,
        name: "Mike Plumber",
        tagline: "Master Plumber - 12+ years experience",
        rating: 4.8,
        reviews: 156,
        jobsCompleted: 112,
        responseTime: "1 hour",
        price: "$85/hr",
        experience: 12,
        distance: "1.5 miles",
        skills: ["Leak Repair", "Fixture Installation", "Drain Cleaning", "Water Heater"],
        specialties: ["leaks", "installation", "water_heater"],
        availability: ["emergency", "weekend"],
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=150&h=150&fit=crop&crop=face",
        verified: true,
        licensed: true
    },
    {
        id: 2,
        name: "Sarah Waters",
        tagline: "Residential Plumbing Specialist",
        rating: 4.9,
        reviews: 89,
        jobsCompleted: 67,
        responseTime: "45 mins",
        price: "$95/hr",
        experience: 8,
        distance: "2.1 miles",
        skills: ["Pipe Repair", "Toilet Installation", "Sink Installation", "Garbage Disposal"],
        specialties: ["installation", "drain"],
        availability: ["emergency"],
        image: "https://images.unsplash.com/photo-1594824947933-d0501ba2fe65?w=150&h=150&fit=crop&crop=face",
        verified: true,
        licensed: true
    },
    {
        id: 3,
        name: "John Pipeworks",
        tagline: "Emergency Leak Specialist",
        rating: 4.7,
        reviews: 203,
        jobsCompleted: 178,
        responseTime: "30 mins",
        price: "$110/hr",
        experience: 15,
        distance: "3.2 miles",
        skills: ["Emergency Repair", "Pipe Replacement", "Water Damage", "Flood Control"],
        specialties: ["leaks", "sewer"],
        availability: ["emergency", "weekend"],
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        verified: true,
        licensed: true
    },
    {
        id: 4,
        name: "David Drainage",
        tagline: "Drain & Sewer Expert",
        rating: 4.6,
        reviews: 134,
        jobsCompleted: 98,
        responseTime: "2 hours",
        price: "$75/hr",
        experience: 10,
        distance: "4.5 miles",
        skills: ["Drain Cleaning", "Sewer Line", "Camera Inspection", "Hydro Jetting"],
        specialties: ["drain", "sewer"],
        availability: [],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        verified: true,
        licensed: true
    },
    {
        id: 5,
        name: "Alex Fixtures",
        tagline: "Bathroom & Kitchen Plumbing",
        rating: 4.8,
        reviews: 76,
        jobsCompleted: 54,
        responseTime: "3 hours",
        price: "$90/hr",
        experience: 6,
        distance: "2.8 miles",
        skills: ["Fixture Installation", "Remodeling", "Custom Bathrooms", "Kitchen Plumbing"],
        specialties: ["installation"],
        availability: ["weekend"],
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        verified: false,
        licensed: true
    }
];

// Initialize plumbers page
document.addEventListener('DOMContentLoaded', function() {
    loadPlumbers();
    setupSearch();
});

// Load plumbers grid
function loadPlumbers(filteredPlumbers = null) {
    const grid = document.getElementById('plumbersGrid');
    const workersToShow = filteredPlumbers || plumbers;
    
    grid.innerHTML = '';
    
    if (workersToShow.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🔍</div>
                <h3>No plumbers found</h3>
                <p>Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    workersToShow.forEach(plumber => {
        const plumberCard = createPlumberCard(plumber);
        grid.appendChild(plumberCard);
    });
}

// Create plumber card
function createPlumberCard(plumber) {
    const card = document.createElement('div');
    card.className = 'worker-card';
    card.onclick = () => viewPlumberProfile(plumber.id);
    
    const verifiedBadge = plumber.verified ? '<span class="verified-badge">✅ Verified</span>' : '';
    const licensedBadge = plumber.licensed ? '<span class="licensed-badge">📜 Licensed</span>' : '';
    
    card.innerHTML = `
        <div class="worker-header">
            <img src="${plumber.image}" alt="${plumber.name}" class="worker-avatar">
            <div class="worker-basic-info">
                <h3>${plumber.name} ${verifiedBadge} ${licensedBadge}</h3>
                <p class="worker-tagline">${plumber.tagline}</p>
                <div class="worker-rating">
                    <span class="rating-stars">${getStarRating(plumber.rating)}</span>
                    <span class="rating-text">${plumber.rating} (${plumber.reviews} reviews)</span>
                </div>
            </div>
        </div>
        
        <div class="worker-stats">
            <div class="stat-item">
                <div class="stat-value">${plumber.experience}+ yrs</div>
                <div class="stat-label">Experience</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${plumber.responseTime}</div>
                <div class="stat-label">Response Time</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${plumber.distance}</div>
                <div class="stat-label">Distance</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${plumber.jobsCompleted}</div>
                <div class="stat-label">Jobs Done</div>
            </div>
        </div>
        
        <div class="worker-skills">
            ${plumber.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
        </div>
        
        ${plumber.availability.includes('emergency') ? '<div class="emergency-badge">🚨 Emergency Service</div>' : ''}
        
        <div class="worker-footer">
            <div class="worker-price">${plumber.price}</div>
            <div class="worker-actions">
                <button class="view-profile-btn" onclick="event.stopPropagation(); viewPlumberProfile(${plumber.id})">View Profile</button>
                <button class="book-now-btn" onclick="event.stopPropagation(); bookPlumber(${plumber.id})">Book Now</button>
            </div>
        </div>
    `;
    
    return card;
}

// View plumber profile
function viewPlumberProfile(plumberId) {
    const plumber = plumbers.find(p => p.id === plumberId);
    if (plumber) {
        window.location.href = `worker-profile.html?id=${plumberId}&service=plumber`;
    }
}

// Book plumber
function bookPlumber(plumberId) {
    const plumber = plumbers.find(p => p.id === plumberId);
    if (plumber) {
        if (confirm(`Book ${plumber.name} for your plumbing job?`)) {
            window.location.href = `booking.html?workerId=${plumberId}&service=plumber`;
        }
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            filterPlumbers();
        });
    }
}

// Filter plumbers based on all criteria
function filterPlumbers() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const priceFilter = document.querySelector('.filter-select[onchange*="filterByPrice"]')?.value;
    const experienceFilter = document.querySelector('.filter-select[onchange*="filterByExperience"]')?.value;
    
    const specialtyCheckboxes = document.querySelectorAll('input[name="specialty"]:checked');
    const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]:checked');
    const certificationCheckboxes = document.querySelectorAll('input[name="certification"]:checked');
    
    const specialties = Array.from(specialtyCheckboxes).map(cb => cb.value);
    const availabilities = Array.from(availabilityCheckboxes).map(cb => cb.value);
    const licensedOnly = Array.from(certificationCheckboxes).some(cb => cb.value === 'licensed');
    
    const filtered = plumbers.filter(plumber => {
        // Search term filter
        const matchesSearch = !searchTerm || 
            plumber.name.toLowerCase().includes(searchTerm) ||
            plumber.tagline.toLowerCase().includes(searchTerm) ||
            plumber.skills.some(skill => skill.toLowerCase().includes(searchTerm));
        
        // Price filter
        const price = parseInt(plumber.price.replace('$', '').replace('/hr', ''));
        let matchesPrice = true;
        if (priceFilter && priceFilter !== 'all') {
            const maxPrice = parseInt(priceFilter);
            matchesPrice = price <= maxPrice;
        }
        
        // Experience filter
        let matchesExperience = true;
        if (experienceFilter && experienceFilter !== 'all') {
            const minExperience = parseInt(experienceFilter);
            matchesExperience = plumber.experience >= minExperience;
        }
        
        // Specialty filter
        const matchesSpecialty = specialties.length === 0 || 
            specialties.some(specialty => plumber.specialties.includes(specialty));
        
        // Availability filter
        const matchesAvailability = availabilities.length === 0 ||
            availabilities.every(availability => plumber.availability.includes(availability));
        
        // Certification filter
        const matchesCertification = !licensedOnly || plumber.licensed;
        
        return matchesSearch && matchesPrice && matchesExperience && matchesSpecialty && matchesAvailability && matchesCertification;
    });
    
    loadPlumbers(filtered);
}

// Sorting
function sortPlumbers(criteria) {
    const sorted = [...plumbers].sort((a, b) => {
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
    
    loadPlumbers(sorted);
}

// Filter functions
function filterByPrice(value) {
    filterPlumbers();
}

function filterByExperience(value) {
    filterPlumbers();
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

// Load more plumbers (simulated)
function loadMorePlumbers() {
    showNotification('Loading more plumbers...', 'info');
    setTimeout(() => {
        showNotification('No more plumbers to load', 'info');
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