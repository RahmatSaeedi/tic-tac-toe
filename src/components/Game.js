import React, { Component } from 'react'
import Board from './Board'

export class Game extends Component {
  constructor(props) {
    super(props)
    this.state ={
      xIsNext: true,
      stepNumber: 0,
      history: [
        {
          squares: Array(9).fill(null)
        }
      ]
    }
  }
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    const winner = calculateWinner(squares)

    if(winner || squares[i]){
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat({
        squares
      }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
    
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={(i) => this.handleClick(i)}
            squares={current.squares}
          />
        </div>
      </div>
    )
  }
}


function calculateWinner(board) {
  const winningStrategies = [
    //Horizontal ways of winning
    [0,1,2],
    [3,4,5],
    [6,7,8],
    
    //vertical ways of winning
    [0,3,6],
    [1,4,7],
    [2,5,8],

    //Diagonal ways of winning
    [0,4,8],
    [2,4,6]
  ]
  for(let i = 0; i < winningStrategies.length; i++){
    const [a,b,c] = winningStrategies[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]){
      return board[a]
    }
  }
  return null
}

export default Game
