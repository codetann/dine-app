import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../providers/StoreProvider";

export default function useGame() {
  const history = useHistory();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { gameData, results } = useStore();
  const [isFinished, setIsFinished] = useState(false);

  // send user to the finished page when everyone is done
  useEffect(() => {
    if (results) history.push("/finished");
  }, [results]);

  useEffect(() => {
    console.log(index, gameData?.businesses.length);
    if (index >= gameData?.businesses.length) {
      setIsFinished(true);
    }
  }, [index]);

  // functions to help user
  const answerYes = () => {
    setAnswers((prevState) => [...prevState, true]);
    setIndex((prevState) => (prevState += 1));
  };
  const answerNo = () => {
    setAnswers((prevState) => [...prevState, false]);
    setIndex((prevState) => (prevState += 1));
  };

  // current business info
  const currentBusiness = gameData?.businesses[index];

  return { answerYes, answerNo, currentBusiness, isFinished, answers };
}
