import { Box, Button, Flex, Heading, Textarea, Text } from "theme-ui";
import { useTracker } from "meteor/react-meteor-data";
import MarkdownRenderer from "react-markdown-renderer";
import React, { useState } from "react";
import Thoughts from "../api/thoughts";

function App() {
  const thoughts = useTracker(() => Thoughts.find({}).fetch());
  const [value, setValue] = useState("");

  return (
    <Box p={3}>
      <Box p={3}>
        <Textarea
          defaultValue={value}
          onChange={event => setValue(event.target.value)}
          mb={3}
        />
        <Button
          variant="primary"
          onClick={() =>
            Thoughts.insert(
              {
                value: value,
                createdAt: Date.now(),
                done: false
              },
              (err, success) => success && console.log("Added")
            )
          }
        >
          Create
        </Button>
      </Box>
      <Box p={3}>
        <Heading>Thoughts</Heading>
        {thoughts.map(thought => (
          <Flex key={thought._id} sx={{ alignItems: "center", mt: 3 }}>
            <Box>
              <Text variant="secondary">{thought.createdAt}</Text>
              <Text sx={{ textDecoration: thought.done && "line-through" }}>
                <MarkdownRenderer markdown={thought.value} />
              </Text>
              <Button
                children={thought.done ? "Not done" : "Done"}
                onClick={() =>
                  Thoughts.update(thought._id, {
                    $set: { done: !thought.done }
                  })
                }
              />
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
}

export default App;
