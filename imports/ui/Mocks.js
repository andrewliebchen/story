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
import React, { useState } from "react";

const Mocks = () => {
  const mockTypeKeys = Object.keys(mockTypes);
  const [value, setValue] = useState(mockTypeKeys[0]);
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
                  <Flex sx={{ alignItems: "center" }}>
                    <Image variant="avatar" src={mock.data.avatar} />
                    <Box ml={2}>
                      <Text>{mock.data.name}</Text>
                    </Box>
                  </Flex>
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
