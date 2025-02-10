import { SelectedElementContextType } from "@/types/types";
import { createContext } from "react";

export const SelectedElementContext = createContext<SelectedElementContextType>({
    selectedElement: undefined,
    setSelectedElement: () => {}
})