import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Select,
  Text,
} from "theme-ui";
import { mockTypes } from "../utils/types";
import AppContext from "./AppContext";
import ElementRow from "./ElementRow";
import Person from "./Person";
import React, { useState } from "react";

const Mocks = () => {
  const mockTypeKeys = Object.keys(mockTypes);
  const [value, setValue] = useState(mockTypeKeys[0]);
  return (
    <AppContext.Consumer>
      {(props) => (
        <Box>
          <Heading mb={3}>Mocks</Heading>
          <Flex
            sx={{ alignItems: "center", justifyContent: "space-between" }}
            mb={3}
          >
            <Box sx={{ flexGrow: 2, mr: 2 }}>
              <Select
                value={value}
                onChange={(event) => setValue(event.target.value)}
              >
                {mockTypeKeys.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </Box>
            <Button onClick={() => Meteor.call("mocks.insert", value)}>
              Create
            </Button>
          </Flex>

          <Box>
            {props.mocks.map((mock) => (
              <ElementRow
                key={mock._id}
                content={
                  <Person image={mock.data.avatar} title={mock.data.name} />
                }
                actions={
                  <IconButton
                    children="🗑"
                    mr={2}
                    onClick={() =>
                      window.confirm(
                        "Are you sure you want to delete this Mock? This action can't be undone."
                      ) && Meteor.call("mocks.remove", mock._id)
                    }
                  />
                }
              />
            ))}
          </Box>
        </Box>
      )}
    </AppContext.Consumer>
  );
};

export default Mocks;
