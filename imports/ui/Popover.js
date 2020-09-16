import React from "react";
import { Box, Flex, Text } from "theme-ui";
import PropTypes from "prop-types";

const Popover = props => (
  <Box sx={{ top: 0, left: 0, position: "fixed" }}>
    {props.show && (
      <Flex
        sx={{
          p: 2,
          width: "100vw",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Box
          onClick={props.close}
          sx={{
            position: "absolute",
            width: "100vw",
            height: "100vh"
          }}
        />
        <Box
          sx={{
            border: "1px solid",
            bg: "white",
            p: 2,
            userSelect: "none",
            position: "relative",
            zIndex: 1
          }}
        >
          {props.children}
        </Box>
      </Flex>
    )}
  </Box>
);

Popover.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool
};

export default Popover;
