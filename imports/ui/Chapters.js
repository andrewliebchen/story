import { Box, Button, Flex, Heading, IconButton, Input } from "theme-ui";
import { Meteor } from "meteor/meteor";
import { useKeycode } from "@accessible/use-keycode";
import AppContext from "./AppContext";
import ElementRow from "./ElementRow";
import React, { useState } from "react";
import Word from "./Word";

const Chapters = () => {
  const [value, setValue] = useState("");
  const ref = useKeycode(
    13,
    () =>
      value &&
      Meteor.call(
        "chapters.insert",
        {
          value: value,
          createdAt: Date.now(),
          lastUpdated: Date.now(),
        },
        (err, success) => success && setValue("")
      )
  );

  return (
    <AppContext.Consumer>
      {(props) => (
        <Box>
          <Heading mb={3}>Chapters</Heading>
          <Box>
            <Input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              mb={3}
              placeholder="Add a new chapter"
              ref={ref}
            />
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
