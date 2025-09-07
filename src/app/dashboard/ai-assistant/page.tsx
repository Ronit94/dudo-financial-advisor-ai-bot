"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, FileText, MessageSquare, Bot, User, Send, Loader2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const RAGSystem = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is .xlsx
    if (!file.name.endsWith('.xlsx') && !file.type.includes('spreadsheet')) {
      toast("invalid file type. Please upload an .xlsx file.");
      return;
    }

    setIsUploading(true);
    
    // Simulate file processing
    setTimeout(() => {
      setUploadedFile(file);
      setIsUploading(false);
      setShowChat(true);
      setMessages([
        {
          id: "1",
          content: `Great! I've processed your Excel file "${file.name}". You can now ask me questions about the data in your spreadsheet.`,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      toast("file uploaded and processed successfully!");
    }, 2000);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand your question about "${inputValue}". This is a simulated response. In a real implementation, I would analyze your Excel data and provide insights based on your specific spreadsheet content.`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetSession = () => {
    setUploadedFile(null);
    setShowChat(false);
    setMessages([]);
    setInputValue("");
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">

      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!showChat ? (
            // Upload Section
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="p-8 bg-card/30 backdrop-blur-sm border-border/50">
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center"
                  >
                    <Upload className="h-10 w-10 text-primary" />
                  </motion.div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Upload Your Excel File
                    </h2>
                    <p className="text-muted-foreground">
                      Upload an .xlsx file to start asking questions about your data
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="file"
                        accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        id="file-upload"
                      />
                      <Button
                        size="lg"
                        disabled={isUploading}
                        className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 text-primary-foreground"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Processing file...
                          </>
                        ) : (
                          <>
                            <Upload className="h-5 w-5 mr-2" />
                            Choose Excel File
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      Only .xlsx files are supported
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            // Chat Section
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              {/* File Info */}
              <Card className="p-4 mb-6 bg-card/30 backdrop-blur-sm border-border/50">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{uploadedFile?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      File processed • Ready for questions
                    </p>
                  </div>
                </div>
              </Card>

              {/* Chat Interface */}
              <Card className="h-[600px] flex flex-col bg-card/30 backdrop-blur-sm border-border/50">

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4 pb-4">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className={`flex gap-3 ${
                            message.sender === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          {message.sender === "bot" && (
                            <Avatar className="h-8 w-8 mt-1">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div
                            className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                              message.sender === "user"
                                ? "bg-primary text-primary-foreground ml-auto"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>

                          {message.sender === "user" && (
                            <Avatar className="h-8 w-8 mt-1">
                              <AvatarFallback className="bg-secondary text-secondary-foreground">
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    <AnimatePresence>
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex gap-3 justify-start"
                        >
                          <Avatar className="h-8 w-8 mt-1">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-muted text-muted-foreground rounded-2xl px-4 py-3 max-w-[70%]">
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="text-sm">Analyzing data...</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t bg-card/50 p-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask a question about your Excel data..."
                      className="flex-1 bg-background/50 border-border/50 focus:border-primary transition-colors"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="icon"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RAGSystem;