import { Box, Flex, Text } from "theme-ui";
import PropTypes from "prop-types";
import React from "react";

const Overlay = (props) => (
  <Box sx={{ left: 0, position: "fixed", top: 0 }}>
    {props.show && (
      <Flex
        sx={{
          alignItems: "stretch",
          height: "100vh",
          justifyContent: "flex-end",
          width: "100vw",
        }}
      >
        <Box
          onClick={props.close}
          sx={{
            height: "100vh",
            position: "absolute",
            width: "100vw",
          }}
        />
        <Box
          sx={{
            bg: "white",
            borderLeft: "1px solid",
            p: 3,
            position: "relative",
            userSelect: "none",
            zIndex: 1,
            width: "50vw",
          }}
        >
          {props.children}
        </Box>
      </Flex>
    )}
  </Box>
);

Overlay.propTypes = {
  close: PropTypes.func,
  show: PropTypes.bool,
};

export default Overlay;
