import { createContext } from "react";

type ScreenSizeContextType = {
    screenSize: "desktop" | "mobile";
    setScreenSize: (size: "desktop" | "mobile") => void;
  };

  export const ScreenSizeContext = createContext<ScreenSizeContextType>({
    screenSize: "desktop",
    setScreenSize: () => {},
  });