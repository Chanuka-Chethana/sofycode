"use client";

import { useState, useEffect, useRef } from "react";
import { Send, AlertTriangle, ShieldAlert } from "lucide-react";
import styles from "./Admin.module.css";

type Session = { session_id: string; status: string; created_at: string };
type Message = { sender: string; text: string; timestamp: string };

export default function AdminDashboard() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const fetchSessions = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/sessions");
      const data = await res.json();
      const formatted = data.sessions.map((s: any[]) => ({
        session_id: s[0], status: s[1], created_at: s[2]
      }));
      setSessions(formatted);
    } catch (e) {
      console.error("Failed to fetch sessions");
    }
  };

  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!activeSession) return;

    fetch(`http://127.0.0.1:8000/api/messages/${activeSession}`)
      .then(res => res.json())
      .then(data => setMessages(data.messages))
      .catch(e => console.error(e));

    if (wsRef.current) wsRef.current.close();
    
    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${activeSession}?role=admin`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, { sender: data.sender || "user", text: data.reply || data.message, timestamp: new Date().toISOString() }]);
    };

    return () => ws.close();
  }, [activeSession]);

// Auto-scroll AND Send Read Receipts
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    // If the admin is looking at this chat, tell the server they read it!
    if (activeSession && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      // Check if the last message was from the user to avoid spamming the server
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.sender === "user") {
        wsRef.current.send(JSON.stringify({ action: "mark_read" }));
      }
    }
  }, [messages, activeSession]);
  
  const sendAdminMessage = () => {
    if (!inputValue.trim() || !wsRef.current) return;
    
    wsRef.current.send(JSON.stringify({ message: inputValue, sender: "admin" }));
    setMessages(prev => [...prev, { sender: "admin", text: inputValue, timestamp: new Date().toISOString() }]);
    setInputValue("");
  };

  // --- NEW: Block User Logic ---
  const blockUser = async () => {
    if (!activeSession) return;
    
    const confirmBlock = window.confirm("Are you sure you want to block this user permanently?");
    if (!confirmBlock) return;

    try {
      await fetch(`http://127.0.0.1:8000/api/block/${activeSession}`, {
        method: 'POST',
      });
      
      setSessions(prev => prev.map(s => 
        s.session_id === activeSession ? { ...s, status: 'blocked' } : s
      ));
      
    } catch (e) {
      console.error("Failed to block user");
      alert("Error blocking user. Is the server running?");
    }
  };


// --- NEW: Helper to render images/files in the chat ---
  const renderMessageText = (text: string) => {
    // Look for our special file tag
    const fileRegex = /\[FILE:(.*?)\]/;
    const match = text.match(fileRegex);

    if (match) {
      const fileUrl = match[1];
      const textWithoutFile = text.replace(fileRegex, '').trim();
      const isImage = fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i);

      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {textWithoutFile && <span style={{ marginBottom: '8px' }}>{textWithoutFile}</span>}
          {isImage ? (
            <img src={fileUrl} alt="Client attachment" style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }} />
          ) : (
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#93c5fd', textDecoration: 'underline', fontSize: '12px' }}>
              📎 Download Attachment
            </a>
          )}
        </div>
      );
    }
    return text;
  };













  return (
    <div className={styles.adminContainer}>
      
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>SofyCode Command Center</h2>
        </div>
        <div className={styles.sessionList}>
          {sessions.map(session => (
            <div 
              key={session.session_id} 
              className={`${styles.sessionCard} ${activeSession === session.session_id ? styles.sessionCardActive : ''}`}
              onClick={() => setActiveSession(session.session_id)}
            >
              <div className={styles.sessionHeader}>
                <span className={styles.sessionId}>ID: {session.session_id.substring(0, 8)}...</span>
                <span className={`${styles.statusBadge} ${
                  session.status === 'human_requested' ? styles.statusHumanRequested : 
                  session.status === 'human_active' ? styles.statusHumanActive :
                  session.status === 'blocked' ? styles.statusBlocked :
                  styles.statusBot
                }`}>
                  {session.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      {activeSession ? (
        <div className={styles.chatArea}>
          <div className={styles.chatHeader}>
            <h3>Chatting with Client: {activeSession.substring(0, 8)}</h3>
            <div className={styles.headerActions}>
              <button className={styles.takeoverBtn}>Pause AI & Take Over</button>
              <button onClick={blockUser} className={styles.dangerBtn} title="Block IP">
                <ShieldAlert size={18} />
              </button>
            </div>
          </div>

          <div className={styles.messagesWrapper}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.message} ${msg.sender === 'user' ? styles.userMsg : msg.sender === 'admin' ? styles.adminMsg : styles.botMsg}`}>
                <div className={styles.senderLabel}>{msg.sender}</div>
                {renderMessageText(msg.text)}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputArea}>
            <input 
              type="text" 
              className={styles.adminInput} 
              placeholder="Type your reply to the client..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendAdminMessage()}
            />
            <button className={styles.sendBtn} onClick={sendAdminMessage}>
              <Send size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.emptyState}>Select a chat session from the left to view history and reply.</div>
      )}
    </div>
  );
}