import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export default new Mongo.Collection("words");

Meteor.methods({
  "words.insert"(args) {
    return Words.insert(args);
  },
});
