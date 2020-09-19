import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

const Thoughts = new Mongo.Collection("thoughts");

Meteor.methods({
  "thoughts.remove"(id) {
    return Thoughts.remove(id);
  },

  "thoughts.insert"(args) {
    return Thoughts.insert(args);
  },

  "thoughts.update"(id, args) {
    return Thoughts.update(id, { $set: args });
  },
});

export default Thoughts;
