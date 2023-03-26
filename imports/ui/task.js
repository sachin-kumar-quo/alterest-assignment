import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './task.html';

Template.task.helpers({
    isOwner() {
      return this.owner === Meteor.userId();
    },
  });

Template.task.events({
  'click .toggle-checked'() {
    Meteor.call('tasks.setChecked', this.item._id, !this.item.checked);
  },
  'click .delete'() {
    Meteor.call('tasks.remove', this.item._id);
    },
  'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this.item._id, !this.item.private);
  },
});