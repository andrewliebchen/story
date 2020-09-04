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
import { wordChunks } from "split-word";
import en from "javascript-time-ago/locale/en";
import JavascriptTimeAgo from "javascript-time-ago";
import MarkdownView from "react-showdown";
import React, { useState } from "react";
import Stories from "../api/stories";
import Thoughts from "../api/thoughts";
import TimeAgo from "react-time-ago";

JavascriptTimeAgo.addLocale(en);

function App() {
  const { thoughts, story } = useTracker(() => ({
    thoughts: Thoughts.find({}, { sort: { createdAt: -1 } }).fetch(),
    story: Stories.findOne()
  }));

  const [thoughtValue, setThoughtValue] = useState("");

  return (
    <Box
      sx={{
        display: "grid",
        gridGap: 4,
        gridTemplateColumns: "1fr 400px",
        p: 4
      }}
    >
      <Box>
        {story && (
          <Box>
            <Textarea
              defaultValue={story.sourceText}
              onChange={event =>
                Stories.update(story._id, {
                  $set: { sourceText: event.target.value }
                })
              }
              placeholder="Write your story"
              mb={3}
            />
            {wordChunks(story.sourceText).map((word, i) => (
              <Box key={i}>
                <Text>{word}</Text>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Box>
        <Box>
          <Textarea
            value={thoughtValue}
            onChange={event => setThoughtValue(event.target.value)}
            mb={3}
            placeholder="Add a thought"
          />
          <Button
            variant="primary"
            onClick={() =>
              Thoughts.insert(
                {
                  value: thoughtValue,
                  createdAt: Date.now(),
                  lastUpdated: Date.now(),
                  done: false
                },
                (err, success) => success && setThoughtValue("")
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
                  children="🗑"
                  mr={2}
                  onClick={() =>
                    window.confirm(
                      "Are you sure you want to delete this Thought? This action can't be undone."
                    ) && Thoughts.remove(thought._id)
                  }
                />

                <IconButton
                  children={thought.done ? "⏮" : "✅"}
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
