// Sample bookings data
const bookingsData = {
    upcoming: [
        {
            id: 1,
            title: "Kitchen Cabinet Repair",
            worker: "Mike Carpenter",
            date: "2024-01-15",
            time: "10:00 AM",
            duration: "2 hours",
            budget: "$120",
            address: "123 Main St, Downtown",
            status: "upcoming"
        }
    ],
    active: [
        {
            id: 2,
            title: "Bathroom Leak Fix",
            worker: "Sarah Plumber",
            date: "2024-01-12",
            time: "2:00 PM", 
            duration: "1.5 hours",
            budget: "$90",
            address: "456 Oak Ave, North Park",
            status: "active"
        }
    ],
    completed: [
        {
            id: 3,
            title: "Office Furniture Assembly",
            worker: "John Handyman",
            date: "2024-01-10",
            time: "9:00 AM",
            duration: "3 hours",
            budget: "$150",
            address: "789 Business Rd",
            status: "completed",
            rating: 5,
            review: "Excellent work! Very professional."
        },
        {
            id: 4,
            title: "Electrical Wiring Check",
            worker: "David Electrician",
            date: "2024-01-08",
            time: "11:00 AM",
            duration: "2 hours",
            budget: "$110",
            address: "321 Tech Street",
            status: "completed",
            rating: 4,
            review: "Good service, fixed the issue quickly."
        }
    ],
    cancelled: [
        {
            id: 5,
            title: "Painting Service",
            worker: "Maria Painter",
            date: "2024-01-05",
            time: "1:00 PM",
            duration: "4 hours",
            budget: "$200",
            address: "654 Art Lane",
            status: "cancelled",
            reason: "Worker unavailable"
        }
    ]
};

// Tab functionality
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Load bookings for this tab
    loadBookings(tabName);
}

// Load bookings for a specific tab
function loadBookings(status) {
    const bookings = bookingsData[status];
    const container = document.getElementById(status + 'Bookings');
    const emptyState = document.getElementById('emptyState');
    
    // Clear container
    container.innerHTML = '';
    
    if (bookings.length === 0) {
        emptyState.classList.add('show');
        return;
    }
    
    emptyState.classList.remove('show');
    
    bookings.forEach(booking => {
        const bookingCard = createBookingCard(booking, status);
        container.appendChild(bookingCard);
    });
}

// Create booking card HTML
function createBookingCard(booking, status) {
    const card = document.createElement('div');
    card.className = `booking-card ${status}`;
    
    let actionsHTML = '';
    let reviewHTML = '';
    
    // Different actions based on status
    switch(status) {
        case 'upcoming':
            actionsHTML = `
                <button class="action-btn btn-primary" onclick="rescheduleBooking(${booking.id})">🔄 Reschedule</button>
                <button class="action-btn btn-secondary" onclick="messageWorker(${booking.id})">💬 Message</button>
                <button class="action-btn btn-danger" onclick="cancelBooking(${booking.id})">❌ Cancel</button>
            `;
            break;
        case 'active':
            actionsHTML = `
                <button class="action-btn btn-primary" onclick="trackWorker(${booking.id})">📍 Track Worker</button>
                <button class="action-btn btn-secondary" onclick="messageWorker(${booking.id})">💬 Message</button>
            `;
            break;
        case 'completed':
            if (!booking.rating) {
                actionsHTML = `
                    <button class="action-btn btn-primary" onclick="rateBooking(${booking.id})">⭐ Rate Service</button>
                `;
            } else {
                reviewHTML = `
                    <div class="booking-review">
                        <div class="review-rating">${'★'.repeat(booking.rating)}${'☆'.repeat(5 - booking.rating)}</div>
                        <p class="review-text">"${booking.review}"</p>
                    </div>
                `;
            }
            break;
        case 'cancelled':
            actionsHTML = `
                <button class="action-btn btn-primary" onclick="rebookService(${booking.id})">🔄 Rebook</button>
            `;
            break;
    }
    
    card.innerHTML = `
        <div class="booking-header">
            <div>
                <div class="booking-title">${booking.title}</div>
                <div class="booking-worker">with ${booking.worker}</div>
            </div>
            <div class="booking-status status-${status}">${status}</div>
        </div>
        
        <div class="booking-details">
            <div class="detail-item">
                <span class="detail-label">📅 Date</span>
                <span class="detail-value">${booking.date}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">🕒 Time</span>
                <span class="detail-value">${booking.time}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">⏱️ Duration</span>
                <span class="detail-value">${booking.duration}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">💰 Budget</span>
                <span class="detail-value">${booking.budget}</span>
            </div>
        </div>
        
        <div class="detail-item">
            <span class="detail-label">📍 Address</span>
            <span class="detail-value">${booking.address}</span>
        </div>
        
        ${reviewHTML}
        
        <div class="booking-actions">
            ${actionsHTML}
        </div>
    `;
    
    return card;
}

// Action functions
function rescheduleBooking(bookingId) {
    alert(`🔄 Rescheduling booking #${bookingId}`);
    // Open reschedule modal
}

function messageWorker(bookingId) {
    alert(`💬 Opening chat for booking #${bookingId}`);
    // Open chat interface
}

function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        alert(`❌ Booking #${bookingId} cancelled`);
        // Update booking status
    }
}

function trackWorker(bookingId) {
    alert(`📍 Tracking worker for booking #${bookingId}`);
    // Open tracking/map
}

function rateBooking(bookingId) {
    const rating = prompt('Rate this service (1-5 stars):');
    if (rating && rating >= 1 && rating <= 5) {
        const review = prompt('Leave a review (optional):');
        alert(`⭐ Thanks for your ${rating} star rating!`);
        // Save rating to backend
    }
}

function rebookService(bookingId) {
    alert(`🔄 Rebooking service #${bookingId}`);
    // Redirect to service booking
}

// Initialize bookings page
document.addEventListener('DOMContentLoaded', function() {
    // Load upcoming bookings by default
    loadBookings('upcoming');
});