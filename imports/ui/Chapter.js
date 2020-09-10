import { Box, Flex, IconButton, Text } from "theme-ui";
import en from "javascript-time-ago/locale/en";
import JavascriptTimeAgo from "javascript-time-ago";
import React from "react";
import PropTypes from "prop-types";
import Chapters from "../api/chapters";
import TimeAgo from "react-time-ago";
import ElementRow from "./ElementRow";

JavascriptTimeAgo.addLocale(en);

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
