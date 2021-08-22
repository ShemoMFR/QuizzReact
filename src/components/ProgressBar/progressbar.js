import React, { Fragment } from 'react';

/* On utilise ici le destructuring dans les props directement */

const ProgressBar = ({idQuestion, maxQuestions}) => {

    const getWidth = (totalQuestions, questionId) => {
        return (100 / totalQuestions) * questionId;
    };

    const actualQuestion = idQuestion + 1;

    const progressPercent = getWidth(maxQuestions, actualQuestion);

    return (
        <Fragment>
            <div className="percentage">
                <div className="progressPercent">{`Question : ${idQuestion + 1} / ${maxQuestions}`}</div>
                <div className="progressPercent">{`Progression : ${progressPercent}%`}</div>
            </div>
            <div className="progressBar">
                <div className="progressBarChange" style={{width: `${progressPercent}%`}}></div>
            </div>
        </Fragment>
    );
};

/* Permet de ne pas recharger le composant inutilement si iduestion et Max ne sont pas updatés */
/* Permet d'avoir une meilleure performance */

export default React.memo(ProgressBar);