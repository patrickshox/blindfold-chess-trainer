import React from 'react';
import {createRoot} from "react-dom/client"
import './index.css';
import { SquareProps, GameState, ControlsProps, PromptProps, BoardProps, Result, History } from './types.js';

class Square extends React.Component<SquareProps, {}> {

  render() {
    return (
      <button className = "square" onClick = {() => this.props.onSelection([this.props.col, this.props.row])}> 
        <div className = "row-label">{this.props.row}</div>
        <div className = "col-label">{numberToLetter(this.props.col)}</div>
      </button>
    )
  }
}

class Board extends React.Component<BoardProps, {}> {

  
  renderRow(r: number) {
    var nums = [1, 2, 3, 4, 5, 6, 7, 8]
    if (this.props.perspective == "black") {
      nums = nums.reverse()
    }

    return (
      <div className = "row">
        {nums.map(c => <Square row = {r} col = {c} onSelection = {this.props.onSelection}/>)}
      </div>
    )
  }

  render() {
    var nums = [1, 2, 3, 4, 5, 6, 7, 8]
    if (this.props.perspective == "white") {
      nums = nums.reverse()
    }

    return (
      <div id = "board">
        {nums.map(r => this.renderRow(r))}
      </div>
    )
  }
}

class Prompt extends React.Component<PromptProps, {}> {
  squareName = (coords: [number, number] | null): [string, number] | string => {
    if (!coords) {
      return ""
    } else {
      return numberToLetter(coords[0]) + coords[1].toString()
    }
  }

  render() {
    return (
      <div id = "prompt"> {this.squareName(this.props.prompt)} </div>
    )
  }
}

class Controls extends React.Component<ControlsProps, {}> {

  render() {
    const history = this.props.history.map((res, i) => {
      return (
        <li key = {i} className = {res.correct ? "correct": "incorrect"}>{squareToName(res.prompt)}</li>
      )
    })


    return(
      <div className='sidebar'>
        <h1 id="sidebar-header"> Chess Vision Trainer </h1>
        <div id="timer">{this.props.secondsLeft}</div>
        <input type="range" min="10" max="60" className="slider" id="myRange" value = {this.props.roundLength} step="5" onChange={(e) => this.props.roundLengthChanged(parseInt(e.target.value))}></input>
        <ul id = "streak"> {history} </ul>
        <button id="start" onClick = {this.props.startGame}>Start a {this.props.roundLength}s round!</button>
      </div>
    )
  }
}

class Game extends React.Component<{}, GameState> {


  constructor(props: any) {
    super(props)
    this.state = {
      isPlaying: false,
      secondsLeft: null,
      prompt: null,
      intervalId: null,
      history: [],
      roundLength: 30,
      perspective: "black"
    }
  }

  startGame = () => {
    if (this.state.isPlaying) {
      return
    }

    console.log("start")
    let i = window.setInterval(this.updateGame, 1000)
    this.setState({
      isPlaying: true,
      secondsLeft: this.state.roundLength,
      prompt: getRandomSquare(),
      intervalId: i
    })
  }

  updateGame = () => {
    let t = this.state.secondsLeft
    if (!t) {
      return
    } 
    
    if (t === 1) {
      this.endGame();
    } else {
      this.setState({
        secondsLeft: t - 1
      })
    }
  }

  endGame = () => {
    let i = this.state.intervalId

    if (i) {
      clearInterval(i)
    }

    this.setState({
      isPlaying: false,
      secondsLeft: null,
      prompt: null,
      intervalId: null,
      history: []
    })
  }

  selectionMade = (selection: [number, number]) => {
    if (!this.state.isPlaying) {
      return
    }

    let newestResult: Result = {
      prompt: this.state.prompt,
      correct: selection.toString() === (this.state.prompt)?.toString()
    }

    var history: History = this.state.history.slice()
    history.push(newestResult)
    this.setState({
      history: history
    })

    this.changePrompt()
  }

  changePrompt = () => {
    this.setState({
      prompt: getRandomSquare()
    })
  }

  roundLengthChanged = (n: number) => {
    this.setState({
      roundLength: n
    })
  }

  render() {
    return (
      <div id = "container">
        <div id="game">
          <Board onSelection={this.selectionMade} perspective = {this.state.perspective} />
          <Prompt prompt = {this.state.prompt} />
        </div>
        <Controls startGame={this.startGame} secondsLeft={this.state.secondsLeft} history={this.state.history} roundLength = {this.state.roundLength} roundLengthChanged = {this.roundLengthChanged} />
      </div>
    )
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
root.render(<Game />);

function numberToLetter(c: number): string {
  const colNames = ["a", "b", "c", "d", "e", "f", "g", "h"]
  return colNames[c-1]
}

function getRandomSquare(): [number, number] {
  return [Math.round(Math.random()*7+1), Math.round(Math.random()*7+1)]
}

function squareToName(square: [number, number] | null): string {
  if (!square) {
    return ""
  }
  return numberToLetter(square[0]) + square[1]
}