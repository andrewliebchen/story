import { Box, Checkbox, Flex, IconButton, Select, Text } from "theme-ui";
import { wordTypes } from "../utils/types";
import alpha from "color-alpha";
import Overlay from "./Overlay";
import PropTypes from "prop-types";
import React, { useState } from "react";
import spectrum from "../utils/theme";
import theme from "../utils/theme";
import Words from "../api/words";

const spectrumLabels = Object.keys(spectrum);

const Word = props => {
  const [active, setActive] = useState(false);
  const color = props.type
    ? wordTypes.find(word => word.value === props.type).color
    : theme.colors.primary;

  return (
    <Flex>
      <Text
        onClick={() => setActive(true)}
        title={props.type}
        sx={{
          color: color,
          cursor: "pointer",
          m: -1,
          p: 1,
          "&:hover": {
            bg: alpha(color, 0.1)
          }
        }}
      >
        {props.value}
      </Text>
      <Text>&nbsp;</Text>

      <Overlay show={active} close={() => setActive(false)} {...props}>
        <Flex sx={{ mb: 3, justifyContent: "space-between" }}>
          <Text>
            <b>{props.value}</b> is a...
          </Text>
          <Flex>
            <IconButton children="⏮" />
            <IconButton children="⏭" />
          </Flex>
        </Flex>
        <Box>
          {wordTypes.map(type => {
            const isSelected = type.value === props.type;
            return (
              <Flex
                key={type.value}
                onClick={() =>
                  Words.update(props._id, { $set: { type: type.value } })
                }
                sx={{
                  alignItems: "center",
                  bg: alpha(type.color, isSelected ? 1 : 0.2),
                  border: "5px solid transparent",
                  borderRadius: 4,
                  cursor: "pointer",
                  mt: 1,
                  p: 2,
                  width: 200,
                  "&:hover": {
                    borderColor: type.color
                  }
                }}
              >
                <Checkbox checked={isSelected} readOnly />
                <Text>{type.value}</Text>
              </Flex>
            );
          })}
        </Box>
      </Overlay>
    </Flex>
  );
};

Word.propTypes = {
  _id: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.oneOf(wordTypes.map(word => word.value)),
  color: PropTypes.string
};

export default Word;
