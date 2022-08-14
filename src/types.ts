interface SquareProps {
    row: number,
    col: number
}

interface GameState {
    isPlaying: boolean,
    secondsLeft: number | null,
    intervalId: number | null,
    prompt: [number, number] | null
}

interface ControlsProps {
    startGame(): void,
    secondsLeft: number | null
}

interface PromptProps {
    prompt: [number, number] | null
}

export type { SquareProps, GameState, ControlsProps, PromptProps }