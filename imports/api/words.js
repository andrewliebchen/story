import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

const Words = new Mongo.Collection("words");

Meteor.methods({
  "words.insert"(args) {
    return Words.insert(args);
  },

  "words.update"(id, args) {
    return Words.update(id, { $set: args });
  },
});

export default Words;
