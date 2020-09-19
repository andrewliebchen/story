import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

export default new Mongo.Collection("thoughts");

Meteor.methods({
  "thoughts.remove"(id) {
    return Thoughts.remove(id);
  },

  "thoughts.update"(id, args) {
    return Thoughts.update(id, { $set: args });
  },
});
