import { Box, Flex, Select, Text } from "theme-ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Popover from "./Popover";
import Words from "../api/words";
import { wordTypes } from "../utils/types";

const Word = props => {
  const [active, setActive] = useState(false);

  return (
    <Flex sx={{ position: "relative" }}>
      <Text
        onClick={() => setActive(!active)}
        sx={{
          cursor: "pointer",
          m: -1,
          p: 1,
          "&:hover": {
            bg: "primaryBg",
            color: "primary"
          }
        }}
      >
        {props.value}
      </Text>
      <Text>&nbsp;</Text>

      {active && (
        <Popover {...props}>
          <Select
            defaultValue={props.type}
            onChange={event =>
              Words.update(props._id, { $set: { type: event.target.value } })
            }
          >
            <option>Ignore</option>
            {wordTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </Popover>
      )}
    </Flex>
  );
};

Word.propTypes = {
  _id: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.oneOf(wordTypes)
};

export default Word;
