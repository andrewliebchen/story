import { Meteor } from "meteor/meteor";
import Thoughts from "/imports/api/thoughts";

Meteor.startup(() => {
  // // If the Links collection is empty, add some data.
  // if (LinksCollection.find().count() === 0) {
  //   insertLink({
  //     title: 'Do the Tutorial',
  //     url: 'https://www.meteor.com/tutorials/react/creating-an-app'
  //   });
  //
  //   insertLink({
  //     title: 'Follow the Guide',
  //     url: 'http://guide.meteor.com'
  //   });
  //
  //   insertLink({
  //     title: 'Read the Docs',
  //     url: 'https://docs.meteor.com'
  //   });
  //
  //   insertLink({
  //     title: 'Discussions',
  //     url: 'https://forums.meteor.com'
  //   });
  // }
});
