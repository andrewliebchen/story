import { Flex, IconButton } from "theme-ui";
import Chapters from "../api/chapters";
import ElementRow from "./ElementRow";
import PropTypes from "prop-types";
import React from "react";
import Word from "./Word";

const Chapter = (props) => (
  <ElementRow
    content={
      <Flex>
        {props.words
          .filter((word) => word.parentId === props._id)
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
    {...props}
  />
);

Chapter.propTypes = {
  _id: PropTypes.string,
  createdAt: PropTypes.number,
  updatedAt: PropTypes.number,
  value: PropTypes.string,
  words: PropTypes.array,
};

export default Chapter;
