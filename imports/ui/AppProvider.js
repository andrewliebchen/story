import AppContext from "./AppContext";
import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import Chapters from "../api/chapters";
import Thoughts from "../api/thoughts";
import Words from "../api/words";

const AppProvider = (props) => {
  const [showMuted, setShowMuted] = useState(true);
  const data = useTracker(() => ({
    chapters: Chapters.find({}, { sort: { createdAt: -1 } }).fetch(),
    thoughts: Thoughts.find({}, { sort: { createdAt: -1 } }).fetch(),
    words: Words.find({}).fetch(),
  }));

  return (
    <AppContext.Provider
      value={{
        ...props,
        ...data,
        showMuted: showMuted,
        setShowMuted: setShowMuted,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
