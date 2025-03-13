import { createContext, useState } from "react";
import runChat from "../app/config/Gemini";

export const Context = createContext<any>(null);

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [input, setInput] = useState<string>("");
  const [recentPrompt, setRecentPrompt] = useState<string>("");
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultData, setResultData] = useState<string>("");

  const onSent = async () => {
    setLoading(true);
    setShowResults(true);
    setRecentPrompt(input);
    setPrevPrompts((prev) => [...prev, input]);

    const response = await runChat(input);
    setResultData(response);
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    prevPrompts,
    showResults,
    loading,
    resultData,
    onSent,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
