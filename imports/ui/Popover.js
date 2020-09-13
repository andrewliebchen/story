import React from "react";
import { Box, Text } from "theme-ui";

const Popover = props => (
  <Box
    sx={{
      border: "1px solid",
      bg: "white",
      bottom: "100%",
      p: 2,
      position: "absolute",
      userSelect: "none"
    }}
  >
    <Text>{props._id}</Text>
  </Box>
);

export default Popover;
