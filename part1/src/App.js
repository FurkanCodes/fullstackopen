import { useState } from "react";

const Statistics = ({ good, neutral, bad, all, av, positive }) => {
  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="av" value={av} />
      <StatisticLine text="positive" value={positive} />
    </>
  );
};

const PrimaryButton = ({ children, handleClick }) => {
  return <button onClick={handleClick}>{children}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <table style={{ width: "100px" }}>
        <tbody>
          <tr>
            <th>{text}</th>
            <th>{value}</th>
          </tr>
        </tbody>
      </table>
    </>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + bad + neutral;
  const av = (good - bad) / all;
  const positive = (good / all) * 100;
  const [isFeedback, setFeedback] = useState(false);

  const updateGood = () => {
    setGood((prevState) => prevState + 1, setFeedback(true));
  };
  const updateBad = () => {
    setBad((prevState) => prevState + 1, setFeedback(true));
  };
  const updateNeutral = () => {
    setNeutral((prevState) => prevState + 1, setFeedback(true));
  };

  return (
    <div>
      <h2>Give feedback</h2>
      <PrimaryButton handleClick={updateGood}>good</PrimaryButton>
      <PrimaryButton handleClick={updateNeutral}>neutral</PrimaryButton>
      <PrimaryButton handleClick={updateBad}>bad</PrimaryButton>
      <h2>Statistics</h2>
      {isFeedback ? (
        <>
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            all={all}
            av={av}
            positive={positive}
          />
        </>
      ) : (
        <h2>no feedback</h2>
      )}
    </div>
  );
};

export default App;
