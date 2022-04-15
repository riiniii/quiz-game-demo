import logo from './logo.svg';
import './App.css';



function Question(props) {
  const { questionId, question, answers, correct } = props;
  // maybe handle click functionality here

  return (
    <div className="questionContainer" id={questionId}>
      <div className="questionContainer__question">Q: {question}</div>
      <div className="questionContainer__answer">
        <label for={`question__${questionId}`}>Choose an answer</label>
        <select
          onChange={(e) =>
            console.log(
              `selected answer for question ${questionId}: `,
              e.target.value
            )
          }
        >
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

function App() {
  // probably will leave question selection logic at this level
  // likely will be state
  const { questionId, question, answers, correct } = MOCK_QUESTIONS[0];
  const currentPlayer = "Fariba";

  const totalCorrect = 4;
  const totalAnswered = 10;
  // const currentPlayerScore = totalCorrect / totalAnswered;

  return (
    <div className="App">
      <div className="QuizBee">
        <div className="gameInput">
          <input placeholder="Enter your name"></input>
          <button>Start</button>
          <button>End</button>
        </div>
        <div className="welcomeHeader">
          <h1>Welcome Fariba</h1>
        </div>
        <div className="playerScoreboardInfo">
          <div className="playerScoreboardInfo__player">
            <PlayerInfo
              playerName={currentPlayer}
              totalCorrect={totalCorrect}
              totalAnswered={totalAnswered}
            />
          </div>
          <div className="playerScoreboardInfo__scoreBoard">
            <Scoreboard playerInfos={MOCK_PLAYER_INFO} />
          </div>
        </div>
        <Question
          questionId={questionId}
          question={question}
          answers={answers}
          correct={correct}
        />
        <div className="score">
          Score: {totalCorrect} / {totalAnswered}
        </div>
      </div>
    </div>
  );
}

export default App;
