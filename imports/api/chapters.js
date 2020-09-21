import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { wordChunks } from "split-word";
import Words from "./words";
import prepositions from "prepositions";

const Chapters = new Mongo.Collection("chapters");

Meteor.methods({
  "chapters.remove"(id) {
    return Chapters.remove(id);
  },

  "chapters.insert"(args) {
    const chapterId = Chapters.insert(args);

    wordChunks(args.value).map((word, index) => {
      const cleanWord = word.trim();
      Meteor.call("words.insert", {
        value: cleanWord,
        index: index,
        parentId: chapterId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        type: prepositions.includes(cleanWord) ? "ignore" : "none",
      });
    });

    return chapterId;
  },

  "chapters.update"(id, args) {
    return Chapters.update(id, { $set: args });
  },
});

export default Chapters;
