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
import Person from "./Person";
import PropTypes from "prop-types";
import React, { useState } from "react";
import spectrum from "../utils/theme";
import theme from "../utils/theme";

const spectrumLabels = Object.keys(spectrum);

const Word = (props) => {
  const [active, setActive] = useState(false);
  const color = props.type
    ? wordTypes.find((word) => word.value === props.type).color
    : theme.colors.primary;
  const mock =
    props.mockId && props.mocks.find((mock) => mock._id === props.mockId);

  return (
    <Flex sx={{ flexShrink: 0 }}>
      <Flex
        onClick={() => setActive(true)}
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
        {props.mockId ? (
          <Person title={mock.data.name} image={mock.data.avatar} size={16} />
        ) : (
          <Text title={props.type}>{props.value}</Text>
        )}
      </Flex>
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
        {props.type === "actor" && (
          <Box>
            <Text>Mock</Text>
            <Select
              defaultValue={mock && mock._id}
              onChange={(event) =>
                Meteor.call("words.update", props._id, {
                  mockId: event.target.value,
                })
              }
            >
              <option value={false}>None</option>
              {props.mocks.map((mock) => (
                <option key={mock._id} value={mock._id}>
                  {mock.data.name}
                </option>
              ))}
            </Select>
          </Box>
        )}
        <Box>
          <Text>Link to</Text>
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
      </Overlay>
    </Flex>
  );
};

Word.propTypes = {
  _id: PropTypes.string,
  color: PropTypes.string,
  linkTo: PropTypes.string,
  mocks: PropTypes.array,
  type: PropTypes.oneOf(wordTypes.map((word) => word.value)),
  value: PropTypes.string,
  words: PropTypes.array,
};

export default Word;
