import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  Select,
  Text,
} from "theme-ui";
import { mockTypes } from "../utils/types";
import AppContext from "./AppContext";
import ElementRow from "./ElementRow";
import Person from "./Person";
import React, { useState } from "react";
import Overlay from "./Overlay";

const Mocks = () => {
  const mockTypeKeys = Object.keys(mockTypes);
  const [showOptions, setShowOptions] = useState(false);
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
                <option value="other">Other</option>
              </Select>
            </Box>
            <Button
              onClick={() =>
                value === "other"
                  ? setShowOptions(true)
                  : Meteor.call("mocks.insert", value)
              }
            >
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
          <Overlay show={showOptions} close={() => setShowOptions(false)}>
            <Flex
              sx={{
                mb: 3,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Heading>Define your mock</Heading>
              <IconButton children="❌" onClick={() => setActive(false)} />
            </Flex>
            <Flex mx={-2}>
              <Box sx={{ flexGrow: 2, mx: 2 }}>
                <Text>Key</Text>
                <Input />
              </Box>
              <Box sx={{ flexGrow: 2, mx: 2 }}>
                <Text>Value</Text>
                <Input />
              </Box>
            </Flex>
          </Overlay>
        </Box>
      )}
    </AppContext.Consumer>
  );
};

export default Mocks;
