// Sample skills data
let skills = [
    { id: 1, name: "Custom Furniture", experience: 15, rate: 85 },
    { id: 2, name: "Cabinet Making", experience: 12, rate: 75 },
    { id: 3, name: "Home Renovations", experience: 10, rate: 90 }
];

// Sample portfolio items
let portfolioItems = [
    { id: 1, src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop", title: "Custom Dining Table" },
    { id: 2, src: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=200&fit=crop", title: "Kitchen Cabinets" }
];

// Initialize profile edit page
document.addEventListener('DOMContentLoaded', function() {
    loadSkills();
    loadPortfolio();
    setupCharacterCount();
    setupFileUpload();
    calculateProgress();
});

// Load skills list
function loadSkills() {
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = '';
    
    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <div class="skill-info">
                <h4>${skill.name}</h4>
                <div class="skill-meta">
                    <span>${skill.experience} years experience</span>
                    <span>$${skill.rate}/hour</span>
                </div>
            </div>
            <div class="skill-actions">
                <button class="skill-btn" onclick="editSkill(${skill.id})">✏️</button>
                <button class="skill-btn" onclick="removeSkill(${skill.id})">🗑️</button>
            </div>
        `;
        skillsList.appendChild(skillItem);
    });
}

// Load portfolio items
function loadPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    portfolioGrid.innerHTML = '';
    
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.innerHTML = `
            <img src="${item.src}" alt="${item.title}">
            <div class="portfolio-actions">
                <button class="portfolio-btn" onclick="editPortfolioItem(${item.id})">✏️</button>
                <button class="portfolio-btn" onclick="removePortfolioItem(${item.id})">🗑️</button>
            </div>
        `;
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Add new skill
function addSkill() {
    const name = document.getElementById('skillName').value;
    const experience = document.getElementById('skillExperience').value;
    const rate = document.getElementById('hourlyRate').value;
    
    if (!name || !experience || !rate) {
        showNotification('❌ Please fill all skill fields', 'error');
        return;
    }
    
    const newSkill = {
        id: Date.now(),
        name: name,
        experience: parseInt(experience),
        rate: parseInt(rate)
    };
    
    skills.push(newSkill);
    loadSkills();
    
    // Clear form
    document.getElementById('skillName').value = '';
    document.getElementById('skillExperience').value = '';
    document.getElementById('hourlyRate').value = '';
    
    showNotification('✅ Skill added successfully', 'success');
    calculateProgress();
}

// Remove skill
function removeSkill(skillId) {
    if (confirm('Are you sure you want to remove this skill?')) {
        skills = skills.filter(skill => skill.id !== skillId);
        loadSkills();
        calculateProgress();
    }
}

// Edit skill (simplified - in real app would open edit modal)
function editSkill(skillId) {
    const skill = skills.find(s => s.id === skillId);
    if (skill) {
        document.getElementById('skillName').value = skill.name;
        document.getElementById('skillExperience').value = skill.experience;
        document.getElementById('hourlyRate').value = skill.rate;
        
        // Remove the skill being edited
        skills = skills.filter(s => s.id !== skillId);
        loadSkills();
    }
}

// Portfolio management
function setupFileUpload() {
    const uploadArea = document.getElementById('portfolioUploadArea');
    const fileInput = document.getElementById('portfolioUpload');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', (e) => {
            handlePortfolioFiles(e.target.files);
        });
    }
}

function handlePortfolioFiles(files) {
    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            showNotification('❌ Please upload only image files', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            const newItem = {
                id: Date.now(),
                src: e.target.result,
                title: 'New Project'
            };
            
            portfolioItems.push(newItem);
            loadPortfolio();
            calculateProgress();
        };
        reader.readAsDataURL(file);
    });
}

function removePortfolioItem(itemId) {
    if (confirm('Remove this portfolio item?')) {
        portfolioItems = portfolioItems.filter(item => item.id !== itemId);
        loadPortfolio();
        calculateProgress();
    }
}

function editPortfolioItem(itemId) {
    const newTitle = prompt('Enter new title for this item:');
    if (newTitle) {
        const item = portfolioItems.find(i => i.id === itemId);
        if (item) {
            item.title = newTitle;
            showNotification('✅ Portfolio item updated', 'success');
        }
    }
}

// Character count for bio
function setupCharacterCount() {
    const bioTextarea = document.getElementById('bio');
    const charCount = document.getElementById('bioCharCount');
    
    if (bioTextarea && charCount) {
        charCount.textContent = bioTextarea.value.length;
        
        bioTextarea.addEventListener('input', function(e) {
            const count = e.target.value.length;
            charCount.textContent = count;
            
            if (count > 500) {
                e.target.value = e.target.value.substring(0, 500);
                charCount.textContent = 500;
            }
        });
    }
}

// Calculate profile completion progress
function calculateProgress() {
    let progress = 60; // Base progress
    
    // Add points for skills
    if (skills.length > 0) progress += 10;
    if (skills.length >= 3) progress += 10;
    
    // Add points for portfolio
    if (portfolioItems.length > 0) progress += 10;
    if (portfolioItems.length >= 3) progress += 10;
    
    // Cap at 100%
    progress = Math.min(progress, 100);
    
    // Update progress bar and text
    const progressBar = document.getElementById('profileProgress');
    const progressText = document.getElementById('progressPercent');
    
    if (progressBar && progressText) {
        progressBar.style.width = progress + '%';
        progressText.textContent = progress + '%';
    }
}

// Handle profile save
function handleProfileSave(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    
    // Get form data
    const profileData = {
        name: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        tagline: document.getElementById('tagline').value,
        bio: document.getElementById('bio').value,
        city: document.getElementById('city').value,
        serviceArea: document.getElementById('serviceArea').value,
        skills: skills,
        portfolio: portfolioItems
    };
    
    // Validate
    if (!validateProfile(profileData)) {
        return;
    }
    
    // Show loading
    submitBtn.textContent = 'Saving...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Save to localStorage
        localStorage.setItem('fixUP_worker_profile', JSON.stringify(profileData));
        
        showNotification('🎉 Profile saved successfully!', 'success');
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        calculateProgress();
        
    }, 1500);
}

function validateProfile(data) {
    if (data.skills.length === 0) {
        showNotification('❌ Please add at least one skill', 'error');
        return false;
    }
    
    if (data.bio.length < 50) {
        showNotification('❌ Please write a more detailed bio (at least 50 characters)', 'error');
        return false;
    }
    
    return true;
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