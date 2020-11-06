import { Box, Flex, IconButton, Text } from "theme-ui";
import en from "javascript-time-ago/locale/en";
import JavascriptTimeAgo from "javascript-time-ago";
import MarkdownView from "react-showdown";
import React from "react";
import PropTypes from "prop-types";
import Thoughts from "../api/thoughts";
import TimeAgo from "react-time-ago";

JavascriptTimeAgo.addLocale(en);

const ElementRow = (props) => (
  <Flex
    onClick={props.onClick}
    sx={{
      alignItems: "center",
      justifyContent: "space-between",
      mx: -3,
      p: 3,
      backgroundColor: props.selected && "rgba(0, 0, 255, 0.05)",
      "&:hover": {
        backgroundColor: props.selected ? "rgba(0, 0, 255, 0.1)" : "muted",
      },
    }}
  >
    <Box>
      {props.content}
      {props.createdAt && (
        <Text variant="secondary">
          Created <TimeAgo date={props.createdAt} />
        </Text>
      )}
      {props.updatedAt && (
        <Text variant="secondary">
          Updated <TimeAgo date={props.updatedAt} />
        </Text>
      )}
      {props.parentId && (
        <Text variant="secondary">Parent: {props.parentId}</Text>
      )}
    </Box>
    <Flex sx={{ alignItems: "center", flex: "0 0 auto", ml: 2 }}>
      {props.actions}
    </Flex>
  </Flex>
);

ElementRow.propTypes = {
  actions: PropTypes.node,
  content: PropTypes.node,
  createdAt: PropTypes.number,
  isMuted: PropTypes.bool,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

export default ElementRow;
