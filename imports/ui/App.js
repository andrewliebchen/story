import { Box, Button, Grid, Heading, Textarea } from "theme-ui";
import { useTracker } from "meteor/react-meteor-data";
import { wordChunks } from "split-word";
import React, { useState } from "react";
import Chapters from "../api/chapters";
import Thoughts from "../api/thoughts";
import Words from "../api/words";
import Thought from "./Thought";
import StoryWord from "./StoryWord";
import Chapter from "./Chapter";

function App() {
  const { thoughts, chapters, words } = useTracker(() => ({
    chapters: Chapters.find({}, { sort: { createdAt: -1 } }).fetch(),
    thoughts: Thoughts.find({}, { sort: { createdAt: -1 } }).fetch(),
    words: Words.find({}).fetch()
  }));

  const [chapterValue, setChapterValue] = useState("");
  const [thoughtValue, setThoughtValue] = useState("");

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
        <Textarea
          value={chapterValue}
          onChange={event => setChapterValue(event.target.value)}
          mb={3}
          placeholder="Add a chapter"
        />
        <Button
          variant="primary"
          onClick={() =>
            Chapters.insert(
              {
                value: chapterValue,
                createdAt: Date.now(),
                lastUpdated: Date.now()
              },
              (err, success) => success && setChapterValue("")
            )
          }
        >
          Create
        </Button>
        {chapters.map(chapter => (
          <Chapter key={chapter._id} {...chapter} />
        ))}
        {/* <Box mt={3}>
          {story.wordIds.map(function(id) {
            const word = words.find(word => word._id === id);
            return <StoryWord key={word._id} {...word} />;
          })}
        </Box> */}
      </Box>

      <Box sx={{ py: 4 }}>
        <Heading mb={3}>Thoughts</Heading>
        <Textarea
          value={thoughtValue}
          onChange={event => setThoughtValue(event.target.value)}
          mb={3}
          placeholder="Add a thought"
        />
        <Button
          variant="primary"
          onClick={() =>
            Thoughts.insert(
              {
                value: thoughtValue,
                createdAt: Date.now(),
                lastUpdated: Date.now(),
                done: false
              },
              (err, success) => success && setThoughtValue("")
            )
          }
        >
          Create
        </Button>
        {thoughts.map(thought => (
          <Thought key={thought._id} {...thought} />
        ))}
      </Box>
    </Grid>
  );
}

export default App;
