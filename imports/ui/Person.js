import { Box, Flex, Image, Text } from "theme-ui";
import PropTypes from "prop-types";
import React from "react";

const Person = (props) => (
  <Flex sx={{ alignItems: "center" }}>
    <Image
      variant="avatar"
      src={props.image}
      sx={{
        height: props.size,
        width: props.size,
      }}
    />
    <Box ml={1}>
      <Text>{props.title}</Text>
      <Text variant="secondary">{props.subtitle}</Text>
    </Box>
  </Flex>
);

Person.propTypes = {
  image: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default Person;
