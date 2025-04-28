import { useMutation } from "@tanstack/react-query";
import { Message, messageSchema } from "./schemas";
import { apiErrorMessage, parseErrorMessage } from "./constants/messages";
import { chatApiV1ChatPost } from "../../client/";
import { createClient } from '@hey-api/client-fetch';

const client = createClient({
  baseUrl: 'http://localhost:8000/',
});


export const useSendMessage = () => useMutation({
  mutationFn: async (message: Message) => {
    // Post the message and return the response
    const response = await chatApiV1ChatPost({ client, body: message })

    // Check if the response is ok
    if (response.error) {
      console.error(response.error);
      throw new Error(apiErrorMessage);
    }

    // Check if the response is a valid message
    const data = response.data;
    const parsedData = messageSchema.safeParse(data);
    if (!parsedData.success) {
      throw new Error(parseErrorMessage);
    }

    // Return the parsed message
    return parsedData.data;
  },
});
