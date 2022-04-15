import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

import getQuestion from "./questions";

function Question(props) {
  const { questionId, question, answers, correct, onAnswer } = props;
  // maybe handle click functionality here
  const onChange = (e) => {
    const isCorrectAnswer = e.target.value === correct;
    onAnswer(isCorrectAnswer);
  };

  return (
    <div className="questionContainer" id={questionId}>
      <div className="questionContainer__question">Q: {question}</div>
      <div className="questionContainer__answer">
        <label for={`question__${questionId}`}>Choose an answer</label>
        <select onChange={onChange}>
          {answers.map((answer) => (
            <option value={answer}>{answer}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

// 1) how do we not show the same question twice?
const MOCK_QUESTIONS = [
  {
    question:
      "What word represents the letter 'T' in the NATO phonetic alphabet?",
    answers: ["Tango", "Target", "Taxi", "Turkey"],
    correct: "Tango",
    questionId: "1822532",
  },
  {
    question: "Which American president appears on a one dollar bill?",
    answers: [
      "George Washington",
      "Thomas Jefferson",
      "Abraham Lincoln",
      "Benjamin Franklin",
    ],
    correct: "George Washington",
    questionId: "195075",
  },
];

function PlayerInfo(props) {
  const { playerName, totalCorrect, totalAnswered } = props;
  return (
    <div className="PlayerInfo">
      <span className="PlayerInfo__name">{playerName}: </span>
      <span className="PlayerInfo__score">
        {totalCorrect} / {totalAnswered}
      </span>
    </div>
  );
}

function Scoreboard(props) {
  const { playerInfos = [] } = props;
  // Limit to top three scores of players and render
  //
  return (
    <div className="Scoreboard">
      <h2 className="Scoreboard__header">Scoreboard</h2>
      <div className="Scoreboard__playerInfo">
        {playerInfos.map((playerInfo) => (
          <PlayerInfo {...playerInfo} />
        ))}
      </div>
    </div>
  );
}

const MOCK_PLAYER_INFO = [
  {
    playerName: "Fariba",
    totalCorrect: 9,
    totalAnswered: 10,
  },
  {
    playerName: "Beatrice",
    totalCorrect: 3,
    totalAnswered: 10,
  },
  {
    playerName: "Jane",
    totalCorrect: 6,
    totalAnswered: 10,
  },
  {
    playerName: "Pat",
    totalCorrect: 7,
    totalAnswered: 10,
  },
];

/**
 * @typedef PlayerInfo
 * @prop {string} name - represents name of the player
 * @prop {number} numOfCorrectAnswers - represents number of correct answers player has created
 * @prop {number} numOfQuestionsAnswered - represetns total number of questions players has answered
 */

// PlayerInfos = Array<PlayerInfos>

const LOCAL_STORAGE_KEY = "playerInfos";

function App() {
  // probably will leave question selection logic at this level
  // likely will be state
  const [questionDetails, setQuestionDetails] = useState();
  console.log("q details", questionDetails);
  // const currentPlayerScore = totalCorrect / totalAnswered;
  const [playerInfos, setPlayerInfos] = useState([]);
  // -- INSTANCES / WHEN WE WILL INTERACT WITH LOCAL STORAGE
  // 1) on app load we get window.localStorage.getItem(LOCAL_STORAGE_KEY) and then set that as our initial state
  // 2) on end: we take any users updated scores and update value in window.localStorage.setItem(LOCAL_STORAGE_KEY, newvalues)

  // STATE FOR PLAYER INFO
  const [currentPlayerName, setCurrentPlayerName] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState();
  const [numOfQuestionsAnswered, setNumOfQuestionsAnswered] = useState();

  // 3) makes sure that when a user starts, no new user can start only the player ends
  // 4) make sure questions don't show if user has not started
  // 5) make sure on end, current player info either (1) updates existing player info, or (2) adds as a new player info

  useEffect(() => {
    const previousPlayerInfos = JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
    );
    setPlayerInfos(previousPlayerInfos);

    const questionDetails = getQuestion();

    setQuestionDetails(questionDetails[0]);
  }, []);

  const onStart = () => {
    const playersPreviousInfo = playerInfos.find(
      (playerInfo) => playerInfo.name === currentPlayerName
    );

    if (playersPreviousInfo) {
      const { numOfCorrectAnswers, numOfQuestionsAnswered } =
        playersPreviousInfo;
      setNumOfCorrectAnswers(numOfCorrectAnswers);
      setNumOfQuestionsAnswered(numOfQuestionsAnswered);
    } else {
      setNumOfCorrectAnswers(0);
      setNumOfQuestionsAnswered(0);
    }

    setIsPlaying(true);
  };

  useEffect(() => {
    console.log(
      "on start",
      currentPlayerName,
      numOfCorrectAnswers,
      numOfQuestionsAnswered
    );
  }, [numOfCorrectAnswers, numOfQuestionsAnswered]);

  const onAnswer = (isCorrectAnswer) => {
    const valueToAdd = isCorrectAnswer ? 1 : 0;
    setNumOfCorrectAnswers(numOfCorrectAnswers + valueToAdd);
    setNumOfQuestionsAnswered(numOfQuestionsAnswered + 1);
    console.log("new score", numOfCorrectAnswers, numOfQuestionsAnswered);
    // TODO: update new question
  };

  return (
    <div className="App">
      <div className="QuizBee">
        <div className="gameInput">
          <input
            placeholder="Enter your name"
            onChange={(e) => setCurrentPlayerName(e.target.value)}
          />
          <button onClick={onStart}>Start</button>
          <button onClick={() => console.log("end")} disabled={!isPlaying}>
            End
          </button>
        </div>
        <div className="welcomeHeader">
          {isPlaying && <h1>Welcome {currentPlayerName}</h1>}
        </div>
        <div className="playerScoreboardInfo">
          {isPlaying && (
            <div className="playerScoreboardInfo__player">
              <PlayerInfo
                playerName={currentPlayerName}
                totalCorrect={numOfCorrectAnswers}
                totalAnswered={numOfQuestionsAnswered}
              />
            </div>
          )}
          {playerInfos && (
            <div className="playerScoreboardInfo__scoreBoard">
              <Scoreboard playerInfos={playerInfos} />
            </div>
          )}
        </div>
        {questionDetails && (
          <Question
            questionId={questionDetails.questionId}
            question={questionDetails.question}
            answers={questionDetails.answers}
            correct={questionDetails.correct}
            onAnswer={onAnswer}
          />
        )}
      </div>
    </div>
  );
}

export default App;
