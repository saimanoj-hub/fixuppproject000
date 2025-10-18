// Sample conversations data
const conversations = [
    {
        id: 1,
        partner: {
            id: 101,
            name: "Mike Carpenter",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            role: "worker",
            online: true
        },
        lastMessage: {
            text: "I'll be there at 10 AM tomorrow with all the tools needed.",
            time: "2 hours ago",
            sender: "partner",
            unread: true
        },
        booking: {
            id: 202,
            title: "Kitchen Cabinet Repair",
            status: "scheduled"
        }
    },
    {
        id: 2,
        partner: {
            id: 102,
            name: "Sarah Plumber",
            avatar: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100&h=100&fit=crop&crop=face",
            role: "worker",
            online: false
        },
        lastMessage: {
            text: "Thanks for the quick payment! Let me know if you need anything else.",
            time: "1 day ago",
            sender: "partner",
            unread: false
        },
        booking: {
            id: 203,
            title: "Bathroom Leak Fix",
            status: "completed"
        }
    },
    {
        id: 3,
        partner: {
            id: 103,
            name: "John Electrician",
            avatar: "https://images.unsplash.com/photo-1581094794321-8410e6a0d9d2?w=100&h=100&fit=crop&crop=face",
            role: "worker",
            online: true
        },
        lastMessage: {
            text: "I've sent you the quote for the electrical work. Let me know what you think!",
            time: "3 days ago",
            sender: "partner",
            unread: true
        },
        booking: {
            id: 204,
            title: "Light Fixture Installation",
            status: "pending"
        }
    }
];

// Initialize chat list
document.addEventListener('DOMContentLoaded', function() {
    loadConversations();
    setupSearch();
});

// Load conversations list
function loadConversations(filteredConversations = null) {
    const list = document.getElementById('conversationsList');
    const emptyState = document.getElementById('emptyState');
    const conversationsToShow = filteredConversations || conversations;
    
    list.innerHTML = '';
    
    if (conversationsToShow.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    conversationsToShow.forEach(conversation => {
        const conversationItem = createConversationItem(conversation);
        list.appendChild(conversationItem);
    });
}

// Create conversation item
function createConversationItem(conversation) {
    const item = document.createElement('div');
    item.className = `conversation-item ${conversation.lastMessage.unread ? 'unread' : ''}`;
    item.onclick = () => openChat(conversation.id);
    
    const unreadBadge = conversation.lastMessage.unread ? 
        '<div class="conversation-badge">1</div>' : '';
    
    item.innerHTML = `
        <img src="${conversation.partner.avatar}" alt="${conversation.partner.name}" class="conversation-avatar">
        <div class="conversation-content">
            <div class="conversation-header">
                <div class="conversation-name">${conversation.partner.name}</div>
                <div class="conversation-time">${conversation.lastMessage.time}</div>
            </div>
            <div class="conversation-preview">
                ${conversation.lastMessage.text}
            </div>
        </div>
        ${unreadBadge}
    `;
    
    return item;
}

// Open chat
function openChat(conversationId) {
    window.location.href = `chat.html?id=${conversationId}`;
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchChats');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterConversations(searchTerm);
        });
    }
}

// Filter conversations
function filterConversations(searchTerm) {
    if (!searchTerm) {
        loadConversations();
        return;
    }
    
    const filtered = conversations.filter(conversation => 
        conversation.partner.name.toLowerCase().includes(searchTerm) ||
        conversation.booking.title.toLowerCase().includes(searchTerm) ||
        conversation.lastMessage.text.toLowerCase().includes(searchTerm)
    );
    
    loadConversations(filtered);
}