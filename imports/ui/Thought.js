import { Box, Flex, IconButton, Text } from "theme-ui";
import en from "javascript-time-ago/locale/en";
import JavascriptTimeAgo from "javascript-time-ago";
import MarkdownView from "react-showdown";
import React from "react";
import PropTypes from "prop-types";
import Thoughts from "../api/thoughts";
import TimeAgo from "react-time-ago";

JavascriptTimeAgo.addLocale(en);

const Thought = props => (
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
          textDecoration: props.done && "line-through",
          flex: "auto"
        }}
      >
        <MarkdownView markdown={props.value} />
      </Text>
      <Text variant="secondary">
        Created <TimeAgo date={props.createdAt} />
      </Text>
      {props.updatedAt && (
        <Text variant="secondary">
          Updated <TimeAgo date={props.updatedAt} />
        </Text>
      )}
    </Box>
    <Flex sx={{ alignItems: "center", flex: "0 0 auto", ml: 2 }}>
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
            $set: { done: !props.done, updatedAt: Date.now() }
          })
        }
      />
    </Flex>
  </Flex>
);

Thought.propTypes = {
  _id: PropTypes.string,
  createdAt: PropTypes.number,
  updatedAt: PropTypes.number,
  value: PropTypes.string
};

export default Thought;
