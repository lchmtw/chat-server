import { create, } from 'zustand'
import { combine } from 'zustand/middleware'
import { Message } from './types'
import { v4 as uuidv4 } from 'uuid';

interface ChatState {
  messages: Message[];
}

const useChatStore = create(combine({
  messages: [],
} as ChatState, (set) => ({
  addMessage: (message: string) => set((state) => ({
    messages: [...state.messages, {
      id: uuidv4(), content: message, role: Math.random() > 0.5 ? 'user' : 'assistant'
    }]
  })),
  clearMessages: () => set({ messages: [] }),
})))

export default useChatStore;