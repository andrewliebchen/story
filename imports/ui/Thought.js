import { IconButton } from "theme-ui";
import ElementRow from "./ElementRow";
import React from "react";
import PropTypes from "prop-types";
import Thoughts from "../api/thoughts";

const Thought = props => (
  <ElementRow
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
          children={props.done ? "⏮" : "✅"}
          onClick={() =>
            Thoughts.update(props._id, {
              $set: { done: !props.isMuted, updatedAt: Date.now() }
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
