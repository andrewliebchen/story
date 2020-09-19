import React from "react";
import AppContext from "./AppContext";
import Cursor from "../api/thoughts";
import { Box, Checkbox, Flex, Heading, IconButton, Text } from "theme-ui";
import { Meteor } from "meteor/meteor";
import New from "./New";
import ElementRow from "./ElementRow";
import MarkdownView from "react-showdown";

const Thoughts = () => (
  <AppContext.Consumer>
    {(props) => (
      <Box>
        <Heading mb={3}>Thoughts</Heading>
        <New cursor={Cursor} placeholder="Add a new thought" />
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
    )}
  </AppContext.Consumer>
);

export default Thoughts;
