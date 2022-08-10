import { useState, useRef } from 'react';
import addClass from '../helpers/addClass';
import removeClass from '../helpers/removeClass';
import setClass from '../helpers/setClass';
import './Card.css';

const Card = (props) => {
    const [showContent, setShowContent] = useState(false);
    const card = useRef();
    const idiom = props.idiom;
    const fileName = 'lemon.png';
    let firstTimer, secondTimer, thirdTimer = null;

    const flipBackwards = (match) => {
        addClass(card, (match) ? 'card--success' : 'card--failure');
        
        if (match) {
            thirdTimer = setTimeout(() => {
                addClass(card, 'card--slide')
            }, 1000);
            return;
        }

        firstTimer = setTimeout(() => {
            if (match) {
                addClass(card, 'card--slide')
                return;
            }

            addClass(card, 'card-flip--second');
            removeClass(card, 'card--failure', 'card--success');

            secondTimer = setTimeout(() => {
                removeClass(card, 'card-flip--first', 'card-flip--second');
                setShowContent(false);
            }, 1500);
        }, 1500);
    }

    const resetCard = () => {
        setShowContent(false);
        setClass(card, "card");
        clearTimeout(firstTimer)
        clearTimeout(secondTimer)
        clearTimeout(thirdTimer)
    }

    const flipForward = () => {
        addClass(card, 'card-flip--first');
    }

    const onClickHandler = (e) => {
        if (props.inProgress || showContent) return;
        setShowContent(true);
        flipForward();
        props.registerFlipCallback(flipBackwards);
        props.registerResetCallback(resetCard);
        props.clickHandler(e, { id: idiom.id, language: idiom.language });
    }

    return (
        <div 
            className="card" 
            ref={ card }
            onClick = { (e) => onClickHandler(e) }
        >
            
            { showContent && <p className="card__content">{ idiom.content }</p> }

            <img 
                className="card__image" 
                src={require(`./../assets/${fileName}`)}
                >
            </img>
        </div>
    );
}
 
export default Card;