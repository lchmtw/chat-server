import { create, } from 'zustand'
import { combine } from 'zustand/middleware'
import { Message } from './schemas'

interface ChatState {
  messages: Message[];
  error: string | null;
}

const useChatStore = create(combine({
  messages: [],
  error: null,
} as ChatState, (set) => ({
  addMessage: (message: Message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  clearMessages: () => set({ messages: [] }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
})))

export default useChatStore;