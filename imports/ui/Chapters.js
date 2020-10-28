import { Box, Button, Flex, Heading, IconButton, Textarea } from "theme-ui";
import { Meteor } from "meteor/meteor";
import AppContext from "./AppContext";
import ElementRow from "./ElementRow";
import React, { useState } from "react";
import Word from "./Word";

const Chapters = () => {
  const [value, setValue] = useState("");
  return (
    <AppContext.Consumer>
      {(props) => (
        <Box>
          <Heading mb={3}>Chapters</Heading>
          <Box>
            <Textarea
              value={value}
              onChange={(event) => setValue(event.target.value)}
              mb={3}
              placeholder="Add a new chapter"
            />
            <Flex
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row-reverse",
              }}
            >
              <Button
                variant="primary"
                onClick={() =>
                  Meteor.call(
                    "chapters.insert",
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
          {props.chapters &&
            props.chapters.map((chapter) => (
              <ElementRow
                key={chapter._id}
                content={
                  <Flex>
                    {props.words
                      .filter((word) => word.parentId === chapter._id)
                      .map((word) => (
                        <Word
                          key={word._id}
                          words={props.words}
                          mocks={props.mocks}
                          {...word}
                        />
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
                      ) && Meteor.call("chapters.remove", chapter._id)
                    }
                  />
                }
                {...chapter}
              />
            ))}
        </Box>
      )}
    </AppContext.Consumer>
  );
};

export default Chapters;
