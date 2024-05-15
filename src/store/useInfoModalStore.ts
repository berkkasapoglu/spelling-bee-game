import { create } from 'zustand';

interface InfoModalState {
  resultModalVisible: boolean;
  levelInfoModalVisible: boolean;

  toggleResultModal: (value: boolean) => void;
  toggleLevelInfoModal: (value: boolean) => void;
}

const useInfoModalStore = create<InfoModalState>((set) => ({
  resultModalVisible: false,
  levelInfoModalVisible: false,

  toggleResultModal: (value: boolean) => set({ resultModalVisible: value }),
  toggleLevelInfoModal: (value: boolean) =>
    set({ levelInfoModalVisible: value }),
}));

export default useInfoModalStore;
