import { Box, Flex, IconButton, Text } from "theme-ui";
import en from "javascript-time-ago/locale/en";
import JavascriptTimeAgo from "javascript-time-ago";
import MarkdownView from "react-showdown";
import React from "react";
import PropTypes from "prop-types";
import Thoughts from "../api/thoughts";
import TimeAgo from "react-time-ago";

JavascriptTimeAgo.addLocale(en);

const ElementRow = props => (
  <Flex
    sx={{
      alignItems: "center",
      justifyContent: "space-between",
      mx: -3,
      p: 3,
      "&:hover": {
        backgroundColor: "muted"
      }
    }}
  >
    <Box>
      <Text
        sx={{
          textDecoration: props.isMuted && "line-through",
          flex: "auto"
        }}
      >
        <MarkdownView markdown={props.value} />
      </Text>
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
    </Box>
    <Flex sx={{ alignItems: "center", flex: "0 0 auto", ml: 2 }}>
      {props.actions}
    </Flex>
  </Flex>
);

ElementRow.propTypes = {
  _id: PropTypes.string,
  action: PropTypes.node,
  createdAt: PropTypes.number,
  isMuted: PropTypes.bool,
  updatedAt: PropTypes.number,
  value: PropTypes.string
};

export default ElementRow;
