import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

const Words = new Mongo.Collection("words");

Meteor.methods({
  "words.insert"(args) {
    return Words.insert(args);
  },
});

export default Words;
