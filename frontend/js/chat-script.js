// Chat functionality
let currentConversation = null;
let messages = [];

// Initialize chat
document.addEventListener('DOMContentLoaded', function() {
    loadConversation();
    loadSidebarConversations();
    setupChat();
});

// Load current conversation
function loadConversation() {
    const urlParams = new URLSearchParams(window.location.search);
    const conversationId = urlParams.get('id');
    const workerId = urlParams.get('workerId');
    
    if (workerId) {
        // Coming from worker profile - create new conversation
        createNewConversation(workerId);
    } else if (conversationId) {
        // Existing conversation
        currentConversation = conversations.find(conv => conv.id == conversationId);
        if (currentConversation) {
            updateChatHeader(currentConversation);
            loadMessages(currentConversation.id);
        }
    } else {
        window.location.href = 'chat-list.html';
    }
}

function createNewConversation(workerId) {
    // Find worker data (in real app, fetch from API)
    const allWorkers = [...carpenters, ...plumbers, ...electricians, ...mechanics, ...painters, ...constructors];
    const worker = allWorkers.find(w => w.id == workerId);
    
    if (worker) {
        const newConversation = {
            id: `new_${Date.now()}`,
            partner: worker,
            lastMessage: {
                text: "Start a conversation...",
                time: "Just now",
                sender: "system",
                unread: false
            },
            booking: {
                id: `booking_${Date.now()}`,
                title: "New Conversation",
                status: "pending"
            }
        };
        
        currentConversation = newConversation;
        updateChatHeader(newConversation);
        loadMessages(newConversation.id);
    }
}

// Update chat header with partner info
function updateChatHeader(conversation) {
    document.getElementById('partnerAvatar').src = conversation.partner.avatar;
    document.getElementById('partnerName').textContent = conversation.partner.name;
    document.getElementById('partnerName').setAttribute('data-partner-id', conversation.partner.id);
    document.getElementById('bookingTitle').textContent = conversation.booking.title;
    
    const statusElement = document.getElementById('partnerStatus');
    if (conversation.partner.online) {
        statusElement.textContent = '● Online';
        statusElement.className = 'status-online';
    } else {
        statusElement.textContent = '● Offline';
        statusElement.className = 'status-offline';
    }
}

// Load messages for conversation
function loadMessages(conversationId) {
    // Sample messages (in real app, this would be from API)
    messages = [
        {
            id: 1,
            text: "Hello! Thanks for reaching out about the cabinet repair.",
            time: "10:30 AM",
            sender: "partner",
            status: "delivered"
        },
        {
            id: 2,
            text: "Hi! Yes, I have two cabinet doors that need hinge replacement.",
            time: "10:32 AM",
            sender: "user",
            status: "read"
        },
        {
            id: 3,
            text: "I can definitely help with that! I have experience with cabinet repairs. When would be a good time for me to come take a look?",
            time: "10:33 AM",
            sender: "partner",
            status: "delivered"
        },
        {
            id: 4,
            text: "Would tomorrow morning work? Around 10 AM?",
            time: "10:35 AM",
            sender: "user",
            status: "read"
        },
        {
            id: 5,
            text: "Tomorrow at 10 AM works perfectly! I'll bring all the necessary tools and replacement hinges.",
            time: "10:36 AM",
            sender: "partner",
            status: "read"
        }
    ];
    
    displayMessages();
}

// Display messages in chat
function displayMessages() {
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.innerHTML = '';
    
    messages.forEach(message => {
        const messageElement = createMessageElement(message);
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Create message element
function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.sender}`;
    
    const statusIcon = message.sender === 'user' ? 
        `<div class="message-status">${message.status === 'read' ? '✓✓' : '✓'}</div>` : '';
    
    messageDiv.innerHTML = `
        <div class="message-text">${message.text}</div>
        <div class="message-time">${message.time}</div>
        ${statusIcon}
    `;
    
    return messageDiv;
}

// Send message
function sendMessage(event) {
    event.preventDefault();
    
    const messageInput = document.getElementById('messageInput');
    const messageText = messageInput.value.trim();
    
    if (!messageText) return;
    
    // Create new message
    const newMessage = {
        id: Date.now(),
        text: messageText,
        time: getCurrentTime(),
        sender: 'user',
        status: 'sent'
    };
    
    // Add to messages array
    messages.push(newMessage);
    
    // Display message
    const messagesContainer = document.getElementById('chatMessages');
    const messageElement = createMessageElement(newMessage);
    messagesContainer.appendChild(messageElement);
    
    // Clear input and reset height
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Simulate partner typing and response
    simulatePartnerResponse(messageText);
    
    // Update message status after a delay
    setTimeout(() => {
        updateMessageStatus(newMessage.id, 'delivered');
    }, 1000);
    
    setTimeout(() => {
        updateMessageStatus(newMessage.id, 'read');
    }, 3000);
}

// Update message status
function updateMessageStatus(messageId, status) {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
        message.status = status;
        
        // Update in UI
        const messageElements = document.querySelectorAll('.message.sent');
        messageElements.forEach(element => {
            if (element.querySelector('.message-text').textContent === message.text) {
                const statusElement = element.querySelector('.message-status');
                if (statusElement) {
                    statusElement.textContent = status === 'read' ? '✓✓' : '✓';
                }
            }
        });
    }
}

// Simulate partner response
function simulatePartnerResponse(userMessage) {
    const typingIndicator = document.getElementById('typingIndicator');
    
    // Show typing indicator
    typingIndicator.style.display = 'flex';
    
    // Hide after random delay and show response
    setTimeout(() => {
        typingIndicator.style.display = 'none';
        
        const responses = [
            "I understand. Let me check my schedule for that.",
            "That sounds good! I'll make sure to bring the necessary materials.",
            "Thanks for the update. I'll see you then!",
            "Perfect! I've noted that in my calendar.",
            "Great! Looking forward to helping you with this."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const partnerMessage = {
            id: Date.now(),
            text: randomResponse,
            time: getCurrentTime(),
            sender: 'partner',
            status: 'delivered'
        };
        
        messages.push(partnerMessage);
        const messagesContainer = document.getElementById('chatMessages');
        const messageElement = createMessageElement(partnerMessage);
        messagesContainer.appendChild(messageElement);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
    }, 2000 + Math.random() * 2000);
}

// Get current time in HH:MM format
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    }).replace(/^24:/, '00:');
}

// Load sidebar conversations
function loadSidebarConversations() {
    const sidebar = document.getElementById('sidebarConversations');
    
    conversations.forEach(conversation => {
        const item = document.createElement('div');
        item.className = `conversation-item ${conversation.id === currentConversation?.id ? 'active' : ''}`;
        item.onclick = () => switchConversation(conversation.id);
        
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
        `;
        
        sidebar.appendChild(item);
    });
}

// Switch conversation
function switchConversation(conversationId) {
    window.location.href = `chat.html?id=${conversationId}`;
}

// Setup chat functionality
function setupChat() {
    // Focus message input
    document.getElementById('messageInput').focus();
    
    // Add enter key support (shift+enter for new line)
    document.getElementById('messageInput').addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('chatForm').dispatchEvent(new Event('submit'));
        }
    });
}