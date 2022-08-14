interface SquareProps {
    row: number,
    col: number,
    onSelection: (c: [number, number]) => void
}

interface BoardProps {
    onSelection: (c: [number, number]) => void,
    perspective: "white" | "black"
}

interface GameState {
    isPlaying: boolean,
    secondsLeft: number | null,
    intervalId: number | null,
    prompt: [number, number] | null,
    history: History,
    roundLength: number,
    perspective: "white" | "black"
}

interface ControlsProps {
    startGame(): void,
    secondsLeft: number | null,
    history: History,
    roundLength: number,
    roundLengthChanged: (n: number) => void
}

interface PromptProps {
    prompt: [number, number] | null
}

interface Result {
    prompt: [number, number] | null
    correct: boolean
}

type History = Result[]

export type { SquareProps, GameState, ControlsProps, PromptProps, BoardProps, Result, History }