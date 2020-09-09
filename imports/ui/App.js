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
import React, { useState } from "react";
import Stories from "../api/stories";
import Thoughts from "../api/thoughts";
import Words from "../api/words";
import Thought from "./Thought";

function App() {
  const { thoughts, story, words } = useTracker(() => ({
    thoughts: Thoughts.find({}, { sort: { createdAt: -1 } }).fetch(),
    story: Stories.findOne(),
    words: Words.find({}).fetch()
  }));

  const [thoughtValue, setThoughtValue] = useState("");

  return (
    <Grid gap={4} columns="1fr 400px" px={4} py={0}>
      {story && (
        <Box
          sx={{
            py: 4,
            top: 0,
            position: "sticky",
            flex: "0 0 auto",
            height: "100vh"
          }}
        >
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
              if (
                window.confirm(
                  "Are you sure you want parse the story? You might remove classifications you've already done."
                )
              ) {
                const words = wordChunks(story.sourceText);
                let wordIds = words.map(word =>
                  Words.insert({ value: word, storyId: story._id })
                );

                Stories.update(story._id, {
                  $set: { wordIds: wordIds }
                });
              }
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
                  <Text
                    sx={{
                      fontSize: 3,
                      color: word.type || "textSecondary"
                    }}
                  >
                    {word.value}
                  </Text>
                  <Select
                    value={word.type}
                    onChange={event =>
                      Words.update(word._id, {
                        $set: { type: event.target.value }
                      })
                    }
                  >
                    <option value={null}>ignore</option>
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

      <Box sx={{ py: 4 }}>
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
          <Thought key={thought._id} {...thought} />
        ))}
      </Box>
    </Grid>
  );
}

export default App;
