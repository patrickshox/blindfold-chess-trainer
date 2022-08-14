import React from 'react';
import {createRoot} from "react-dom/client"
import './index.css';
import { SquareProps, GameState, ControlsProps, PromptProps } from './types.js';

class Square extends React.Component<SquareProps, {}> {

  render() {
    return (
      <button className = "square"> 
        <div className = "row-label">{this.props.row}</div>
        <div className = "col-label">{numberToLetter(this.props.col)}</div>
      </button>
    )
  }
}

class Board extends React.Component<{}, {}> {
  renderRow(r: number) {
    return (
      <div className = "row">
        <Square row = {r} col = {1}/>
        <Square row = {r} col = {2}/>
        <Square row = {r} col = {3}/>
        <Square row = {r} col = {4}/>
        <Square row = {r} col = {5}/>
        <Square row = {r} col = {6}/>
        <Square row = {r} col = {7}/>
        <Square row = {r} col = {8}/>
      </div>
    )
  }


  render() {
    return (
      <div id = "board">
        {this.renderRow(1)}
        {this.renderRow(2)}
        {this.renderRow(3)}
        {this.renderRow(4)}
        {this.renderRow(5)}
        {this.renderRow(6)}
        {this.renderRow(7)}
        {this.renderRow(8)}
      </div>
    )
  }
}

class Prompt extends React.Component<PromptProps, {}> {
  squareName = (coords: [number, number] | null): [string, number] | string => {
    if (!coords) {
      return ""
    } else {
      console.log(coords)
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
    return(
      <div className='sidebar'>
        <h1 id="sidebar-header"> Chess Vision Trainer </h1>
        <div id="timer">{this.props.secondsLeft}</div>
        <ul id = "streak">
          <li className = "correct">a5</li>
          <li className = "incorrect">b5</li>
        </ul>
        <button id="start" onClick = {this.props.startGame}>Start!</button>
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
      intervalId: null
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
      secondsLeft: 5,
      prompt: [Math.round(Math.random()*7+1), Math.round(Math.random()*7+1)],
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
      intervalId: null
    })
  }

  render() {
    return (
      <div id = "container">
        <div id="game">
          <Board />
          <Prompt prompt = {this.state.prompt} />
        </div>
        <Controls startGame={this.startGame} secondsLeft={this.state.secondsLeft}/>
      </div>
    )
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
root.render(<Game />);

function numberToLetter(c: number){
  // this function maps 1 -> a, 2->b, etc.
  const colNames = ["a", "b", "c", "d", "e", "f", "g", "h"]
  return colNames[c-1]
}
