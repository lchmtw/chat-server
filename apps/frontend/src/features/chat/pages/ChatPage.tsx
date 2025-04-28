import InputBox from "../ui/InputBox";
import useChatStore from "../store";
import MessageBubble from "../ui/MessageBubble";
import { useCallback, useEffect, useRef, useState } from "react";

function ChatPage() {
  // Store
  const { messages, clearMessages } = useChatStore();
  const hasMessages = messages.length > 0;

  // Refs to the messages container for scrolling
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Track user scroll state
  const [userScrolledUp, setUserScrolledUp] = useState(false);

  // Update user scroll state on scroll
  const handleScroll = useCallback(() => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 20; // 20px threshold
      setUserScrolledUp(!isAtBottom);
    }
  }, []);

  // Attach scroll listener once container is available
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container && hasMessages) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [hasMessages, handleScroll]);

  // Auto-scroll to bottom when new messages arrive (if user hasn't scrolled up)
  useEffect(() => {
    if (messagesContainerRef.current && !userScrolledUp) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, userScrolledUp]);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
      setUserScrolledUp(false);
    }
  };

  // Clear chat and reset scroll state
  const handleClearChat = () => {
    clearMessages();
    setUserScrolledUp(false);
  }

  if (!hasMessages) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-2xl font-bold">Let's chat!</div>
        <div className="w-full px-6 py-4">
          <InputBox />
        </div>
      </div>
    );
  }
  return (
    <div className="p-4 max-w-[800px] mx-auto flex flex-col justify-between h-screen relative">

      <div className="absolute flex w-full justify-start bg-white shadow-[0_0_10px_10px_rgba(255,255,255,1)]">
        <button
          onClick={handleClearChat}
          className="px-3 py-1.5 bg-red-200 hover:bg-red-300 text-red-700 rounded-md text-sm transition-colors"
        >
          Clear chat
        </button>
      </div>

      <div
        ref={messagesContainerRef}
        className="py-12 flex flex-col w-full mx-auto overflow-y-auto gap-2"
      >
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
      </div>


      <div className="w-full px-1 md:px-6 py-1 md:py-4 shadow-[0_0_10px_10px_rgba(255,255,255,1)] relative">

        {userScrolledUp && (
          <button
            className="absolute top-[-40px] left-1/2 -translate-x-1/2 bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-2 shadow-lg z-10 text-sm"
            onClick={scrollToBottom}
          >
            Scroll to bottom
          </button>
        )}
        <InputBox />
      </div>
    </div >
  );
}

export default ChatPage;