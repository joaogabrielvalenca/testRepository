import React, { Component } from 'react';
import Header from '../components/Header';
import '../styles/Game.css';
// import PropTypes from 'prop-types';

class Game extends Component {
  state = {
    questionIndex: 0,
    isAnswered: false,
    shuffledArray: [],
  };

  componentDidMount() {
    const { history: { location: { state } } } = this.props;
    const { questionIndex } = this.state;
    const timer = 30000;
    const arrayOfAnswers = [state[questionIndex].correct_answer,
      ...state[questionIndex].incorrect_answers];
    const shuffledArray = this.shuffleArray(arrayOfAnswers);
    this.setState({
      shuffledArray,
    });
    setTimeout(() => this.setState({ isAnswered: true }), timer);
  }

  shuffleArray = (array) => {
    // https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    // artigo para o algorítmo fisher-yates
    // outro artigo com elementos visuais https://bost.ocks.org/mike/shuffle/
    for (let i = array.length - 1; i > 0; i -= 1) {
      const randomNumber = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[randomNumber];
      array[randomNumber] = temp;
    }
    return array;
  };

  nextQuestion = () => {
    const { history: { location: { state } } } = this.props;
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
      isAnswered: false,
    }), () => {
      const { questionIndex } = this.state;
      const arrayOfAnswers = [state[questionIndex].correct_answer,
        ...state[questionIndex].incorrect_answers];
      const shuffledArray = this.shuffleArray(arrayOfAnswers);
      this.setState({
        shuffledArray,
      });
    });
    const timer = 30000;
    setTimeout(() => this.setState({ isAnswered: true }), timer);
  };

  checkAnswers = () => {
    this.setState({
      isAnswered: true,
    });
  };

  render() {
    const { history: { location: { state } } } = this.props;
    const { questionIndex, isAnswered, shuffledArray } = this.state;
    const renderAnswers = shuffledArray.map((answer, index) => {
      const isCorrect = answer === state[questionIndex].correct_answer;
      let classButton = 'default-color';
      if (isAnswered && isCorrect) classButton = 'correct-answer';
      if (isAnswered && !isCorrect) classButton = 'wrong-answer';
      return (
        <button
          key={ index + answer }
          data-testid={ !isCorrect
            ? `wrong-answer-${index}`
            : 'correct-answer' }
          onClick={ this.checkAnswers }
          style={ { borderWidth: '3px' } }
          className={ classButton }
          disabled={ isAnswered }
        >
          { answer }
        </button>
      );
    });
    return (
      <div>
        <Header />
        <p>Game Page</p>
        <p
          data-testid="question-category"
        >
          { state[questionIndex].category }
        </p>
        <p
          data-testid="question-text"
        >
          { state[questionIndex].question}
        </p>
        <div
          className="answers-container"
          data-testid="answer-options"
        >
          { renderAnswers }
        </div>
        {
          isAnswered
        && (
          <button
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Next
          </button>
        )
        }
      </div>
    );
  }
}

Game.propTypes = {

}.isRequired;

export default Game;
