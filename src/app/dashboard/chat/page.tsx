"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Bot, ArrowUpRight, File } from "lucide-react";

export default function Component() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }]);
      // Here you would typically send the input to your AI backend
      // and then add the AI's response to the messages
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Here’s a Letter of Recommendation (LOR) template based on your profile and achievements. You can customize this template with specific details depending on the recommender and context.",
        },
      ]);
      setInput("");
    }
  };

  const examplePrompts = [
    "Based of my profile generate a Letter of Recommendation template",
    "Give me 5 niche ideas that I can use for my EB-1A application",
  ];

  return (
    <div className="mx-auto flex h-[calc(100vh-6rem)] flex-col p-4 pt-0">
      {/* <h1 className="mb-4 text-2xl font-bold">AI Chat Interface</h1> */}
      <ScrollArea className="mb-4 flex-grow rounded-md border bg-card p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex items-start ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex max-w-2xl items-start space-x-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`rounded-lg p-2 ${message.role === "user" ? "ml-2 bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                {message.role === "user" ? (
                  <User className="h-6 w-6" />
                ) : (
                  <Bot className="h-6 w-6" />
                )}
              </div>
              <div
                className={`rounded-lg p-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                {message.content}
              </div>
            </div>
          </div>
        ))}
        <div className="-mt-2 ml-12 flex w-fit items-center rounded-md bg-muted p-2 ">
          <File className="h-5 w-5 text-muted-foreground" />
          <p className="ml-2 text-sm text-muted-foreground">LOR template.pdf</p>
        </div>
      </ScrollArea>
      <div className="mb-4">
        {/* <h2 className="mb-2 text-sm font-semibold">Example prompts:</h2> */}
        <div className="flex space-x-2">
          {examplePrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => setInput(prompt)}
            >
              {prompt}
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          type="text"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">
          <Send className="mr-2 h-4 w-4" />
          Send
        </Button>
      </form>
    </div>
  );
}
