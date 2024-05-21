"use client";

import { useConfettiModal } from "@/hooks/use-confetti";
import ReactConfetti from "react-confetti";

export const ConfettiProvider = () => {

    const confetti = useConfettiModal();

    if (!confetti.isOpen) {
        return null
    }

    return (
        <ReactConfetti className="pointer-events-none z-[100]" numberOfPieces={500} recycle={false} onConfettiComplete={ () => confetti.onClose()}/>
    )
}