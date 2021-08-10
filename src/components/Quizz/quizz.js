import React, { Component } from 'react';
import Levels from '../Levels/levels';
import ProgressBar from '../ProgressBar/progressbar';

class Quizz extends Component {

   render() {

    const { pseudo } = this.props.userData;
       return (
          <div>
             <Levels />
             <ProgressBar />
             <h2>Notre question Quizz</h2>
             <p className="answerOptions">Question 1</p>
             <p className="answerOptions">Question 2</p>
             <p className="answerOptions">Question 3</p>
             <p className="answerOptions">Question 4</p>
             <button className="btnSubmit">Suivant</button>
          </div> 
       )
   }
}

export default Quizz;