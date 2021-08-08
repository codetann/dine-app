import React, { useEffect, useState } from "react";
import { SlideFade } from "@chakra-ui/transition";

export default function FadeTransition({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return (
    <SlideFade
      in={mounted}
      offsetY="20px"
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {children}
    </SlideFade>
  );
}
