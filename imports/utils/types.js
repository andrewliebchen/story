import { spectrum } from "./theme";
import faker from "faker";

export const componentTypes = [
  {
    value: "Button",
  },
  {
    value: "Input",
  },
  {
    value: "Textarea",
  },
  {
    value: "Heading",
  },
  {
    value: "Text",
  },
];

export const mockTypes = {
  profile: faker.helpers.contextualCard(),
};

export const wordTypes = [
  { value: "actor", color: spectrum.green },
  { value: "action", color: spectrum.red },
  { value: "object", color: spectrum.yellow },
  { value: "modifier", color: spectrum.purple },
  { value: "ignore", color: spectrum.gray },
  { value: "none", color: spectrum.blue },
];
