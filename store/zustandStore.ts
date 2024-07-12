import { create } from 'zustand';

interface StoreState {
    docId: string;
    setDocId: (docId: string) => void;
}

interface StoreUserEmail {
    email: string;
    setEmail: (email: string) => void;
}

export const useStore = create<StoreState>((set) => ({
    docId: '',
    setDocId: (id: string) => set({ docId: id }),
}));


export const useStoreUserEmail = create<StoreUserEmail>((set) => ({
    email: '',
    setEmail: (email: string) => set({ email: email }),
}));