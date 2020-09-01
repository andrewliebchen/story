import { Box, Button, Flex, Heading, Textarea, Text } from "theme-ui";
import { useTracker } from "meteor/react-meteor-data";
import en from "javascript-time-ago/locale/en";
import MarkdownView from "react-showdown";
import React, { useState } from "react";
import Thoughts from "../api/thoughts";
import TimeAgo from "react-time-ago";
import JavascriptTimeAgo from "javascript-time-ago";

JavascriptTimeAgo.addLocale(en);

function App() {
  const thoughts = useTracker(() =>
    Thoughts.find({}, { sort: { createdAt: -1 } }).fetch()
  );
  const [value, setValue] = useState("");

  return (
    <Box p={3}>
      <Box p={3}>
        <Textarea
          defaultValue={value}
          onChange={event => setValue(event.target.value)}
          mb={3}
          placeholder="Add a thought"
        />
        <Button
          variant="primary"
          onClick={() =>
            Thoughts.insert(
              {
                value: value,
                createdAt: Date.now(),
                lastUpdated: Date.now(),
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
              <Text sx={{ textDecoration: thought.done && "line-through" }}>
                <MarkdownView markdown={thought.value} />
              </Text>
              <Text variant="secondary">
                Created <TimeAgo date={thought.createdAt} />
              </Text>
              {thought.updatedAt && (
                <Text variant="secondary">
                  Updated <TimeAgo date={thought.updatedAt} />
                </Text>
              )}
              <Button
                children={thought.done ? "Undo" : "Done"}
                onClick={() =>
                  Thoughts.update(thought._id, {
                    $set: { done: !thought.done, updatedAt: Date.now() }
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
