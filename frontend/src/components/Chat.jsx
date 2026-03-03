import { useState, useEffect, useRef } from 'react'

function Chat({ user, onLogout }) {
    const [messages, setMessages] = useState([
        { text: "Welcome to QA Chat! How can I help you today?", sender: 'bot' }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const messagesEndRef = useRef(null)
    const textareaRef = useRef(null)

    const history = [
        "Project Requirements Q&A",
        "Frontend Styling Discussion",
        "API Integration Steps",
        "Database Schema Review"
    ]

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
        }
    }, [input])

    const handleSend = async (e) => {
        if (e) e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage = { text: input, sender: 'user' }
        setMessages([...messages, userMessage])
        const currentInput = input
        setInput('')
        setIsLoading(true)

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: currentInput }),
            })

            const data = await response.json()
            const botMessage = { text: data.reply, sender: 'bot' }
            setMessages((prev) => [...prev, botMessage])
        } catch (err) {
            setMessages((prev) => [...prev, { text: "Error: Could not reach the server.", sender: 'bot' }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="chat-page">
            <aside className="chat-sidebar">
                <button className="new-chat-trigger">
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>＋</span> New chat
                </button>

                <div className="history-scroll">
                    <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#676767', padding: '10px 10px 5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Yesterday</p>
                    {history.map((item, index) => (
                        <div key={index} className="history-node">
                            {item}
                        </div>
                    ))}
                </div>

                <div className="sidebar-user-section">
                    <button className="user-profile-btn">
                        <div className="avatar-icon user-avatar" style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}>
                            {user?.email?.[0].toUpperCase() || 'U'}
                        </div>
                        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }}>
                            {user?.email?.split('@')[0] || 'User'}
                        </span>
                    </button>
                    <button className="user-profile-btn logout-action" onClick={onLogout}>
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                        </svg>
                        Sign Out
                    </button>
                </div>
            </aside>

            <main className="chat-main-view">
                <div className="messages-viewport">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message-row ${msg.sender === 'user' ? 'user-msg' : ''}`}>
                            <div className="message-inner">
                                <div className={`avatar-icon ${msg.sender === 'bot' ? 'bot-avatar' : 'user-avatar'}`}>
                                    {msg.sender === 'bot' ? 'QA' : (user?.email?.[0].toUpperCase() || 'U')}
                                </div>
                                <div className="message-body">
                                    <p>{msg.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="input-container-fixed">
                    <div className="input-wrapper">
                        <textarea
                            ref={textareaRef}
                            rows="1"
                            placeholder="Message QA Chat..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            className="send-action-btn"
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                        >
                            <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>
                    <p className="chat-footer-text">
                        QA Chat can make mistakes. Check important info.
                    </p>
                </div>
            </main>
        </div>
    )
}

export default Chat
