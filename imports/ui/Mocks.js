import { Box, Button, Flex, Heading, Select } from "theme-ui";
import React, { useState } from "react";
import AppContext from "./AppContext";
import { mockTypes } from "../utils/types";

const Mocks = () => {
  const [value, setValue] = useState(mockTypes[0].value);
  console.log(value);
  return (
    <AppContext.Consumer>
      {(props) => (
        <Box>
          <Heading mb={3}>Mocks</Heading>
          <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ flexGrow: 2, mr: 2 }}>
              <Select
                value={value}
                onChange={(event) => setValue(event.target.value)}
              >
                {mockTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.value}
                  </option>
                ))}
              </Select>
            </Box>
            <Button onClick={() => Meteor.call("mocks.insert", value)}>
              Create
            </Button>
          </Flex>
        </Box>
      )}
    </AppContext.Consumer>
  );
};

export default Mocks;
