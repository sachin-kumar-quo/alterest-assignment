import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import React from 'react';
import ReactDOM from 'react-dom';

import { Tasks } from '../api/tasks.js';

import './task.js';
import './body.html';
import HelloWorld from './components/HelloWorld.jsx';
import List from './components/List.jsx';
import InputComponent from './components/InputComponent.jsx';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('tasks');
});

Template.body.helpers({
  HelloWorld() {
    return HelloWorld;
  },
  List() {
    return List
  },
  InputComponent() {
    return InputComponent;
  },
    tasks() {
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
          return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
        }
        return Tasks.find({}, { sort: { createdAt: -1 } });
    },
    incompleteCount() {
        return Tasks.find({ checked: { $ne: true } }).count();
      },
});

Template.body.events({
    'submit .new-task'(event) {
      event.preventDefault();
      const target = event.target;
      const text = target.text.value;
      Meteor.call('tasks.insert', text);
      target.text.value = '';
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
      },
  });