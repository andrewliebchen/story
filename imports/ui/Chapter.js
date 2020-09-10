import { Box, Flex, IconButton, Text } from "theme-ui";
import en from "javascript-time-ago/locale/en";
import JavascriptTimeAgo from "javascript-time-ago";
import React from "react";
import PropTypes from "prop-types";
import Chapters from "../api/chapters";
import TimeAgo from "react-time-ago";

JavascriptTimeAgo.addLocale(en);

const Chapter = props => (
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
        {props.value}
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
            "Are you sure you want to delete this chapter? This action can't be undone."
          ) && Chapters.remove(props._id)
        }
      />
    </Flex>
  </Flex>
);

export default Chapter;
