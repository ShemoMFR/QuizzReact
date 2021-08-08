import React, { useRef, useEffect, useState, Fragment } from 'react';
import {Link} from 'react-router-dom';
/* Fragment permet de ne pas utiliser de DIV inutile pour englober les btn */
/* le useRef permet d'intérargir avec un élement du DOM */
function Landing() {

    const [btn, setBtn] = useState(false);

    const refWolverine = useRef(null);

    useEffect(() => {

        refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
        refWolverine.current.classList.remove("startingImg");
        setBtn(true);
        }, 1000);

    }, []);

    function setLeftImg() {
        refWolverine.current.classList.add("leftImg");
    };

    function setRightImg() {
        refWolverine.current.classList.add("rightImg");
    };

    function clearImg() {
        if (refWolverine.current.classList.contains("leftImg")) {
            /* contains permet de savoir si l'élément contient une classe */
            refWolverine.current.classList.remove("leftImg");
        } else if (refWolverine.current.classList.contains("rightImg")) {
            refWolverine.current.classList.remove("rightImg");
        }
    }

    const displayBtn = btn && (
        <Fragment>
            <div onMouseOver={setLeftImg} onMouseOut={clearImg} className='leftBox'>
            <Link to='/signup'> 
                <button className="btn-welcome">Inscription</button>
            </Link>
            </div>
            <div onMouseOver={setRightImg} onMouseOut={clearImg} className='rightBox'>
            <Link to='/login'> 
                <button className="btn-welcome">Connexion</button>
            </Link>
            </div>
        </Fragment>
    )




    return (
        <main ref={refWolverine} className="welcomePage">
            {displayBtn}
        </main>
    )

};

export default Landing;