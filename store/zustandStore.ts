import { create } from 'zustand';

interface StoreState {
    docId: string;
    setDocId: (docId: string) => void;
}

export const useStore = create<StoreState>((set) => ({
    docId: '',
    setDocId: (id: string) => set({ docId: id }),
}));

