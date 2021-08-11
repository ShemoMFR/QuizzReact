import React, { Component } from 'react';
import Levels from '../Levels/levels';
import ProgressBar from '../ProgressBar/progressbar';
import { QuizMarvel } from '../QuizzMarvel/questions';

class Quizz extends Component {

   state = {
      levelNames: ["debutant", "confirme", "expert"],
      quizzLevel: 0,
      maxQuestions: 10,
      storedQuestions: [],
      question: null,
      options: [],
      idQuestion: 0,
      btnDisable: true,
      userAnswer: null,
      score: 0
   };

   storedDataRef = React.createRef();

   loadQuestions = (level) => {
      const fetchedArrayQuizz = QuizMarvel[0].quizz[level];

      if (fetchedArrayQuizz.length >= this.state.maxQuestions) {

         this.storedDataRef.current = fetchedArrayQuizz;

      /* par ce destructuring on créer un nouveau tableau qui contient tout sauf les réponses
      car quelqu'un qui possède React pourra voir les réponses dans la console. Donc la dans le map
      on retourne tout sauf answer */
         const newArray = fetchedArrayQuizz.map(({ answer, ...keepRest}) => { return keepRest});
         this.setState({
            storedQuestions: newArray
         })
      }
      else {
         console.log("pas assez de questions");
      }
   };

   componentDidMount() {
      this.loadQuestions(this.state.levelNames[this.state.quizzLevel]);
   };

   componentDidUpdate(prevProps, prevState) {

      /* vérifie si le state array a bien été mis à jour et n'est plus vide */
      if (this.state.storedQuestions !== prevState.storedQuestions) {
         this.setState({
            question: this.state.storedQuestions[this.state.idQuestion].question,
            options: this.state.storedQuestions[this.state.idQuestion].options
         })
      }

      if (this.state.idQuestion !== prevState.idQuestion) {
         this.setState({
            question: this.state.storedQuestions[this.state.idQuestion].question,
            options: this.state.storedQuestions[this.state.idQuestion].options,
            userAnswer: null,
            btnDisable: true
         })
      };

   };

   nextQuestion = () => {
      if (this.state.idQuestion === this.state.maxQuestions - 1) {

      } else {
         this.setState((prevState) => ({
            idQuestion: prevState.idQuestion + 1
         }))
      }

      const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

      if (this.state.userAnwer === goodAnswer) {
         this.setState((prevState) => ({
            score: prevState.score + 1
         }))
      };
   };

   submitAnswer = (selectedAnswer) => {
      this.setState({
         userAnswer: selectedAnswer,
         btnDisable: false
      })
   }

   render() {

      const displayOptions = this.state.options.map((option, index) => {
         return (
            <p key={index} 
            onClick={() => this.submitAnswer(option)}
            // On fait une condition afin d'appliquer le rouge + MAJ que à la question sélectionnée
            className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
            >{option}</p>
         )
      })

    const { pseudo } = this.props.userData;
       return (
          <div>
             <Levels />
             <ProgressBar />
             <h2>{this.state.question}</h2>
             
             { displayOptions }

             <button onClick={this.nextQuestion}
             disabled={this.state.btnDisable} className="btnSubmit">Suivant</button>
          </div> 
       );
   };
}

export default Quizz;