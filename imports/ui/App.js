import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Select,
  Textarea,
  Text
} from "theme-ui";
import { useTracker } from "meteor/react-meteor-data";
import { wordChunks } from "split-word";
import { wordTypes } from "../utils/types";
import en from "javascript-time-ago/locale/en";
import JavascriptTimeAgo from "javascript-time-ago";
import MarkdownView from "react-showdown";
import React, { useState } from "react";
import Stories from "../api/stories";
import Thoughts from "../api/thoughts";
import Words from "../api/words";
import TimeAgo from "react-time-ago";

JavascriptTimeAgo.addLocale(en);

function App() {
  const { thoughts, story, words } = useTracker(() => ({
    thoughts: Thoughts.find({}, { sort: { createdAt: -1 } }).fetch(),
    story: Stories.findOne(),
    words: Words.find({}).fetch()
  }));

  const [thoughtValue, setThoughtValue] = useState("");

  return (
    <Grid gap={4} columns="1fr 400px" p={4}>
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
            <Button
              onClick={() => {
                const words = wordChunks(story.sourceText);
                let wordIds = words.map(word =>
                  Words.insert({ value: word, storyId: storyId })
                );

                Stories.update(story._id, {
                  $set: { wordIds: wordIds }
                });
              }}
            >
              Parse
            </Button>
            <Box mt={3}>
              {story.wordIds.map(function(id) {
                const word = words.find(word => word._id === id);
                return (
                  <Grid
                    key={word._id}
                    gap={2}
                    columns={2}
                    sx={{
                      px: 3,
                      py: 1,
                      mx: -3,
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&:hover": {
                        backgroundColor: "muted"
                      }
                    }}
                  >
                    <Text sx={{ fontSize: 3 }}>{word.value}</Text>
                    <Select>
                      {wordTypes.map(word => (
                        <option key={word} value={word}>
                          {word}
                        </option>
                      ))}
                    </Select>
                  </Grid>
                );
              })}
            </Box>
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
    </Grid>
  );
}

export default App;
