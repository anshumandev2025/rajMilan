"use client";
import React, { useState } from "react";
import { Button, Input, Badge, Avatar } from "antd";
import {
  SendOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined,
  HeartOutlined,
  SmileOutlined,
} from "@ant-design/icons";

// Mock data...
const mockConversations = [
  {
    id: 1,
    name: "Padmini Rathore",
    avatar:
      "https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    lastMessage: "Looking forward to talking more about our common interests!",
    timestamp: "10:23 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Kanishka Chauhan",
    avatar:
      "https://images.unsplash.com/photo-1539701938214-0d9d2e5c6b44?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    lastMessage: "What time works for you for the call tomorrow?",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Priya Sharma",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b789?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    lastMessage: "Thank you for the lovely conversation!",
    timestamp: "2 days ago",
    unread: 0,
    online: true,
  },
];

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    text: "Hello Rajveer, I noticed we share an interest in traveling.",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    senderId: 0,
    text: "Hi Padmini! Yes, I love exploring Rajasthan. Jaipur and Udaipur are absolutely beautiful!",
    timestamp: "10:05 AM",
  },
  {
    id: 3,
    senderId: 1,
    text: "I completely agree! I've also been to Jodhpur and Jaisalmer. The architecture is breathtaking!",
    timestamp: "10:10 AM",
  },
  {
    id: 4,
    senderId: 0,
    text: "That's wonderful! I'd love to hear more about your travel experiences.",
    timestamp: "10:15 AM",
  },
  {
    id: 5,
    senderId: 1,
    text: "Looking forward to talking more about our common interests!",
    timestamp: "10:23 AM",
  },
];

