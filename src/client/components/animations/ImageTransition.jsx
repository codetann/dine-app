import React, { useEffect, useState } from "react";
import { Fade } from "@chakra-ui/transition";

export default function ImageTransition({ counter, children }) {
  const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   return () => setMounted(true);
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 500);

    return () => {
      setTimeout(() => {
        setMounted(false);
      }, 500);
    };
  }, [counter]);
  return (
    <Fade
      in={mounted}
      offsetX="20px"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "300px",
      }}
    >
      {mounted && children}
    </Fade>
  );
}
