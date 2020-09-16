import { IconButton, Text } from "theme-ui";
import ElementRow from "./ElementRow";
import React from "react";
import PropTypes from "prop-types";
import Thoughts from "../api/thoughts";
import MarkdownView from "react-showdown";

const Thought = props => (
  <ElementRow
    content={
      <Text
        sx={{
          textDecoration: props.isMuted && "line-through",
          flex: "auto"
        }}
      >
        <MarkdownView markdown={props.value} />
        {props.content}
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
            ) && Thoughts.remove(props._id)
          }
        />
        <IconButton
          children={props.done ? "🛑" : "✅"}
          onClick={() =>
            Thoughts.update(props._id, {
              $set: { done: !props.done, updatedAt: Date.now() }
            })
          }
        />
      </>
    }
    {...props}
  />
);

Thought.propTypes = {
  _id: PropTypes.string,
  createdAt: PropTypes.number,
  updatedAt: PropTypes.number,
  value: PropTypes.string
};

export default Thought;
