import React from "react";
import { useBreakpointValue } from "@chakra-ui/media-query";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

export default function Nav() {
  const nav = useBreakpointValue({
    base: <MobileNav />,
    md: <DesktopNav />,
  });
  return <>{nav}</>;
}
