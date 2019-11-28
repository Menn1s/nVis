import { Template } from 'meteor/templating';
import { Todos } from '../lib/collections.js';
import { Services  } from '../lib/collections.js';
import { Servers } from '../lib/collections.js';
import './main.html';


Session.set("sortOrder", 1);

Template.serverList.helpers({
  servers: function () {
    return Servers.find({});
    },
  services: function() {
    return Services.find({});
  },
  isSameIP: function(a, b) {
    return a == b;
  },
  existingProgress: function() {
    return Servers.findOne({_id: this._id}).isInProgress;
  }
})

Servers.update({_id: this._id},{$set: {clicks: 0}});
Template.serverList.events({
  "click #progressBox": function(){
    var existingProgress = Servers.findOne({_id: this._id}).isInProgress;
    //var existingProgress = true;
    Servers.update({_id: this._id},{$set: {isInProgress: !existingProgress}});
    console.log("you did the clickity");
  },
  "click #cycleDiv": function(){
    console.log("please work");
    var clicks = Servers.findOne({_id: this._id}).clicks;
    if (clicks  == null){
        Servers.update({_id: this._id},{$set: {clicks: 0}});
    }
    var clicks = Servers.findOne({_id: this._id}).clicks;
    switch(clicks){
      case 0:
        Servers.update({_id: this._id},{$set: {clicks: clicks+1}});
        Servers.update({_id: this._id},{$set: {isInProgress: true}});
        Servers.update({_id: this._id},{$set: {isPopped: false}});
        Servers.update({_id: this._id},{$set: {needHelp: false}});
        break;
      case 1:
        Servers.update({_id: this._id},{$set: {clicks: clicks+1}});
        Servers.update({_id: this._id},{$set: {isInProgress: false}});
        Servers.update({_id: this._id},{$set: {isPopped: true}});
        Servers.update({_id: this._id},{$set: {needHelp: false}});
        break;
      case 2:
        Servers.update({_id: this._id},{$set: {clicks: clicks+1}});
        Servers.update({_id: this._id},{$set: {isInProgress: false}});
        Servers.update({_id: this._id},{$set: {isPopped: false}});
        Servers.update({_id: this._id},{$set: {needHelp: true}});
        break;
      case 3:
        Servers.update({_id: this._id},{$set: {clicks: 0}});
        Servers.update({_id: this._id},{$set: {isInProgress: false}});
        Servers.update({_id: this._id},{$set: {isPopped: false}});
        Servers.update({_id: this._id},{$set: {needHelp: false}});
        break;

    }
  }
});

Template.servicesList.helpers({
  services: function () {
    return Services.find({});
  },
});

Template.todosList.helpers({
  todos: function () {
    return Todos.find({}, {sort: {createdAt: Session.get("sortOrder")}});
  }
});

Template.todosList.events({
  "click .add-todo": function () {
    Todos.insert({
      label: "Click added todo",
      createdAt: new Date()
    })
  },
  "click #reverse-sort": function () {
    Session.set("sortOrder", Session.get("sortOrder") * -1);
  },
  "submit #todo-form": function (event) {
    event.preventDefault();

    var todo = {
      label: $(event.target).find('[name=label]').val(),
      createdAt: new Date()
    }
    Todos.insert(todo);
  }
});

Template.todo.events({
  "click input": function () {
    var isDone = Todos.findOne({_id: this._id}).done;
    Todos.update({_id: this._id}, {$set: {done: !isDone}});
    console.log("wtfffffffff")
  },
  "click .delete": function () {
    Todos.remove({_id: this._id});
  }
});

Template.todo.helpers({
  done: function () {
    var isDone = Todos.findOne({_id: this._id}).done;
    return isDone;
  }
})






