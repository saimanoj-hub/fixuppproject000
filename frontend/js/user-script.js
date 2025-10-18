// Service data
const services = [
    {
        id: 1,
        name: "Carpenter",
        icon: "🔨",
        description: "Furniture, repairs, custom woodwork",
        category: "carpenter"
    },
    {
        id: 2,
        name: "Plumber",
        icon: "🚰",
        description: "Leaks, installations, pipe repairs",
        category: "plumber"
    },
    {
        id: 3,
        name: "Electrician",
        icon: "⚡",
        description: "Wiring, fixtures, electrical repairs",
        category: "electrician"
    },
    {
        id: 4,
        name: "Auto Mechanic",
        icon: "🔧",
        description: "Car repairs, maintenance, diagnostics",
        category: "mechanic"
    },
    {
        id: 5,
        name: "Painter",
        icon: "🎨",
        description: "Interior, exterior, decorative painting",
        category: "painter"
    },
    {
        id: 6,
        name: "Constructor",
        icon: "🏗️",
        description: "Renovations, repairs, construction work",
        category: "constructor"
    }
];


// Search functionality
document.getElementById('searchInput')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        const serviceName = card.querySelector('h3').textContent.toLowerCase();
        const serviceDesc = card.querySelector('p').textContent.toLowerCase();
        
        if (serviceName.includes(searchTerm) || serviceDesc.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadServices();
});