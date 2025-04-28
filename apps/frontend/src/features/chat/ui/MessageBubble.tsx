import { Message } from "../schemas";
import { cn } from "../../../lib/";

function MessageBubble({ message }: { message: Message }) {
  return <div className={cn("max-w-[400px] border rounded-2xl p-4 bg-gray-100", message.role === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start")}>
    {message.content}
  </div>;
}

export default MessageBubble;