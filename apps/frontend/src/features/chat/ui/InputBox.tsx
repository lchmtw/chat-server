import { useEffect, useRef, useState } from "react";
import useChatStore from "../store";
import { useSendMessage } from "../hooks";
import { v4 as uuidv4 } from 'uuid';
import { Message } from "../schemas";
import { unknownErrorMessage } from "../constants/messages";

function InputBox() {
  const { addMessage, setError, error, clearError } = useChatStore();
  const [message, setMessage] = useState('');
  const [lastMessage, setLastMessage] = useState<Message | null>(null);
  const disabled = message.trim() === '';

  // Ref for the textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // State for tracking user composition
  const [isComposing, setIsComposing] = useState(false);

  // Mutation for sending message
  const { mutateAsync: sendMessage, isPending } = useSendMessage();

  // Auto-grow the textarea to 10 lines of text
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 24 * 10; // Grows to 10 lines of text
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [message]);

  // Send message on Enter key, except when composing
  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.currentTarget.value);
  }

  async function safeSendMessage(message: Message) {
    clearError();
    try {
      const response = await sendMessage(message);
      addMessage(response);
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : unknownErrorMessage);
    }
  }

  const handleSend = async () => {
    const newMessage: Message = {
      id: uuidv4(), content: message, role: 'user'
    }
    addMessage(newMessage);
    setLastMessage(newMessage);
    setMessage('');
    await safeSendMessage(newMessage);
  };

  const handleRetry = async () => {
    if (!lastMessage) return;
    await safeSendMessage(lastMessage);
  };

  return (
    <div className="w-full max-w-[600px] mx-auto flex flex-col gap-2">
      {error && (
        <div className="w-full bg-red-50 border border-red-200 rounded-md p-3 mb-2 flex justify-between items-center">
          <span className="text-red-600">{error}</span>
          <button
            className="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded-md text-sm"
            onClick={handleRetry}
          >
            Retry
          </button>
        </div>
      )}

      <div className="w-full border shadow-md rounded-3xl p-6 flex flex-col gap-2">
        <textarea
          ref={textareaRef}
          className="w-full outline-none resize-none"
          placeholder="Ask anything..."
          rows={1}
          maxLength={1000}
          value={message}
          onChange={handleInput}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onKeyDown={handleKeyDown}
        />
        <button className="self-end w-fit bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded-md outline-none" onClick={handleSend} disabled={disabled || isPending}>
          Send
        </button>
      </div>
    </div>
  );
}

export default InputBox;
