import { Box, Grid, Heading } from "theme-ui";
import { useTracker } from "meteor/react-meteor-data";
import { wordChunks } from "split-word";
import Chapter from "./Chapter";
import Chapters from "../api/chapters";
import New from "./New";
import React from "react";
import Thought from "./Thought";
import Thoughts from "../api/thoughts";
import Words from "../api/words";

function App() {
  const { chapters, thoughts, words } = useTracker(() => ({
    chapters: Chapters.find({}, { sort: { createdAt: -1 } }).fetch(),
    thoughts: Thoughts.find({}, { sort: { createdAt: -1 } }).fetch(),
    words: Words.find({}).fetch()
  }));

  return (
    <Grid sx={{ p: 4, gap: 4, gridAutoFlow: "column", gridAutoColumns: "1fr" }}>
      <Box>
        <Heading mb={3}>Chapters</Heading>
        <New
          clickMixin={(id, value) =>
            wordChunks(value).map((word, index) =>
              Words.insert({
                value: word,
                index: index,
                parentId: id,
                createdAt: Date.now(),
                updatedAt: Date.now()
              })
            )
          }
          cursor={Chapters}
          placeholder="Add a new chapter"
        />
        {chapters &&
          chapters.map(chapter => (
            <Chapter key={chapter._id} words={words} {...chapter} />
          ))}
      </Box>

      <Box>
        <Heading mb={3}>Thoughts</Heading>
        <New cursor={Thoughts} placeholder="Add a new thought" />
        {thoughts &&
          thoughts.map(thought => <Thought key={thought._id} {...thought} />)}
      </Box>
    </Grid>
  );
}

export default App;
