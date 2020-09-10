import { IconButton } from "theme-ui";
import React from "react";
import PropTypes from "prop-types";
import Chapters from "../api/chapters";
import ElementRow from "./ElementRow";

const Chapter = props => (
  <ElementRow
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
  value: PropTypes.string
};

export default Chapter;
