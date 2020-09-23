import { spectrum } from "./theme";

export const wordTypes = [
  { value: "actor", color: spectrum.green },
  { value: "action", color: spectrum.red },
  { value: "object", color: spectrum.yellow },
  { value: "modifier", color: spectrum.purple },
  { value: "ignore", color: spectrum.gray },
  { value: "none", color: spectrum.blue },
];

export const mockTypes = [
  {
    value: "profile",
    schema: {
      items: {
        type: "object",
        properties: {
          name: {
            type: "string",
            faker: "name.findName",
          },
          email: {
            type: "string",
            faker: "internet.email",
          },
        },
        required: ["name", "email"],
      },
    },
  },
];
