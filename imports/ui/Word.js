import { Box, Flex, Select, Text } from "theme-ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Popover from "./Popover";
import Words from "../api/words";
import { wordTypes } from "../utils/types";
import spectrum from "../utils/theme";
import alpha from "color-alpha";
import theme from "../utils/theme";

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
            bg: alpha(color, 0.1),
            color: "primary"
          }
        }}
      >
        {props.value}
      </Text>
      <Text>&nbsp;</Text>

      <Popover show={active} close={() => setActive(false)} {...props}>
        <Select
          defaultValue={props.type}
          onChange={event =>
            Words.update(props._id, { $set: { type: event.target.value } })
          }
        >
          <option value="">ignore</option>
          {wordTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.value}
            </option>
          ))}
        </Select>
      </Popover>
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
