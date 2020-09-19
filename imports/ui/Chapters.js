import { Box, Flex, Heading, IconButton } from "theme-ui";
import { Meteor } from "meteor/meteor";
import { wordChunks } from "split-word";
import AppContext from "./AppContext";
import Cursor from "../api/chapters";
import ElementRow from "./ElementRow";
import New from "./New";
import React from "react";
import Word from "./Word";

const Chapters = () => (
  <AppContext.Consumer>
    {(props) => (
      <Box>
        <Heading mb={3}>Chapters</Heading>
        <New
          clickMixin={(id, value) =>
            wordChunks(value).map((word, index) =>
              Meteor.call("words.insert", {
                value: word,
                index: index,
                parentId: id,
                createdAt: Date.now(),
                updatedAt: Date.now(),
              })
            )
          }
          cursor={Cursor}
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

export default Chapters;
