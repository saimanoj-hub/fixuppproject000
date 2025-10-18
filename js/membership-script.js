// Membership plans data
const membershipPlans = {
    monthly: [
        {
            id: 'free',
            name: 'Free',
            price: 0,
            period: 'forever',
            featured: false,
            features: [
                '3 job applications per month',
                'Basic profile visibility',
                'Limited messaging',
                '5 portfolio items',
                'Standard support'
            ],
            limitations: [
                'No verified badge',
                'No priority in search'
            ]
        },
        {
            id: 'starter',
            name: 'Starter',
            price: 9,
            period: 'per month',
            featured: false,
            features: [
                'Unlimited job applications',
                'Medium profile visibility',
                'Unlimited messaging',
                '20 portfolio items',
                'Verified badge',
                'Priority in search'
            ],
            limitations: [
                'No priority support'
            ]
        },
        {
            id: 'pro',
            name: 'Pro',
            price: 19,
            period: 'per month',
            featured: true,
            features: [
                'Unlimited job applications',
                'High profile visibility',
                'Unlimited messaging',
                'Unlimited portfolio items',
                'Verified badge',
                'Top priority in search',
                '24/7 priority support',
                'Early access to features'
            ],
            limitations: []
        }
    ],
    yearly: [
        {
            id: 'free',
            name: 'Free',
            price: 0,
            period: 'forever',
            featured: false,
            features: [
                '3 job applications per month',
                'Basic profile visibility',
                'Limited messaging',
                '5 portfolio items',
                'Standard support'
            ],
            limitations: [
                'No verified badge',
                'No priority in search'
            ]
        },
        {
            id: 'starter',
            name: 'Starter',
            price: 86, // $9 * 12 * 0.8 (20% discount)
            period: 'per year',
            featured: false,
            features: [
                'Unlimited job applications',
                'Medium profile visibility',
                'Unlimited messaging',
                '20 portfolio items',
                'Verified badge',
                'Priority in search'
            ],
            limitations: [
                'No priority support'
            ]
        },
        {
            id: 'pro',
            name: 'Pro',
            price: 182, // $19 * 12 * 0.8 (20% discount)
            period: 'per year',
            featured: true,
            features: [
                'Unlimited job applications',
                'High profile visibility',
                'Unlimited messaging',
                'Unlimited portfolio items',
                'Verified badge',
                'Top priority in search',
                '24/7 priority support',
                'Early access to features'
            ],
            limitations: []
        }
    ]
};

// Initialize membership page
document.addEventListener('DOMContentLoaded', function() {
    loadPlans('monthly');
    setupFAQ();
});

// Load plans based on billing cycle
function loadPlans(billingCycle) {
    const plans = membershipPlans[billingCycle];
    const grid = document.getElementById('plansGrid');
    
    grid.innerHTML = '';
    
    plans.forEach(plan => {
        const planCard = createPlanCard(plan, billingCycle);
        grid.appendChild(planCard);
    });
}

// Create plan card
function createPlanCard(plan, billingCycle) {
    const card = document.createElement('div');
    card.className = `plan-card ${plan.featured ? 'featured' : ''}`;
    
    const badge = plan.featured ? '<div class="plan-badge">MOST POPULAR</div>' : '';
    const price = plan.price === 0 ? 'Free' : `$${plan.price}`;
    const buttonText = plan.price === 0 ? 'Continue Free' : 'Start 7-Day Trial';
    const buttonClass = plan.featured ? 'btn-primary' : 'btn-secondary';
    
    let featuresHTML = '';
    plan.features.forEach(feature => {
        featuresHTML += `<li>${feature}</li>`;
    });
    
    plan.limitations.forEach(limitation => {
        featuresHTML += `<li class="disabled">${limitation}</li>`;
    });
    
    card.innerHTML = `
        ${badge}
        <div class="plan-name">${plan.name}</div>
        <div class="plan-price">${price}</div>
        <div class="plan-period">${plan.period}</div>
        <ul class="plan-features">
            ${featuresHTML}
        </ul>
        <button class="${buttonClass} full-width" onclick="selectPlan('${plan.id}', '${billingCycle}')">
            ${buttonText}
        </button>
    `;
    
    return card;
}

// Toggle billing cycle
function toggleBilling() {
    const toggle = document.getElementById('billingToggle');
    const billingCycle = toggle.checked ? 'yearly' : 'monthly';
    loadPlans(billingCycle);
}

// Select plan
function selectPlan(planId, billingCycle) {
    if (planId === 'free') {
        // Set free plan and redirect to dashboard
        localStorage.setItem('fixUP_worker_plan', JSON.stringify({
            plan: 'free',
            status: 'active',
            joined: new Date().toISOString()
        }));
        
        showNotification('🎉 Free plan activated!', 'success');
        setTimeout(() => {
            window.location.href = 'worker-home.html';
        }, 1500);
        
    } else {
        // Redirect to payment page for paid plans
        window.location.href = `payment.html?plan=${planId}&billing=${billingCycle}`;
    }
}

// Setup FAQ functionality
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
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
    }, 3000);
}