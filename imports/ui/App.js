import { Grid } from "theme-ui";
import AppContext from "./AppContext";
import Chapters from "./Chapters";
import React from "react";
import Thoughts from "./Thoughts";

const App = () => (
  <AppContext.Consumer>
    {(props) => (
      <Grid
        sx={{ p: 4, gap: 4, gridAutoFlow: "column", gridAutoColumns: "1fr" }}
      >
        <Chapters />
        <Thoughts />
      </Grid>
    )}
  </AppContext.Consumer>
);

export default App;
