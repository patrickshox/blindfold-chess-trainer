type Side = "white" | "black"

type SelectionGrade = "correct" | "incorrect" | "missed"

interface SquareState {
    grade: SelectionGrade | null
}

interface SquareProps {
    row: number,
    col: number,
    onSelection: (c: [number, number]) => SelectionGrade | null
}

interface BoardProps {
    onSelection: (c: [number, number]) =>  SelectionGrade | null,
    perspective: Side
}

interface GameState {
    isPlaying: boolean,
    secondsLeft: number | null,
    intervalId: number | null,
    prompt: [number, number] | null,
    history: History,
    roundLength: number,
    perspective: Side,
    record: Record
}

interface ControlsProps {
    startGame(): void,
    secondsLeft: number | null,
    history: History,
    roundLength: number,
    perspective: Side,
    roundLengthChanged: (n: number) => void,
    sideChanged: (s: Side) => void,
    isPlaying: boolean,
    record: Record,
    prompt: [number, number] | null
}

interface AnalyticsProps {
    record: Record,
}

interface PromptProps {
    prompt: [number, number] | null
}

interface PromptState {
    showing: boolean
}

interface Result {
    prompt: [number, number] | null
    correct: boolean
}

type History = Result[]

type Record = History[]

export type { SquareProps, SquareState, SelectionGrade, GameState, ControlsProps, PromptProps, PromptState, BoardProps, Result, History, Side, Record, AnalyticsProps }