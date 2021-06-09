import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  const {handleClick, text} = props;
  
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistic = (props) => {
  const {text, value} = props;

  return (
    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
  )
}

const Statisctics = (props) => {
  const {good, bad, neutral} = props;
  const allRatings = good + bad + neutral;

  if (allRatings === 0 ) {
  return (
    <div>
    <p>No feedback given</p>
    </div>
  )
  }
  return (
    <div>
      <table>
        <tbody>
          <Statistic text={'good'} value={good}/>
          <Statistic text={'bad'} value={bad}/>
          <Statistic text={'neutral'} value={neutral}/>
          <Statistic text={'All Ratings'} value={allRatings}/>
          <Statistic text={'Average Ratings'} value={(good*1 + bad*-1 + neutral*0) / allRatings}/>
          <Statistic text={'Positive Ratings'} value={good / allRatings * 100 + ' %'}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickHandler = (currentState, setState) => setState(currentState + 1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => clickHandler(good, setGood)} text={'good'}/>
      <Button handleClick={() => clickHandler(neutral, setNeutral)} text={'neutral'}/>
      <Button handleClick={() => clickHandler(bad, setBad)} text={'bad'}/>
      
      <h1>Statistics</h1>
      <Statisctics good = {good} bad = {bad} neutral = {neutral}/>
      
    </div>
  )
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);