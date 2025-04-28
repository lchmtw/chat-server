import { useMutation } from "@tanstack/react-query";
import { Message, messageSchema } from "./schemas";

export const useSendMessage = () => useMutation({
  mutationFn: async (message: Message) => {
    // Post the message and return the response
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      body: JSON.stringify(message),
    });

    // Check if the response is ok
    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    // Check if the response is a valid message
    const data = await response.json();
    const parsedData = messageSchema.safeParse(data);
    if (!parsedData.success) {
      throw new Error("Failed to parse message");
    }

    // Return the parsed message
    return parsedData.data;
  },
});
