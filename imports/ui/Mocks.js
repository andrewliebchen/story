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
  const [value, setValue] = useState(mockTypes[0].value);
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

          <Box>
            {props.mocks.map((mock) => (
              <ElementRow
                key={mock._id}
                content={
                  <Flex sx={{ alignItems: "center" }}>
                    <Image variant="avatar" src={mock.data.image} />
                    <Box ml={2}>
                      <Text sx={{ fontWeight: "bold" }}>{mock.data.name}</Text>
                      <Text>{mock.data.jobTitle}</Text>
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
