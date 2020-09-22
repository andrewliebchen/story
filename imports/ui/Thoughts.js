import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Text,
  Textarea,
} from "theme-ui";
import { Meteor } from "meteor/meteor";
import AppContext from "./AppContext";
import ElementRow from "./ElementRow";
import MarkdownView from "react-showdown";
import React, { useState } from "react";

const Thoughts = () => {
  const [value, setValue] = useState("");
  return (
    <AppContext.Consumer>
      {(props) => (
        <Box>
          <Heading mb={3}>Thoughts</Heading>
          <Box>
            <Textarea
              value={value}
              onChange={(event) => setValue(event.target.value)}
              mb={3}
              placeholder="Add a new thought"
            />
            <Flex
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Flex
                sx={{ cusor: "pointer" }}
                onClick={() => props.setShowMuted(!props.showMuted)}
              >
                <Checkbox checked={props.showMuted} readOnly />
                <Text>Show muted thoughts</Text>
              </Flex>
              <Button
                variant="primary"
                onClick={() =>
                  Meteor.call(
                    "thoughts.insert",
                    {
                      value: value,
                      createdAt: Date.now(),
                      lastUpdated: Date.now(),
                    },
                    (err, success) => success && setValue("")
                  )
                }
              >
                Create
              </Button>
            </Flex>
          </Box>

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
};

export default Thoughts;
