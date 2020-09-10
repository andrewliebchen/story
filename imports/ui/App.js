import { Box, Grid, Heading } from "theme-ui";
import { useTracker } from "meteor/react-meteor-data";
import Chapter from "./Chapter";
import Chapters from "../api/chapters";
import New from "./New";
import React from "react";
import Thought from "./Thought";
import Thoughts from "../api/thoughts";

function App() {
  const { thoughts, chapters, words } = useTracker(() => ({
    chapters: Chapters.find({}, { sort: { createdAt: -1 } }).fetch(),
    thoughts: Thoughts.find({}, { sort: { createdAt: -1 } }).fetch()
  }));

  return (
    <Grid sx={{ p: 4, gap: 4, gridAutoFlow: "column", gridAutoColumns: "1fr" }}>
      <Box>
        <Heading mb={3}>Chapters</Heading>
        <New cursor={Chapters} placeholder="Add a new chapter" />
        {chapters.map(chapter => (
          <Chapter key={chapter._id} {...chapter} />
        ))}
      </Box>

      <Box>
        <Heading mb={3}>Thoughts</Heading>
        <New cursor={Thoughts} placeholder="Add a new thought" />
        {thoughts.map(thought => (
          <Thought key={thought._id} {...thought} />
        ))}
      </Box>
    </Grid>
  );
}

export default App;
