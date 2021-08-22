import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Levels from '../Levels/levels';
import ProgressBar from '../ProgressBar/progressbar';
import { QuizMarvel } from '../QuizzMarvel/questions';
import QuizzOver from '../QuizzOver/quizzover';

// configure la biblio toast pour pop-ups

toast.configure();

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
      score: 0,
      showWelcomeMsg: false,
      quizzEnd: false
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

   showWelcomeMsg = (pseudo) => {
      if (!this.state.showWelcomeMsg) {

         this.setState({
            showWelcomeMsg: true
         });

         toast.warn(`Bienvenue ${pseudo} et bonne chance!`, {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
         });
      }
   }

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

      if (this.props.userData.pseudo) {
         this.showWelcomeMsg(this.props.userData.pseudo)
      }

   };

   nextQuestion = () => {
      if (this.state.idQuestion === this.state.maxQuestions - 1) {
         this.gameOver();
      } else {
         this.setState((prevState) => ({
            idQuestion: prevState.idQuestion + 1
         }))
      }

      const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

      if (this.state.userAnswer === goodAnswer) {

         toast.success("Bravo +1 point !", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
         });

         this.setState((prevState) => ({
            score: prevState.score + 1
         }))
      } else {

            toast.error("Raté +0 !", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false
         });
      }
   };

   submitAnswer = (selectedAnswer) => {
      this.setState({
         userAnswer: selectedAnswer,
         btnDisable: false
      })
   };

   getPercent = (maxQuest, ourScore) => {
      return (ourScore / maxQuest) * 100;
   };

   gameOver = () => {
      const gradePercent = this.getPercent(this.state.maxQuestions, this.state.score);

      if (gradePercent >= 50) {
         this.setState({
            quizzLevel: this.state.quizzLevel + 1,
            percent: gradePercent,
            quizzEnd: true
         })
      } else {
         this.setState({
            percent: gradePercent,
            quizzEnd: true
         });
      }     
   };

   render() {

      const { pseudo } = this.props.userData;

      const displayOptions = this.state.options.map((option, index) => {
         return (
            <p key={index} 
            onClick={() => this.submitAnswer(option)}
            // On fait une condition afin d'appliquer le rouge + MAJ que à la question sélectionnée
            className={`answerOptions ${this.state.userAnswer === option ? "selected" : null}`}
            >{option}</p>
         )
      })

      return this.state.quizzEnd ? (
         <QuizzOver ref={this.storedDataRef} 
         levelNames={this.state.levelNames}
         score={this.state.score}
         maxQuestions={this.state.maxQuestions}
         quizzLevel={this.state.quizzLevel}
         percent={this.state.percent}
         />
      )
      : (
         <Fragment>
             <Levels />
             <ProgressBar idQuestion={this.state.idQuestion} maxQuestions={this.state.maxQuestions}/>
             <h2>{this.state.question}</h2>
             
             { displayOptions }

             <button onClick={this.nextQuestion}
             disabled={this.state.btnDisable} className="btnSubmit">

             {this.state.idQuestion < this.state.maxQuestions - 1 ? "Suivant" : "Terminer"}

             </button>
          </Fragment>
      )
           
   };
}

export default Quizz;