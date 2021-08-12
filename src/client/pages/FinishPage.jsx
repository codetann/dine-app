import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthPage from "../components/layout/AuthPage";
import FadeTransition from "../components/animations/FadeTransition";
import { useFinish } from "../hooks";
import { Button } from "@chakra-ui/react";
import ResultTable from "../components/table/ResultTable";

export default function FinishPage() {
  const history = useHistory();
  const { results, resetAll } = useFinish();

  useEffect(() => {
    return () => {
      resetAll();
    };
  }, []);

  const handleQuit = () => history.push("/dashboard");

  return (
    <AuthPage>
      <FadeTransition>
        <ResultTable results={results} />
        <Button onClick={handleQuit} colorScheme="purple">
          Quit
        </Button>
      </FadeTransition>
    </AuthPage>
  );
}
