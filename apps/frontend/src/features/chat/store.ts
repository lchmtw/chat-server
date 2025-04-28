import { create, } from 'zustand'
import { combine } from 'zustand/middleware'
import { Message } from './schemas'
import { v4 as uuidv4 } from 'uuid';

interface ChatState {
  messages: Message[];
}

const useChatStore = create(combine({
  messages: [],
} as ChatState, (set) => ({
  addMessage: (message: Message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  clearMessages: () => set({ messages: [] }),
})))

export default useChatStore;