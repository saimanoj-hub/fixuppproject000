// Sample job requests data
const jobRequests = [
    {
        id: 1,
        title: "Kitchen Cabinet Repair",
        description: "Two cabinet doors need hinge replacement and one drawer is stuck. Need someone with carpentry experience.",
        budget: "$120",
        location: "Downtown",
        time: "2 hours ago",
        category: "carpenter"
    },
    {
        id: 2,
        title: "Bathroom Leak Fix",
        description: "Water leaking from under the sink. Need immediate assistance to prevent water damage.",
        budget: "$90",
        location: "North Park",
        time: "1 hour ago",
        category: "plumber"
    },
    {
        id: 3,
        title: "Office Furniture Assembly",
        description: "Need help assembling 5 office desks and chairs. All materials provided.",
        budget: "$150",
        location: "Business District",
        time: "Just now",
        category: "carpenter"
    }
];

// Load job requests
function loadJobRequests() {
    const requestsList = document.getElementById('requestsList');
    
    jobRequests.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'job-request';
        jobElement.innerHTML = `
            <div class="job-header">
                <div class="job-title">${job.title}</div>
                <div class="job-budget">${job.budget}</div>
            </div>
            <div class="job-description">${job.description}</div>
            <div class="job-meta">
                <span>📍 ${job.location}</span>
                <span>🕒 ${job.time}</span>
            </div>
            <div class="job-actions">
                <button class="action-btn-accept" onclick="acceptJob(${job.id})">Accept Job</button>
                <button class="action-btn-decline" onclick="declineJob(${job.id})">Decline</button>
            </div>
        `;
        
        requestsList.appendChild(jobElement);
    });
}

// Job actions
function acceptJob(jobId) {
    const job = jobRequests.find(j => j.id === jobId);
    const jobElement = document.querySelector(`.job-request:nth-child(${jobId})`);
    
    // Add acceptance animation
    jobElement.style.borderLeftColor = '#43e97b';
    jobElement.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        alert(`🎉 You accepted: "${job.title}"\nWe've notified the client!`);
        jobElement.remove();
        updatePendingJobs(-1);
    }, 500);
}

function declineJob(jobId) {
    const jobElement = document.querySelector(`.job-request:nth-child(${jobId})`);
    
    // Add decline animation
    jobElement.style.borderLeftColor = '#ff6b6b';
    jobElement.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        jobElement.remove();
        updatePendingJobs(-1);
    }, 500);
}

function updatePendingJobs(change) {
    const pendingElement = document.getElementById('pendingJobs');
    let current = parseInt(pendingElement.textContent);
    current += change;
    pendingElement.textContent = Math.max(0, current);
}

// Quick actions functions
function updateProfile() {
    alert('📝 Redirecting to profile editor...');
    // window.location.href = 'edit-profile.html';
}

function addPortfolio() {
    alert('🖼️ Opening portfolio upload...');
    // Show portfolio upload modal
}

function setAvailability() {
    alert('📅 Opening calendar for availability...');
    // Show calendar modal
}

function completeProfile() {
    alert('✅ Taking you to profile completion wizard...');
    // window.location.href = 'complete-profile.html';
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadJobRequests();
    
    // Add some interactive effects
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});