import React, { useState } from "react";
import { Box, Button, Textarea, Text } from "theme-ui";
import { useTracker } from "meteor/react-meteor-data";
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
                createdAt: Date.now()
              },
              (err, success) => success && console.log("Added")
            )
          }
        >
          Create
        </Button>
      </Box>
      <Box p={3}>
        {thoughts.map(thought => (
          <Box key={thought._id}>
            <Text>{thought.value}</Text>
            <Text variant="secondary">{thought.createdAt}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default App;
