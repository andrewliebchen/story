import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { wordChunks } from "split-word";
import Words from "./words";

const Chapters = new Mongo.Collection("chapters");

Meteor.methods({
  "chapters.remove"(id) {
    return Chapters.remove(id);
  },

  "chapters.insert"(args) {
    const chapterId = Chapters.insert(args);

    wordChunks(args.value).map((word, index) =>
      Meteor.call("words.insert", {
        value: word,
        index: index,
        parentId: chapterId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      })
    );

    return chapterId;
  },

  "chapters.update"(id, args) {
    return Chapters.update(id, { $set: args });
  },
});

export default Chapters;
