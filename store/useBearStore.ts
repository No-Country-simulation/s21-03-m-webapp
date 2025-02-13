import { create } from 'zustand';

export interface InitialState {
	bears: number;
	removeAllBears: () => void;
}

const useBearStore = create<InitialState>((set) => ({
	bears: 20,
	removeAllBears: () => set({ bears: 0 }),
}));

export default useBearStore;
