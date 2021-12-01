import React, { useState } from 'react';

const Header = ({header}) => (
    <>
      <h1>
        {header}
      </h1>
    </>
  )

const Button = ({text, onClick}) => (
    <>
      <button onClick={onClick} >{text}</button>
    </>
  )

const StatisticsLine = ({text, value}) => (
    <p>{text} {value}</p>
  )

const Statistics = ({good, neutral, bad, all}) => {
  if (all === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
  <>
    <StatisticsLine text="good" value={good} />
    <StatisticsLine text="neutral" value={neutral} />
    <StatisticsLine text="bad" value={bad} />
    <StatisticsLine text="all" value={all} />
    <StatisticsLine text="average" value={(good*1 + bad*-1) / all} />
    <StatisticsLine text="positive" value={good / all *100 + " %"} />
  </>
)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header="give feedback" />
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <Header header="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={good + neutral + bad} />
      
    </div>
  )
}

export default App
