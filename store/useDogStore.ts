import { create } from 'zustand';

export interface InitialState {
	dogs: number;
}

const useDogStore = create<InitialState>(() => ({
	dogs: 5,
}));

export default useDogStore;
