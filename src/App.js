import React, { Component } from 'react'

import './App.css';


export default class App extends Component {

  state = {
    counter: 0
  }

  render() {
    return (
      //the reason a new attribute is created for testing is because another coder might come along
      //and change the class or id when refactoring
      <div data-test="component-app" className="container">
        <h1 data-test="counter-display">Counter is {this.state.counter}</h1>
        <button 
          onClick={() => this.setState(prevState => ({ counter: prevState.counter + 1 }))} 
          data-test="increment-button"
        >
          increment
        </button>
        <button
          disabled={!this.state.counter}
          onClick={() => this.setState(prevState => ({ counter: prevState.counter - 1 }))}
          data-test="decrement-button"
        >
          decrement
        </button>
      </div>
    )
  }
}
