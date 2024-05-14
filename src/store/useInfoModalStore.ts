import { create } from 'zustand';

interface InfoModalState {
  visible: boolean;

  openModal: () => void;
  closeModal: () => void;
}

const useInfoModalStore = create<InfoModalState>((set) => ({
  visible: false,

  openModal: () => set({ visible: true }),
  closeModal: () => set({ visible: false }),
}));

export default useInfoModalStore;
