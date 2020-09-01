import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { ThemeProvider } from "theme-ui";
import App from "/imports/ui/App";
import React from "react";
import theme from "/imports/utils/theme";

Meteor.startup(() => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
    document.getElementById("react-target")
  );
});
