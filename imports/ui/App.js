import { Box, Checkbox, Flex, Grid, Heading, IconButton, Text } from "theme-ui";
import { wordChunks } from "split-word";
import AppContext from "./AppContext";
import Chapters from "../api/chapters";
import ElementRow from "./ElementRow";
import New from "./New";
import React from "react";
import Thought from "./Thought";
import Thoughts from "../api/thoughts";
import Word from "./Word";
import Words from "../api/words";

function App() {
  return (
    <AppContext.Consumer>
      {(props) => (
        <Grid
          sx={{ p: 4, gap: 4, gridAutoFlow: "column", gridAutoColumns: "1fr" }}
        >
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
                    updatedAt: Date.now(),
                  })
                )
              }
              cursor={Chapters}
              placeholder="Add a new chapter"
            />
            {props.chapters &&
              props.chapters.map((chapter) => (
                <ElementRow
                  key={chapter._id}
                  content={
                    <Flex>
                      {props.words
                        .filter((word) => word.parentId === chapter._id)
                        .map((word) => (
                          <Word key={word._id} words={props.words} {...word} />
                        ))}
                    </Flex>
                  }
                  actions={
                    <IconButton
                      children="🗑"
                      mr={2}
                      onClick={() =>
                        window.confirm(
                          "Are you sure you want to delete this chapter? This action can't be undone."
                        ) && Chapters.remove(props._id)
                      }
                    />
                  }
                  {...chapter}
                />
              ))}
          </Box>

          <Box>
            <Heading mb={3}>Thoughts</Heading>
            <New cursor={Thoughts} placeholder="Add a new thought" />
            <Flex
              sx={{ cusor: "pointer", mt: 3 }}
              onClick={() => props.setShowMuted(!props.showMuted)}
            >
              <Checkbox checked={props.showMuted} readOnly />
              <Text>Show muted thoughts</Text>
            </Flex>
            {props.thoughts &&
              props.thoughts
                .filter((thought) => (props.showMuted ? !thought.done : true))
                .map((thought) => <Thought key={thought._id} {...thought} />)}
          </Box>
        </Grid>
      )}
    </AppContext.Consumer>
  );
}

export default App;
