import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
} from "theme-ui";
import { Meteor } from "meteor/meteor";
import { useKeycode } from "@accessible/use-keycode";
import AppContext from "./AppContext";
import ElementRow from "./ElementRow";
import MarkdownView from "react-showdown";
import React, { useState, useContext } from "react";

const Thoughts = () => {
  const [value, setValue] = useState("");
  const appContext = useContext(AppContext);
  const ref = useKeycode(
    13,
    () =>
      value &&
      Meteor.call(
        "thoughts.insert",
        {
          value: value,
          createdAt: Date.now(),
          lastUpdated: Date.now(),
          parentId: appContext.selectedId,
        },
        (err, success) => success && setValue("")
      )
  );

  return (
    <AppContext.Consumer>
      {(props) => (
        <Box>
          <Flex
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Heading>Thoughts</Heading>
            <Flex
              sx={{ cusor: "pointer" }}
              onClick={() => props.setShowMuted(!props.showMuted)}
            >
              <Checkbox checked={props.showMuted} readOnly />
              <Text>Show muted thoughts</Text>
            </Flex>
          </Flex>
          <Box>
            <Input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              mb={3}
              placeholder="Add a new thought"
              ref={ref}
            />
          </Box>

          {props.thoughts &&
            props.thoughts
              .filter((thought) => (props.showMuted ? !thought.done : true))
              .filter(
                (thought) =>
                  !props.selectedId || thought.parentId === props.selectedId // Will have to change this once we have a story ID
              )
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
