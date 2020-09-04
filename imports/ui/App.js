import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Textarea,
  Text
} from "theme-ui";
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
    <Box
      sx={{
        display: "grid",
        gridGap: 3,
        gridTemplateColumns: "1fr 400px",
        p: 3
      }}
    >
      <Box>
        <Textarea placeholder="Write your story" sx={{ height: "50vh" }} />
      </Box>
      <Box>
        <Box>
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
          <Heading mt={3}>Thoughts</Heading>
          {thoughts.map(thought => (
            <Flex
              key={thought._id}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                mx: -3,
                p: 3,
                "&:hover": {
                  backgroundColor: "muted"
                }
              }}
            >
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
              </Box>
              <Flex sx={{ alignItems: "center" }}>
                <IconButton
                  mr={2}
                  onClick={() =>
                    window.confirm(
                      "Are you sure you want to delete this Thought? This action can't be undone."
                    ) && Thoughts.remove(thought._id)
                  }
                >
                  🗑
                </IconButton>
                <Button
                  children={thought.done ? "Open" : "Resolve"}
                  onClick={() =>
                    Thoughts.update(thought._id, {
                      $set: { done: !thought.done, updatedAt: Date.now() }
                    })
                  }
                />
              </Flex>
            </Flex>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
