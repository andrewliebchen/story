import {
  Box,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  Select,
  Text,
} from "theme-ui";
import { Meteor } from "meteor/meteor";
import { wordTypes } from "../utils/types";
import alpha from "color-alpha";
import Overlay from "./Overlay";
import PropTypes from "prop-types";
import React, { useState } from "react";
import spectrum from "../utils/theme";
import theme from "../utils/theme";
import Words from "../api/words";

const spectrumLabels = Object.keys(spectrum);

const Word = (props) => {
  const [active, setActive] = useState(false);
  const color = props.type
    ? wordTypes.find((word) => word.value === props.type).color
    : theme.colors.primary;

  return (
    <Flex sx={{ flexShrink: 0 }}>
      <Text
        onClick={() => setActive(true)}
        title={props.type}
        sx={{
          color: color,
          cursor: "pointer",
          m: -1,
          p: 1,
          "&:hover": {
            bg: alpha(color, 0.1),
          },
        }}
      >
        {props.value}
      </Text>
      <Text>&nbsp;</Text>

      <Overlay show={active} close={() => setActive(false)} {...props}>
        <Flex
          sx={{ mb: 3, justifyContent: "space-between", alignItems: "center" }}
        >
          <Heading>
            <i>{props.value}</i> is a...
          </Heading>
          <Flex>
            <IconButton children="⏮" />
            <IconButton children="⏭" />
            <IconButton children="❌" onClick={() => setActive(false)} />
          </Flex>
        </Flex>
        <Box sx={{ mb: 3 }}>
          {wordTypes.map((type) => {
            const isSelected = type.value === props.type;
            return (
              <Flex
                key={type.value}
                onClick={() =>
                  Meteor.call("words.update", props._id, { type: type.value })
                }
                sx={{
                  alignItems: "center",
                  bg: alpha(type.color, isSelected ? 1 : 0.2),
                  border: "5px solid transparent",
                  borderRadius: 4,
                  cursor: "pointer",
                  mt: 1,
                  p: 2,
                  "&:hover": {
                    borderColor: type.color,
                  },
                }}
              >
                <Checkbox checked={isSelected} readOnly />
                <Text>{type.value}</Text>
              </Flex>
            );
          })}
        </Box>
        <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Text>Link to</Text>
          <Box sx={{ flexGrow: 2, ml: 2 }}>
            <Select
              defaultValue={
                props.linkId &&
                props.words.find((word) => word._id === props.linkId)._id
              }
              onChange={(event) =>
                Meteor.call("words.update", props._id, {
                  linkId: event.target.value,
                })
              }
            >
              <option value={false}>None</option>
              {props.words.map((word) => (
                <option key={word._id} value={word._id}>
                  {word.value}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>
      </Overlay>
    </Flex>
  );
};

Word.propTypes = {
  _id: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.oneOf(wordTypes.map((word) => word.value)),
  color: PropTypes.string,
  words: PropTypes.array,
  linkTo: PropTypes.string,
};

export default Word;
