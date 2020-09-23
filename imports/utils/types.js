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
        image: {
          type: "string",
          faker: "image.avatar",
        },
        jobTitle: {
          type: "string",
          faker: "name.jobTitle",
        },
      },
      required: ["name", "email", "image", "jobTitle"],
    },
  },
];
