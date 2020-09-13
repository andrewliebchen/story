import { Box, Flex, Text } from "theme-ui";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Popover from "./Popover";

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

      {active && <Popover {...props} />}
    </Flex>
  );
};

Word.propTypes = {
  _id: PropTypes.string,
  value: PropTypes.string
};

export default Word;
