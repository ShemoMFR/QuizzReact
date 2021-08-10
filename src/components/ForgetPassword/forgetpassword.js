import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

function ForgetPassword(props) {

    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const firebase = useContext(FirebaseContext);

    function handleSubmit(e) {
        e.preventDefault();

        firebase.passwordReset(email)
         .then(() => {
            setError(null);
            setSuccess(`Consultez votre email ${email} pour changer le mot de passe`);
            setEmail('');

            setTimeout(() => {
                props.history.push("/login");
            }, 5000)
        }) 
        .catch(error => {
            setError(error);
            setEmail('');
        
        /* pour error il y a la propriété error.message qui permet d'afficher le problème
        car le call back de la fonction est un objet */
        
        })
    };

    const disabled = email === '';

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className='formBoxLeftForget'>
                </div>
                    <div className='formBoxRight'>
                        <div className='formContent'>

                            { success && <span 
                            style={{
                                border: "1px solid green",
                                background: "green",
                                color: "#ffffff"
                            }}>
                            {success}
                            </span> }

                            { error && <span>{error.message}</span> }

                            <h2>Mot de passe oublié ?</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='inputBox'>
                                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" autoComplete="off" required />
                                    <label htmlFor="email">Email</label>
                                </div>         

                                <button disabled={disabled}>Récupérez</button>
                            </form>
                            <div className='linkContainer'>
                                <Link className='simpleLink' to="/login">Déjà inscrit? Connectez-vous</Link>
                            </div>
                        </div> 
                </div>
            </div>
        </div>
    );

};

export default ForgetPassword;
