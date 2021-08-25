import React, { Fragment, useEffect, useState } from 'react';

/****** forwardRef permet de récupérer la ref d'un enfant ****/

const QuizzOver = React.forwardRef((props, ref) => {

    const {levelNames, score, maxQuestions, quizzLevel, percent, loadLevelQuestions} = props;

    const [asked, setAsked] = useState([]);

    useEffect(() => {
        setAsked(ref.current)
    }, [ref]);

    const averageGrade = maxQuestions / 2;

    if (score < averageGrade) {
        /* Si pas la moyenne au quizz, on recharge au premier niveau */
        setTimeout(() => {
            loadLevelQuestions(quizzLevel);
        }, 3000)
    }

    const decision = score >= averageGrade ? (
        <Fragment >
            <div className="stepsBtnContainer">
                {
                    quizzLevel < levelNames.length ? 
                    (
                        <Fragment >
                            <p className="successMsg">Bravo, passez au niveau suivant !</p>
                            <button 
                            className="btnResult success"
                            onClick={()=> loadLevelQuestions(quizzLevel)}
                            >
                                Niveau Suivant 
                            </button>
                        </Fragment>
                    )
                    :
                    (
                        <Fragment >
                            <p className="successMsg">Bravo, vous êtes un expert !</p>
                            <button 
                            className="btnResult gameOver"
                            onClick={()=> loadLevelQuestions(0)}
                            >
                            Accueil
                            </button>
                        </Fragment>
                    )
                }
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussite: {percent}%</div>
                <div className="progressPercent">Note: {score}/{maxQuestions}</div>
            </div>
        </Fragment>
    )
    :
    (
        <Fragment >
            <div className="stepsBtnContainer">
                <p className="successMsg">Vous avez échoué</p>
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussite: {percent}%</div>
                <div className="progressPercent">Note: {score}/{maxQuestions}</div>
            </div>
        </Fragment>
    )

    const questionAnswer = score >= averageGrade ? (
        asked.map((question) => {
            return (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button className='btnInfo'>Infos</button>
                    </td>
                </tr>
            )
        })
    )
    :
    (
        <tr>
            <td colSpan="3">
                <div className="loader"></div>
                <p style={{textAlign: 'center', color:'red'}}>

                </p>
            </td>
        </tr>
    ) 

    return (
        <Fragment >
            
            { decision }

            <hr />
            <p>Les réponses aux questions posées: </p>
            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Question</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
});

export default React.memo(QuizzOver);