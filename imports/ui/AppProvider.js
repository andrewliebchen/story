import { useTracker } from "meteor/react-meteor-data";
import AppContext from "./AppContext";
import Chapters from "../api/chapters";
import Mocks from "../api/mocks";
import React, { useState } from "react";
import Thoughts from "../api/thoughts";
import Words from "../api/words";

const AppProvider = (props) => {
  const [selectedId, setSelectedId] = useState("");
  const [showMuted, setShowMuted] = useState(true);
  const data = useTracker(() => ({
    chapters: Chapters.find({}, { sort: { createdAt: -1 } }).fetch(),
    mocks: Mocks.find({}).fetch(),
    thoughts: Thoughts.find({}, { sort: { createdAt: -1 } }).fetch(),
    words: Words.find({}).fetch(),
  }));

  return (
    <AppContext.Provider
      value={{
        ...props,
        ...data,
        selectedId: selectedId,
        setSelectedId: setSelectedId,
        setShowMuted: setShowMuted,
        showMuted: showMuted,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
