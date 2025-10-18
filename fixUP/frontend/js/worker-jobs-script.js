// Sample jobs data
const jobsData = {
    requests: [
        {
            id: 1,
            title: "Kitchen Cabinet Repair",
            client: "Jessica Smith",
            budget: "$120",
            urgency: "medium",
            date: "2024-01-15",
            time: "10:00 AM",
            duration: "2 hours",
            address: "123 Main St, Downtown",
            description: "Two cabinet doors need hinge replacement and one drawer is stuck. Need someone with carpentry experience.",
            contact: "+1 (555) 123-4567"
        },
        {
            id: 2,
            title: "Bathroom Leak Fix",
            client: "Robert Johnson", 
            budget: "$90",
            urgency: "high",
            date: "2024-01-12",
            time: "2:00 PM",
            duration: "1.5 hours",
            address: "456 Oak Ave, North Park",
            description: "Water leaking from under the sink. Need immediate assistance to prevent water damage.",
            contact: "+1 (555) 987-6543"
        }
    ],
    scheduled: [
        {
            id: 3,
            title: "Office Furniture Assembly",
            client: "Tech Startup Inc.",
            budget: "$150", 
            urgency: "low",
            date: "2024-01-18",
            time: "9:00 AM",
            duration: "3 hours",
            address: "789 Business Rd, Downtown",
            description: "Need help assembling 5 office desks and chairs. All materials provided."
        }
    ],
    active: [
        {
            id: 4,
            title: "Custom Bookshelf Installation",
            client: "Maria Garcia",
            budget: "$200",
            urgency: "medium", 
            date: "2024-01-10",
            time: "11:00 AM",
            duration: "4 hours",
            address: "321 Library Lane",
            description: "Install custom built-in bookshelf in home office."
        }
    ],
    completed: [
        {
            id: 5,
            title: "Deck Repair",
            client: "David Wilson",
            budget: "$300",
            urgency: "medium",
            date: "2024-01-08", 
            time: "8:00 AM",
            duration: "6 hours",
            address: "654 Garden St",
            description: "Replace damaged deck boards and reinforce structure.",
            rating: 5,
            review: "Excellent work! The deck looks brand new."
        }
    ]
};

// Sample transactions data
const transactionsData = [
    {
        id: 1,
        description: "Custom Bookshelf Installation",
        date: "2024-01-10",
        amount: 200,
        type: "credit",
        status: "completed"
    },
    {
        id: 2, 
        description: "Deck Repair",
        date: "2024-01-08",
        amount: 300,
        type: "credit",
        status: "completed"
    },
    {
        id: 3,
        description: "Service Fee",
        date: "2024-01-08", 
        amount: -30,
        type: "debit",
        status: "completed"
    }
];

// Initialize jobs page
document.addEventListener('DOMContentLoaded', function() {
    loadJobCounts();
    loadJobsTab('requests');
    loadTransactions();
});

// Load job counts for badges
function loadJobCounts() {
    document.getElementById('requestsCount').textContent = jobsData.requests.length;
    document.getElementById('scheduledCount').textContent = jobsData.scheduled.length;
    document.getElementById('activeCount').textContent = jobsData.active.length;
    document.getElementById('completedCount').textContent = jobsData.completed.length;
}

// Show jobs tab
function showJobsTab(tabName) {
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
    
    // Load jobs for this tab
    loadJobsTab(tabName);
}

