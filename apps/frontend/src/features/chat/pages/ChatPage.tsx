import InputBox from "../ui/InputBox";
import useChatStore from "../store";
import MessageBubble from "../ui/MessageBubble";

function ChatPage() {
  const { messages } = useChatStore();

  if (messages.length === 0) {
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
    <div className="p-4 max-w-[800px] mx-auto flex flex-col gap-2 justify-between h-screen">
      <div className="flex flex-col gap-2 w-full mx-auto overflow-y-auto ">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
      </div>

      <div className="w-full px-1 md:px-6 py-1 md:py-4">
        <InputBox />
      </div>
    </div>
  );
}

export default ChatPage;