import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { mockTypes } from "../utils/types";

const Mocks = new Mongo.Collection("mocks");

Meteor.methods({
  "mocks.insert"(type) {
    const data = mockTypes[type];
    return Mocks.insert({ type: type, data: data });
  },

  "mocks.update"(id, args) {
    return Mocks.update(id, { $set: args });
  },
});

export default Mocks;
