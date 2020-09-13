import React from "react";
import { Flex, Text } from "theme-ui";

const Word = props => (
  <Flex>
    <Text
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
      {props.children}
    </Text>
    <Text>&nbsp;</Text>
  </Flex>
);

export default Word;
