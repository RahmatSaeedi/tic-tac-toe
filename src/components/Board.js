import React, { Component } from 'react';
import Square from './Square'

export class Board extends Component {

  renderSqare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />
  }

  render() {
    return (
      <div className="board">
        <div className="rows">
          {this.renderSqare(0)}
          {this.renderSqare(1)}
          {this.renderSqare(2)}
        </div>
        <div className="rows">
          {this.renderSqare(3)}
          {this.renderSqare(4)}
          {this.renderSqare(5)}
        </div>
        <div className="rows">
          {this.renderSqare(6)}
          {this.renderSqare(7)}
          {this.renderSqare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