// Load jobs for specific tab
function loadJobsTab(tabName) {
    const jobs = jobsData[tabName];
    const container = document.getElementById(tabName + 'List');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (jobs.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📋</div>
                <h3>No ${tabName} jobs</h3>
                <p>${getEmptyStateMessage(tabName)}</p>
            </div>
        `;
        return;
    }
    
    jobs.forEach(job => {
        const jobCard = createJobCard(job, tabName);
        container.appendChild(jobCard);
    });
}

// Create job card HTML
function createJobCard(job, status) {
    const card = document.createElement('div');
    card.className = `job-card ${status}`;
    card.onclick = () => openJobDetails(job, status);
    
    let actionsHTML = '';
    
    // Different actions based on status
    switch(status) {
        case 'requests':
            actionsHTML = `
                <button class="action-btn btn-primary" onclick="event.stopPropagation(); acceptJob(${job.id})">✅ Accept</button>
                <button class="action-btn btn-secondary" onclick="event.stopPropagation(); messageClient(${job.id})">💬 Message</button>
                <button class="action-btn btn-danger" onclick="event.stopPropagation(); declineJob(${job.id})">❌ Decline</button>
            `;
            break;
        case 'scheduled':
            actionsHTML = `
                <button class="action-btn btn-primary" onclick="event.stopPropagation(); startJob(${job.id})">🚀 Start Job</button>
                <button class="action-btn btn-secondary" onclick="event.stopPropagation(); rescheduleJob(${job.id})">🔄 Reschedule</button>
            `;
            break;
        case 'active':
            actionsHTML = `
                <button class="action-btn btn-primary" onclick="event.stopPropagation(); completeJob(${job.id})">✅ Complete</button>
                <button class="action-btn btn-secondary" onclick="event.stopPropagation(); messageClient(${job.id})">💬 Update Client</button>
            `;
            break;
        case 'completed':
            if (job.rating) {
                actionsHTML = `
                    <div class="job-rating">
                        <span class="rating-stars">${'★'.repeat(job.rating)}${'☆'.repeat(5 - job.rating)}</span>
                        <p class="review-text">"${job.review}"</p>
                    </div>
                `;
            } else {
                actionsHTML = `<span class="no-rating">No rating yet</span>`;
            }
            break;
    }
    
    card.innerHTML = `
        <div class="job-header">
            <div>
                <div class="job-title">${job.title}</div>
                <div class="job-client">for ${job.client}</div>
            </div>
            <div class="job-meta">
                <div class="job-budget">${job.budget}</div>
                <div class="job-urgency urgency-${job.urgency}">${job.urgency}</div>
            </div>
        </div>
        
        <div class="job-details">
            <div class="detail-item">
                <span class="detail-label">📅 Date</span>
                <span class="detail-value">${job.date}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">🕒 Time</span>
                <span class="detail-value">${job.time}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">⏱️ Duration</span>
                <span class="detail-value">${job.duration}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">📍 Address</span>
                <span class="detail-value">${job.address}</span>
            </div>
        </div>
        
        <p class="job-description">${job.description}</p>
        
        <div class="job-actions">
            ${actionsHTML}
        </div>
    `;
    
    return card;
}

// Empty state messages
function getEmptyStateMessage(tabName) {
    const messages = {
        requests: "When clients request your services, they'll appear here",
        scheduled: "Your upcoming scheduled jobs will appear here", 
        active: "Jobs you're currently working on will appear here",
        completed: "Your completed jobs will appear here"
    };
    return messages[tabName] || "No jobs found";
}

// Job action functions
function acceptJob(jobId) {
    if (confirm('Accept this job?')) {
        // Move job from requests to scheduled
        const jobIndex = jobsData.requests.findIndex(job => job.id === jobId);
        if (jobIndex !== -1) {
            const job = jobsData.requests.splice(jobIndex, 1)[0];
            jobsData.scheduled.push(job);
            
            loadJobCounts();
            loadJobsTab('requests');
            
            showNotification('✅ Job accepted! Added to your schedule.', 'success');
        }
    }
}

function declineJob(jobId) {
    if (confirm('Decline this job?')) {
        jobsData.requests = jobsData.requests.filter(job => job.id !== jobId);
        
        loadJobCounts();
        loadJobsTab('requests');
        
        showNotification('❌ Job declined.', 'info');
    }
}

function startJob(jobId) {
    if (confirm('Start this job?')) {
        const jobIndex = jobsData.scheduled.findIndex(job => job.id === jobId);
        if (jobIndex !== -1) {
            const job = jobsData.scheduled.splice(jobIndex, 1)[0];
            jobsData.active.push(job);
            
            loadJobCounts();
            loadJobsTab('scheduled');
            
            showNotification('🚀 Job started!', 'success');
        }
    }
}

function completeJob(jobId) {
    if (confirm('Mark this job as completed?')) {
        const jobIndex = jobsData.active.findIndex(job => job.id === jobId);
        if (jobIndex !== -1) {
            const job = jobsData.active.splice(jobIndex, 1)[0];
            jobsData.completed.push(job);
            
            loadJobCounts();
            loadJobsTab('active');
            
            showNotification('🎉 Job completed! Waiting for client review.', 'success');
        }
    }
}

function messageClient(jobId) {
    alert(`💬 Opening chat with client for job #${jobId}`);
}

function rescheduleJob(jobId) {
    const newDate = prompt('Enter new date (YYYY-MM-DD):');
    if (newDate) {
        showNotification('🔄 Job rescheduled!', 'success');
    }
}

// Load transactions for earnings tab
function loadTransactions() {
    const container = document.getElementById('transactionsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    transactionsData.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        
        transactionItem.innerHTML = `
            <div class="transaction-info">
                <h5>${transaction.description}</h5>
                <p>${transaction.date} • ${transaction.status}</p>
            </div>
            <div class="transaction-amount ${transaction.type === 'credit' ? 'positive' : 'negative'}">
                ${transaction.type === 'credit' ? '+' : ''}$${transaction.amount}
            </div>
        `;
        
        container.appendChild(transactionItem);
    });
}

// Modal functions
function openJobDetails(job, status) {
    const modal = document.getElementById('jobModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = job.title;
    
    let statusActions = '';
    if (status === 'requests') {
        statusActions = `
            <div class="modal-actions">
                <button class="btn-primary" onclick="acceptJob(${job.id}); closeModal()">✅ Accept Job</button>
                <button class="btn-secondary" onclick="messageClient(${job.id})">💬 Message Client</button>
                <button class="btn-danger" onclick="declineJob(${job.id}); closeModal()">❌ Decline</button>
            </div>
        `;
    }
    
    modalBody.innerHTML = `
        <div class="job-details-modal">
            <div class="detail-group">
                <h4>Client Information</h4>
                <p><strong>Name:</strong> ${job.client}</p>
                ${job.contact ? `<p><strong>Contact:</strong> ${job.contact}</p>` : ''}
            </div>
            
            <div class="detail-group">
                <h4>Job Details</h4>
                <p><strong>Description:</strong> ${job.description}</p>
                <p><strong>Budget:</strong> ${job.budget}</p>
                <p><strong>Urgency:</strong> <span class="urgency-${job.urgency}">${job.urgency}</span></p>
            </div>
            
            <div class="detail-group">
                <h4>Schedule & Location</h4>
                <p><strong>Date:</strong> ${job.date}</p>
                <p><strong>Time:</strong> ${job.time}</p>
                <p><strong>Duration:</strong> ${job.duration}</p>
                <p><strong>Address:</strong> ${job.address}</p>
            </div>
            
            ${statusActions}
        </div>
    `;
    
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('jobModal').classList.remove('show');
}

// Close modal when clicking outside
document.getElementById('jobModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Earnings chart placeholder
function updateEarningsChart() {
    const period = document.getElementById('earningsPeriod').value;
    showNotification(`📊 Updated earnings view for ${period}`, 'info');
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
    }, 4000);
}