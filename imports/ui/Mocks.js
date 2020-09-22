import { Box, Button, Flex, Heading, Select } from "theme-ui";
import React from "react";
import AppContext from "./AppContext";
import { mockTypes } from "../utils/types";

const Mocks = () => {
  return (
    <AppContext.Consumer>
      {(props) => (
        <Box>
          <Heading mb={3}>Mocks</Heading>
          <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ flexGrow: 2, mr: 2 }}>
              <Select>
                {mockTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </Select>
            </Box>
            <Button>Create</Button>
          </Flex>
        </Box>
      )}
    </AppContext.Consumer>
  );
};

export default Mocks;
