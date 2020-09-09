import { Grid, Select, Text } from "theme-ui";
import { wordTypes } from "../utils/types";
import React from "react";
import Words from "../api/words";

const StoryWord = props => (
  <Grid
    gap={2}
    columns={2}
    sx={{
      px: 3,
      py: 1,
      mx: -3,
      alignItems: "center",
      justifyContent: "space-between",
      "&:hover": {
        backgroundColor: "muted"
      }
    }}
  >
    <Text
      sx={{
        fontSize: 3,
        color: (props.type && props.type !== "ignore") || "textSecondary"
      }}
    >
      {props.value}
    </Text>
    <Select
      value={props.type}
      onChange={event =>
        Words.update(props._id, {
          $set: { type: event.target.value }
        })
      }
    >
      <option value={null}>ignore</option>
      {wordTypes.map(word => (
        <option key={word} value={word}>
          {word}
        </option>
      ))}
    </Select>
  </Grid>
);

export default StoryWord;
