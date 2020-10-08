import { Meteor } from "meteor/meteor";
import { mockTypes } from "../utils/types";
import { Mongo } from "meteor/mongo";

const Mocks = new Mongo.Collection("mocks");

Meteor.methods({
  "mocks.insert"(type) {
    const data = mockTypes[type];
    return Mocks.insert({ type: type, data: data });
  },

  "mocks.update"(id, args) {
    return Mocks.update(id, { $set: args });
  },

  "mocks.remove"(id) {
    return Mocks.remove(id);
  },
});

export default Mocks;
