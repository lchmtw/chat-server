import { useEffect, useRef, useState } from "react";
import useChatStore from "../store";

function InputBox() {
  const { addMessage } = useChatStore();
  const [message, setMessage] = useState('');
  const disabled = message.trim() === '';

  // Ref for the textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // State for tracking user composition
  const [isComposing, setIsComposing] = useState(false);

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

  const handleSend = () => {
    addMessage(message);
    setMessage('');
  };

  return (
    <div className="w-full max-w-[600px] border shadow-md rounded-3xl p-6 mx-auto flex flex-col gap-2">
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
      <button className="self-end w-fit bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-md outline-none" onClick={handleSend} disabled={disabled}>
        Send
      </button>
    </div>
  );
}

export default InputBox;
