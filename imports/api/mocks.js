import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

const Mocks = new Mongo.Collection("mocks");

Meteor.methods({
  "mocks.remove"(id) {
    return Mocks.remove(id);
  },

  "mocks.insert"(args) {
    return Mocks.insert(args);
  },

  "mocks.update"(id, args) {
    return Mocks.update(id, { $set: args });
  },
});

export default Mocks;
