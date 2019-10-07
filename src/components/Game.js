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
      ],
      winner: null
    }
    this.handleClick = this.handleClick.bind(this)
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2)===0 ? 'X': 'O'
    })
  }

  handleClick(i){
    if (!this.state.winner) {
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
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)
    const moves = history.map((step,move)=>{
      const description = move ? 'Go to #' + move : 'start of the game'
      return (
        <li key={move}>
          <button className="moves" onClick={()=>{this.jumpTo(move)}}>
            {description}
          </button>
        </li>
      )
    })
    let status
    if(winner){
      status = 'Winner is '+ winner
    } else {
      status = 'Next player is ' + (this.state.xIsNext? 'X' : 'O')
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={(i) => this.handleClick(i)}
            squares={current.squares}
          />
        </div>
        <div className="game-info">
            <div className="status">{status}</div>
            <ul id="movesContainer">{moves}</ul>
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