const MessagesPage = () => {
  const [activeConversation, setActiveConversation] = useState(
    mockConversations[0]
  );
  const [message, setMessage] = useState("");
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sent message:", message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <main className="p-4 sm:p-6 md:p-8">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Messages
            </h1>
            <p className="text-gray-600">Connect with your potential matches</p>
          </div>

          {/* Chat Container */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 h-[calc(100vh-200px)] max-h-[700px] flex overflow-hidden">
            {/* Sidebar - Conversations List */}
            <div
              className={`w-full md:w-1/3 lg:w-1/4 border-r border-gray-200/50 ${mobileView === "chat" ? "hidden md:block" : ""}`}
            >
              {/* Sidebar Header */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-gray-200/50">
                <h2 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1">
                  Conversations
                </h2>
                <p className="text-sm text-gray-500">
                  {mockConversations.length} active chats
                </p>
              </div>

              {/* Conversations List */}
              <div className="overflow-y-auto h-full bg-gradient-to-b from-white/50 to-white/30">
                {mockConversations.map((conv, index) => (
                  <div
                    key={conv.id}
                    onClick={() => {
                      setActiveConversation(conv);
                      setMobileView("chat");
                    }}
                    className={`relative flex items-start gap-4 p-4 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 border-b border-gray-100/50 ${
                      activeConversation.id === conv.id
                        ? "bg-gradient-to-r from-primary/15 to-secondary/15 border-primary/20"
                        : ""
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: "fadeInUp 0.5s ease-out forwards",
                    }}
                  >
                    {/* Avatar with status */}
                    <div className="relative flex-shrink-0">
                      <Avatar
                        size={48}
                        src={conv.avatar}
                        className="border-2 border-white shadow-md"
                      />
                      {conv.online && (
                        <span className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white shadow-sm animate-pulse" />
                      )}
                    </div>

                    {/* Conversation Details */}
                    <div className="flex-grow overflow-hidden">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold text-gray-800 truncate text-sm sm:text-base">
                          {conv.name}
                        </h4>
                        <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                          {conv.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate leading-relaxed">
                        {conv.lastMessage}
                      </p>
                    </div>

                    {/* Unread Badge */}
                    {conv.unread > 0 && (
                      <div className="absolute top-2 right-2">
                        <Badge
                          count={conv.unread}
                          style={{
                            backgroundColor: "#ec4899",
                            boxShadow: "0 2px 8px rgba(236, 72, 153, 0.3)",
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div
              className={`w-full md:w-2/3 lg:w-3/4 flex flex-col ${mobileView === "list" ? "hidden md:flex" : ""}`}
            >
              {activeConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-gray-200/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => setMobileView("list")}
                        className="md:hidden border-none shadow-sm bg-white/70 hover:bg-white"
                        size="small"
                      />

                      <div className="relative">
                        <Avatar
                          size={48}
                          src={activeConversation.avatar}
                          className="border-2 border-white shadow-md"
                        />
                        {activeConversation.online && (
                          <span className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                        )}
                      </div>

                      <div>
                        <div className="font-semibold text-gray-800 text-base sm:text-lg">
                          {activeConversation.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <span
                            className={`w-2 h-2 rounded-full ${activeConversation.online ? "bg-green-500" : "bg-gray-400"}`}
                          ></span>
                          {activeConversation.online
                            ? "Online now"
                            : "Last seen recently"}
                        </div>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-3">
                      <Button
                        icon={<HeartOutlined />}
                        className="border-none bg-gradient-to-r from-primary/10 to-secondary/10 text-primary hover:from-primary/20 hover:to-secondary/20"
                        size="small"
                      />
                      <Button
                        icon={<InfoCircleOutlined />}
                        className="border-none bg-gradient-to-r from-primary/10 to-secondary/10 text-primary hover:from-primary/20 hover:to-secondary/20"
                        size="small"
                      />
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-grow overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-rose-50/30 via-pink-50/30 to-purple-50/30 space-y-4">
                    {mockMessages.map((msg, index) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === 0 ? "justify-end" : "justify-start"} animate-fadeIn`}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: "messageSlide 0.4s ease-out forwards",
                        }}
                      >
                        <div
                          className={`px-4 py-3 rounded-2xl max-w-[85%] sm:max-w-[75%] text-sm sm:text-base shadow-lg ${
                            msg.senderId === 0
                              ? "bg-gradient-to-r from-primary to-secondary text-white ml-auto relative"
                              : "bg-white/90 backdrop-blur-sm border border-gray-200/50 text-gray-800 relative"
                          }`}
                        >
                          <div className="leading-relaxed">{msg.text}</div>
                          <div
                            className={`text-xs mt-2 ${
                              msg.senderId === 0
                                ? "text-white/80"
                                : "text-gray-500"
                            }`}
                          >
                            {msg.timestamp}
                          </div>

                          {/* Message tail */}
                          <div
                            className={`absolute top-4 w-0 h-0 ${
                              msg.senderId === 0
                                ? "-right-2 border-l-8 border-l-primary border-t-4 border-t-transparent border-b-4 border-b-transparent"
                                : "-left-2 border-r-8 border-r-white/90 border-t-4 border-t-transparent border-b-4 border-b-transparent"
                            }`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <form
                    onSubmit={handleSendMessage}
                    className="p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-t border-gray-200/50"
                  >
                    <div className="flex gap-3 items-end">
                      <div className="flex-grow relative">
                        <Input.TextArea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Type your message..."
                          autoSize={{ minRows: 1, maxRows: 4 }}
                          className="resize-none border-gray-200/50 bg-white/70 backdrop-blur-sm rounded-xl px-4 py-3 text-sm sm:text-base focus:border-primary focus:shadow-lg transition-all duration-300"
                          onPressEnter={(e) => {
                            if (!e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage(e);
                            }
                          }}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          icon={<SmileOutlined />}
                          className="border-none bg-white/70 hover:bg-white shadow-sm"
                          size="large"
                        />
                        <Button
                          htmlType="submit"
                          type="primary"
                          icon={<SendOutlined />}
                          disabled={!message.trim()}
                          className="bg-gradient-to-r from-primary to-secondary border-none shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                          size="large"
                        />
                      </div>
                    </div>
                  </form>
                </>
              ) : (
                // Empty State
                <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-rose-50/30 via-pink-50/30 to-purple-50/30 text-center p-6">
                  <div className="max-w-sm mx-auto">
                    <div className="mb-6">
                      <MessageIcon />
                    </div>
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
                      Start a Conversation
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Select a conversation from the sidebar to begin chatting
                      with your matches.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes messageSlide {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #db2777, #7c3aed);
        }

        /* Textarea focus styles */
        .ant-input:focus,
        .ant-input-focused {
          border-color: #ec4899 !important;
          box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default MessagesPage;

const MessageIcon = () => (
  <div className="relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto w-20 h-20 text-primary opacity-80"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
    <div className="absolute top-6 right-6 w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
  </div>
);
