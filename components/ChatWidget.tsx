"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Menu, Plus, Trash2, MessageSquare, Paperclip } from "lucide-react";
import styles from "./ChatWidget.module.css";
import { usePathname } from "next/navigation";

// Define our types
type Message = { text: string; sender: "user" | "bot" | "admin"; attachmentName?: string };
type ChatSession = { id: string; title: string; date: number; messages: Message[] };

const DEFAULT_MESSAGE: Message = { 
  text: "Hi there! I'm the SofyCode technical assistant. How can I help you today?", 
  sender: "bot" 
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<"chat" | "history">("chat");
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [messagesRead, setMessagesRead] = useState(false);
  
  // Reference to hold our live WebSocket connection
  const wsRef = useRef<WebSocket | null>(null);

  // If we are on the admin page, render absolutely nothing!
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  // 1. Initialize from LocalStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedData = localStorage.getItem("sofycode_sessions");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.chats && parsed.chats.length > 0) {
          setChats(parsed.chats);
          setActiveId(parsed.activeId || parsed.chats[0].id);
          return;
        }
      } catch (e) {
        console.error("Could not load chat history");
      }
    }
    startNewChat();
  }, []);

  // 2. Save to LocalStorage whenever chats or activeId changes
  useEffect(() => {
    if (isMounted && chats.length > 0) {
      localStorage.setItem("sofycode_sessions", JSON.stringify({ chats, activeId }));
    }
  }, [chats, activeId, isMounted]);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (view === "chat") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats, activeId, view]);

  // Connect to the WebSocket whenever the active chat changes
  useEffect(() => {
    if (!isMounted || !activeId) return;

    if (wsRef.current) {
      wsRef.current.close();
    }

    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${activeId}`);
    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // Catch the read receipt signal!
      if (data.type === "read_receipt") {
        setMessagesRead(true);
        return;
      }
      
      setChats(prev => prev.map(chat => {
        if (chat.id === activeId) {
          return {
            ...chat,
            messages: [...chat.messages, { text: data.reply, sender: data.sender || "bot" }]
          };
        }
        return chat;
      }));
      setIsLoading(false); 
    };

    ws.onclose = () => console.log(`Disconnected from chat ${activeId}`);

    return () => {
      ws.close();
    };
  }, [activeId, isMounted]);

  // --- Chat Management Functions --- //

  const startNewChat = () => {
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    
    const newChat: ChatSession = {
      id: uniqueId,
      title: "New Conversation",
      date: Date.now(),
      messages: [DEFAULT_MESSAGE],
    };
    
    setChats(prev => [newChat, ...prev]);
    setActiveId(newChat.id);
    setView("chat");
  };
  
  const deleteChat = (e: React.MouseEvent, idToDelete: string) => {
    e.stopPropagation();
    if (!window.confirm("Delete this conversation?")) return;

    setChats(prev => {
      const remaining = prev.filter(c => c.id !== idToDelete);
      if (remaining.length === 0) {
        setTimeout(startNewChat, 0); 
        return [];
      }
      if (activeId === idToDelete) {
        setActiveId(remaining[0].id);
      }
      return remaining;
    });
    
    if (chats.length <= 1) localStorage.removeItem("sofycode_sessions");
  };

  const updateActiveChat = (newMessages: Message[], newTitle?: string) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === activeId) {
        return { ...chat, messages: newMessages, title: newTitle || chat.title, date: Date.now() };
      }
      return chat;
    }));
  };

  // --- Helper to render images/files in the client chat ---
  const renderMessageText = (text: string) => {
    if (!text) return "";
    const fileRegex = /\[FILE:(.*?)\]/;
    const match = text.match(fileRegex);

    if (match) {
      const fileUrl = match[1];
      const textWithoutFile = text.replace(fileRegex, '').trim();
      const isImage = fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {textWithoutFile && <span>{textWithoutFile}</span>}
          {isImage ? (
            <img src={fileUrl} alt="Attachment" style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
          ) : (
            <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', fontSize: '12px', fontWeight: 'bold' }}>
              📎 Download Attachment
            </a>
          )}
        </div>
      );
    }
    return text;
  };

  // --- Live Socket Send --- //

  const sendMessage = async () => {
    if (!inputValue.trim() && !selectedFile) return;

    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      alert("Reconnecting to chat server... please wait a moment.");
      return;
    }

    const activeChat = chats.find(c => c.id === activeId);
    if (!activeChat) return;

    let finalMessageText = inputValue.trim();
    setIsLoading(true);
    setMessagesRead(false);

    // 1. Upload File
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      
      try {
        const uploadRes = await fetch("http://127.0.0.1:8000/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        finalMessageText += `\n\n[FILE:${uploadData.url}]`;
      } catch (error) {
        console.error("Failed to upload file:", error);
        finalMessageText += `\n\n(Failed to upload: ${selectedFile.name})`;
      }
    }

    if (!finalMessageText.trim() && selectedFile) {
        finalMessageText = `[FILE:http://127.0.0.1:8000/uploads/${selectedFile.name}]`;
    }

    // UPDATE LOCAL UI INSTANTLY
    const newMessages: Message[] = [
      ...activeChat.messages, 
      { text: finalMessageText, sender: "user", attachmentName: selectedFile?.name }
    ];
    
    const isFirstUserMsg = activeChat.messages.length === 1;
    const newTitle = isFirstUserMsg ? (inputValue.length > 25 ? inputValue.substring(0, 25) + "..." : inputValue || "Sent an attachment") : undefined;

    updateActiveChat(newMessages, newTitle);

    // 2. Send via WebSocket to Admin/AI
    wsRef.current.send(JSON.stringify({ message: finalMessageText }));

    // 3. Clear Input
    setInputValue("");
    setSelectedFile(null);
	setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const activeChat = chats.find(c => c.id === activeId);
  const currentMessages = activeChat ? activeChat.messages : [];

  if (!isMounted) return null;

  return (
    <div className={styles.widgetWrapper}>
      {isOpen && (
        <div className={styles.chatWindow}>
          
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <button onClick={() => setView(view === "chat" ? "history" : "chat")} className={styles.iconButton} title="Chat History">
                {view === "chat" ? <Menu size={20} /> : <MessageSquare size={20} />}
              </button>
              <div>
                <h3 className={styles.headerTitle}>{view === "history" ? "Chat History" : "SofyBot"}</h3>
                <span className={styles.headerSubtitle}>{view === "history" ? `${chats.length} conversations` : "Usually replies instantly"}</span>
              </div>
            </div>
            
            <div className={styles.headerLeft}>
              <button onClick={startNewChat} className={styles.iconButton} title="New Chat">
                <Plus size={22} />
              </button>
              <button onClick={() => setIsOpen(false)} className={styles.iconButton}>
                <X size={20} />
              </button>
            </div>
          </div>

          {/* History View */}
          {view === "history" && (
            <div className={styles.historyArea}>
              {chats.length === 0 ? (
                <div className={styles.emptyHistory}>No chat history yet.</div>
              ) : (
                [...chats].sort((a, b) => b.date - a.date).map((chat) => (
                  <div 
                    key={chat.id} 
                    className={`${styles.historyItem} ${chat.id === activeId ? styles.historyItemActive : ''}`}
                    onClick={() => { setActiveId(chat.id); setView("chat"); }}
                  >
                    <div className={styles.historyText}>
                      <span className={styles.historyTitle}>{chat.title}</span>
                      <span className={styles.historyDate}>{new Date(chat.date).toLocaleDateString()} at {new Date(chat.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <button onClick={(e) => deleteChat(e, chat.id)} className={styles.deleteChatBtn} title="Delete Chat">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Chat View */}
          {view === "chat" && (
            <>
              <div className={styles.messagesArea}>
                {currentMessages.map((msg, index) => (
                  <div key={index} className={`${styles.message} ${msg.sender === "user" ? styles.userMessage : styles.botMessage}`}>
                    {msg.attachmentName && (
                      <div style={{ fontSize: '11px', opacity: 0.8, marginBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px' }}>
                        📎 Attached: {msg.attachmentName}
                      </div>
                    )}
                    {msg.sender === "admin" && <div style={{fontSize: '10px', color: '#8b5cf6', fontWeight: 'bold', marginBottom: '2px'}}>SofyCode Support</div>}
                    
                    {renderMessageText(msg.text)}

                    {/* The Double Checkmarks */}
                    {msg.sender === "user" && (
                      <div style={{ 
                        fontSize: '10px', 
                        textAlign: 'right', 
                        marginTop: '4px', 
                        color: messagesRead ? '#60a5fa' : 'rgba(255,255,255,0.5)' 
                      }}>
                        {messagesRead ? '✓✓' : '✓'}
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && <div className={styles.typingIndicator}>Delivering...</div>}
                <div ref={messagesEndRef} />
              </div>

              <div className={styles.inputContainer}>
                {selectedFile && (
                  <div className={styles.attachmentPreview}>
                    <span className={styles.attachmentName}>📎 {selectedFile.name}</span>
                    <button onClick={() => setSelectedFile(null)} className={styles.removeAttachment}>
                      <X size={14} />
                    </button>
                  </div>
                )}

                <div className={styles.inputArea}>
                  {/* Hidden File Input */}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: "none" }} 
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                  
                  {/* Paperclip Button */}
                  <button 
                    onClick={() => fileInputRef.current?.click()} 
                    className={styles.attachButton}
                    title="Attach a file"
                  >
                    <Paperclip size={20} />
                  </button>

                  {/* Text Input */}
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className={styles.inputField}
                  />
                  
                  {/* Send Button */}
                  <button
                    onClick={sendMessage}
                    disabled={!inputValue.trim() && !selectedFile}
                    className={styles.sendButton}
                    style={{ background: (!inputValue.trim() && !selectedFile) ? '#475569' : '' }}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      )}

      {/* Floating Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className={styles.toggleButton}>
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}