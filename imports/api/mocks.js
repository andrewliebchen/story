import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import jsf from "json-schema-faker";
import { mockTypes } from "../utils/types";

jsf.extend("faker", () => require("faker"));

const Mocks = new Mongo.Collection("mocks");

Meteor.methods({
  "mocks.remove"(id) {
    return Mocks.remove(id);
  },

  "mocks.insert"(type) {
    const schema = mockTypes.find((mockType) => mockType.value === type).schema;

    return jsf.resolve(schema).then((mock) =>
      Mocks.insert({
        type: type,
        data: mock,
      })
    );
  },

  "mocks.update"(id, args) {
    return Mocks.update(id, { $set: args });
  },
});

export default Mocks;
