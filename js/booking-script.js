// Initialize booking page
document.addEventListener('DOMContentLoaded', function() {
    setupBookingForm();
    setupCharacterCount();
    setMinDate();
    updateCost();
});

// Setup booking form
function setupBookingForm() {
    // Set today as minimum date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('preferredDate').min = today;
    
    // Load user data if available
    const userData = localStorage.getItem('fixUP_user');
    if (userData) {
        const user = JSON.parse(userData);
        document.getElementById('contactName').value = user.name || '';
        document.getElementById('contactEmail').value = user.email || '';
    }
}

// Setup character count for description
function setupCharacterCount() {
    const descTextarea = document.getElementById('jobDescription');
    const charCount = document.getElementById('descCharCount');
    
    if (descTextarea && charCount) {
        charCount.textContent = descTextarea.value.length;
        
        descTextarea.addEventListener('input', function(e) {
            const count = e.target.value.length;
            charCount.textContent = count;
            
            if (count > 500) {
                e.target.value = e.target.value.substring(0, 500);
                charCount.textContent = 500;
            }
        });
    }
}

// Set minimum date to today
function setMinDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    
    document.getElementById('preferredDate').min = `${yyyy}-${mm}-${dd}`;
}

// Update cost calculation
function updateCost() {
    const hourlyRate = 75; // $75/hour for the worker
    const serviceFee = 15; // $15 service fee
    const estimatedHours = parseInt(document.getElementById('estimatedHours').value) || 0;
    
    const subtotal = hourlyRate * estimatedHours;
    const total = subtotal + serviceFee;
    
    // Update display
    document.getElementById('displayHours').textContent = `${estimatedHours} hours`;
    document.getElementById('totalCost').textContent = `$${total}`;
    
    // Show/hide cost items based on hours
    const costItems = document.querySelectorAll('.cost-item');
    costItems[1].style.display = estimatedHours > 0 ? 'flex' : 'none';
}

// Handle booking form submission
function handleBooking(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    
    // Get form data
    const bookingData = {
        workerId: getUrlParameter('workerId'),
        serviceType: document.getElementById('serviceType').value,
        jobDescription: document.getElementById('jobDescription').value,
        urgency: document.getElementById('urgency').value,
        estimatedHours: document.getElementById('estimatedHours').value,
        preferredDate: document.getElementById('preferredDate').value,
        preferredTime: document.getElementById('preferredTime').value,
        flexibleTiming: document.getElementById('flexibleTiming').checked,
        address: document.getElementById('address').value,
        specialInstructions: document.getElementById('specialInstructions').value,
        contactName: document.getElementById('contactName').value,
        contactPhone: document.getElementById('contactPhone').value,
        contactEmail: document.getElementById('contactEmail').value,
        contactMethod: document.getElementById('contactMethod').value,
        totalCost: document.getElementById('totalCost').textContent
    };
    
    // Validate form
    if (!validateBooking(bookingData)) {
        return;
    }
    
    // Show loading state
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Save booking to localStorage for demo
        const bookings = JSON.parse(localStorage.getItem('fixUP_bookings') || '[]');
        const newBooking = {
            id: Date.now(),
            ...bookingData,
            status: 'pending',
            bookedAt: new Date().toISOString(),
            worker: {
                name: 'Mike Carpenter',
                rate: '$75/hr'
            }
        };
        bookings.push(newBooking);
        localStorage.setItem('fixUP_bookings', JSON.stringify(bookings));
        
        // Show success
        showNotification('✅ Booking request sent! Redirecting...', 'success');
        
        // Redirect to confirmation page
        // In handleBooking function, change the redirect:
   setTimeout(() => {
        window.location.href = `booking-confirmation.html?bookingId=${newBooking.id}`;
    }, 2000);
        
    }, 2000);
}

// Validate booking form
function validateBooking(data) {
    if (data.jobDescription.length < 10) {
        showNotification('❌ Please provide a more detailed job description', 'error');
        return false;
    }
    
    if (!data.estimatedHours || data.estimatedHours < 1) {
        showNotification('❌ Please estimate the hours needed', 'error');
        return false;
    }
    
    if (!data.address) {
        showNotification('❌ Please provide the service address', 'error');
        return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.contactPhone.replace(/[\s\-\(\)]/g, ''))) {
        showNotification('❌ Please enter a valid phone number', 'error');
        return false;
    }
    
    return true;
}

// Get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
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
        background: ${type === 'error' ? '#ff6b6b' : '#43e97b'};
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
    }, 4000);
}