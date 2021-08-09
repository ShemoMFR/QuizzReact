import React, { useState, Fragment, useContext, useEffect } from 'react';
import { FirebaseContext } from '../Firebase'; 
import Logout from '../Logout/logout';
import Quizz from '../Quizz/quizz';

function Welcome(props) {

    const firebase = useContext(FirebaseContext);

    const [userSession, setUserSession] = useState(null);

    useEffect(() => {

    /* va vérifier l'authentification de l'utilisation ou se déco */

        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/');
        })

        return () => {
            listener();
        };
    }, [])

    return (
        userSession === null ? (
            <Fragment>
                <div className='loader'></div>
                <p className="loaderText">Loading</p>
            </Fragment>
            ) : (
            <div className="quiz-bg">
                <div className='container'>
                    <Logout />
                    <Quizz />
                </div>
            </div>
            )
    );
};


export default Welcome;