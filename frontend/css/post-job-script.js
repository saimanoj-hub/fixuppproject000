// Handle job post form submission
function handleJobPost(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    
    // Get form data
    const formData = {
        service: document.querySelector('input[name="service"]:checked').value,
        title: document.getElementById('jobTitle').value,
        description: document.getElementById('jobDescription').value,
        urgency: document.getElementById('urgency').value,
        budget: document.getElementById('budget').value,
        address: document.getElementById('address').value,
        preferredDate: document.getElementById('preferredDate').value,
        preferredTime: document.getElementById('preferredTime').value,
        contactPhone: document.getElementById('contactPhone').value,
        photos: [] // Would be populated with uploaded photos
    };
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // Show loading state
    submitBtn.textContent = 'Posting Job...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Save to localStorage for demo
        const jobs = JSON.parse(localStorage.getItem('fixUP_jobs') || '[]');
        jobs.push({
            id: Date.now(),
            ...formData,
            status: 'pending',
            postedAt: new Date().toISOString()
        });
        localStorage.setItem('fixUP_jobs', JSON.stringify(jobs));
        
        // Show success
        showNotification('🎉 Job posted successfully! Workers will contact you soon.', 'success');
        
        // Redirect to bookings page
        setTimeout(() => {
            window.location.href = 'my-bookings.html';
        }, 2000);
        
    }, 2000);
}

// Form validation
function validateForm(data) {
    if (data.description.length < 10) {
        showNotification('❌ Please provide a more detailed description (at least 10 characters)', 'error');
        return false;
    }
    
    if (data.budget && data.budget < 0) {
        showNotification('❌ Budget cannot be negative', 'error');
        return false;
    }
    
    return true;
}

// Character count for description
document.getElementById('jobDescription')?.addEventListener('input', function(e) {
    const count = e.target.value.length;
    document.getElementById('charCount').textContent = count;
    
    if (count > 500) {
        e.target.value = e.target.value.substring(0, 500);
        document.getElementById('charCount').textContent = 500;
    }
});

// Photo upload functionality
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('photoUpload');
    const preview = document.getElementById('uploadPreview');
    
    if (uploadArea && fileInput) {
        // Click to upload
        uploadArea.addEventListener('click', () => fileInput.click());
        
        // Drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            handleFiles(e.dataTransfer.files);
        });
        
        // File input change
        fileInput.addEventListener('change', (e) => {
            handleFiles(e.target.files);
        });
    }
});

function handleFiles(files) {
    const preview = document.getElementById('uploadPreview');
    
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            showNotification('❌ Please upload only image files', 'error');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            showNotification('❌ File size must be less than 5MB', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewItem = document.createElement('div');
            previewItem.className = 'preview-item';
            previewItem.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button class="remove-photo" onclick="removePhoto(this)">×</button>
            `;
            preview.appendChild(previewItem);
        };
        reader.readAsDataURL(file);
    });
}

function removePhoto(button) {
    button.parentElement.remove();
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