import {create} from "zustand";

type ConfettiModal = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void
}

export const useConfettiModal = create<ConfettiModal>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))