import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export default new Mongo.Collection("chapters");

Meteor.methods({
  "chapters.remove"(id) {
    return Chapters.remove(id);
  },

  "chapters.update"(id, args) {
    return Chapters.update(id, { $set: args });
  },
});
