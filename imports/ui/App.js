import { Box, Button, Grid, Heading, Textarea } from "theme-ui";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import Chapters from "../api/chapters";
import Thoughts from "../api/thoughts";
import Thought from "./Thought";
import StoryWord from "./StoryWord";
import Chapter from "./Chapter";
import New from "./New";

function App() {
  const { thoughts, chapters, words } = useTracker(() => ({
    chapters: Chapters.find({}, { sort: { createdAt: -1 } }).fetch(),
    thoughts: Thoughts.find({}, { sort: { createdAt: -1 } }).fetch()
  }));

  return (
    <Grid gap={4} columns="1fr 400px" px={4} py={0}>
      <Box
        sx={{
          py: 4,
          top: 0,
          position: "sticky",
          flex: "0 0 auto",
          height: "100vh"
        }}
      >
        <Heading mb={3}>Chapters</Heading>
        <New cursor={Chapters} placeholder="Add a new chapter" />
        {chapters.map(chapter => (
          <Chapter key={chapter._id} {...chapter} />
        ))}
      </Box>

      <Box sx={{ py: 4 }}>
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
