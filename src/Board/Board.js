import './Board.css';
import Card from "../Card/Card";
import { useRef, useState } from 'react';
import addClass from '../helpers/addClass';
import Score from '../Score/Score';
import { useEffect } from 'react';

const Board = (props) => {
    const [inProgress, setInProgress] = useState(false)
    const [score, setScore] = useState(0);
    const board = useRef();
    let firstClick = true;
    let firstCard = null;
    let flipCallbacks = [];
    let resetCallbacks = [];
    
    const cardClickHandler = (e, card) => {
        if (inProgress) return;

        if (firstCard && firstCard.id === card.id && firstCard.language === card.language) return;

        if (firstClick) {
            firstCard = card;

        } else {
            setInProgress(true);
            let matchCondition = (firstCard.id === card.id && firstCard.language !== card.language);

            if (!matchCondition) onNoMatch();

            if (matchCondition) onMatch(card.id);

            flipCallbacks.forEach(cb => cb(matchCondition));
            flipCallbacks = [];
            firstCard = null;
        }
        firstClick = !firstClick;
    } 

    const onNoMatch = () => {
        setTimeout(() => {
            setInProgress(false);
            setScore(score-5);
        }, 3000);
    }

    const onMatch = (id) => {
        setTimeout(() => {
            props.onMatchGlobal(id);
            setInProgress(false);
            setScore(score+15);
        }, 2500);
    }

    const onStartOver = () => {
        addClass(board, 'animate__fadeOutDown');
        setTimeout(() => {
            props.onStartOverGlobal();
            resetCallbacks.forEach(cb => cb());
            resetCallbacks = [];
        }, 1000);
    }

    const onRandomize = () => {
        resetCallbacks.forEach(cb => cb());
        props.onRandomizeGlobal();

    }

    const registerFlipCallback = (callback) => {
        flipCallbacks.push(callback);
    }

    const registerResetCallback = (callback) => {
        resetCallbacks.push(callback);
    }

    return (
        <div className="board animate__animated animate__fadeInDown" ref={ board }>
            <div className="board__buttons">
                <button 
                    onClick = { onRandomize }
                    disabled = { inProgress }
                >
                    randomize
                </button>

                <button 
                    onClick = { onStartOver }
                    disabled = { inProgress }
                >
                    start over
                </button>

                <Score
                    score = { score }
                />
            </div>

            <div className="board__cards">
            { 
                props.idioms.map(idiom => {
                    if (idiom.guessed) return <div key={ Math.random() } className="card card--empty"></div>

                    return (
                        <Card 
                        key = { `${idiom.id + idiom.language}` }
                        idiom = { idiom }
                        inProgress = { inProgress }
                        clickHandler = { cardClickHandler }
                        registerFlipCallback = { registerFlipCallback }
                        registerResetCallback = { registerResetCallback }
                    />
                    )
                })
            }
            </div>
        </div>
    );
}
 
export default Board;