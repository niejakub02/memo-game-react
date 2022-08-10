import './Score.css'

const Score = (props) => {
    return ( 
        <div className="score">
            <p>Score: <span className="score__points">{ props.score }</span></p>
        </div>
    );
}
 
export default Score;