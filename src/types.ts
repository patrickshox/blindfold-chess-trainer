type Side = "white" | "black"

interface SquareProps {
    row: number,
    col: number,
    onSelection: (c: [number, number]) => void
}

interface BoardProps {
    onSelection: (c: [number, number]) => void,
    perspective: Side
}

interface GameState {
    isPlaying: boolean,
    secondsLeft: number | null,
    intervalId: number | null,
    prompt: [number, number] | null,
    history: History,
    roundLength: number,
    perspective: Side
}

interface ControlsProps {
    startGame(): void,
    secondsLeft: number | null,
    history: History,
    roundLength: number,
    perspective: Side,
    roundLengthChanged: (n: number) => void,
    sideChanged: (s: Side) => void,
}

interface PromptProps {
    prompt: [number, number] | null
}

interface Result {
    prompt: [number, number] | null
    correct: boolean
}

type History = Result[]

export type { SquareProps, GameState, ControlsProps, PromptProps, BoardProps, Result, History, Side }