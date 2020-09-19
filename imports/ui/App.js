import { Box, Checkbox, Flex, Grid, Heading, IconButton, Text } from "theme-ui";
import { Meteor } from "meteor/meteor";
import { wordChunks } from "split-word";
import AppContext from "./AppContext";
import Chapters from "./Chapters";
import ElementRow from "./ElementRow";
import MarkdownView from "react-showdown";
import New from "./New";
import React from "react";
import Thoughts from "../api/thoughts";
import Word from "./Word";

const App = () => (
  <AppContext.Consumer>
    {(props) => (
      <Grid
        sx={{ p: 4, gap: 4, gridAutoFlow: "column", gridAutoColumns: "1fr" }}
      >
        <Chapters />
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
              .map((thought) => (
                <ElementRow
                  key={thought._id}
                  content={
                    <Text
                      sx={{
                        textDecoration: thought.done && "line-through",
                        flex: "auto",
                      }}
                    >
                      <MarkdownView markdown={thought.value} />
                    </Text>
                  }
                  isMuted={props.done}
                  actions={
                    <>
                      <IconButton
                        children="🗑"
                        mr={2}
                        onClick={() =>
                          window.confirm(
                            "Are you sure you want to delete this Thought? This action can't be undone."
                          ) && Meteor.call("thoughts.remove", thought._id)
                        }
                      />
                      <IconButton
                        children={thought.done ? "🛑" : "✅"}
                        onClick={() =>
                          Meteor.call("thoughts.update", thought._id, {
                            done: !thought.done,
                            updatedAt: Date.now(),
                          })
                        }
                      />
                    </>
                  }
                  {...thought}
                />
              ))}
        </Box>
      </Grid>
    )}
  </AppContext.Consumer>
);

export default App;
