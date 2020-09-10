import { Box, Button, Textarea } from "theme-ui";
import PropTypes from "prop-types";
import React, { useState } from "react";

function New(props) {
  const [value, setValue] = useState("");

  return (
    <Box>
      <Textarea
        value={value}
        onChange={event => setValue(event.target.value)}
        mb={3}
        placeholder={props.placeholder}
      />
      <Button
        variant="primary"
        onClick={() =>
          props.cursor.insert(
            {
              value: value,
              createdAt: Date.now(),
              lastUpdated: Date.now()
            },
            (err, success) => {
              if (success) {
                props.clickMixin && props.clickMixin(success, value);
                setValue("");
              }
            }
          )
        }
      >
        Create
      </Button>
    </Box>
  );
}

New.propTypes = {
  clickMixin: PropTypes.func,
  cursor: PropTypes.any,
  placeholder: PropTypes.string
};

export default New;
