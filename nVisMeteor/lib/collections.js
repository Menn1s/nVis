import { Mongo } from 'meteor/mongo';

export const Todos = new Mongo.Collection("todos");
export const Services = new Mongo.Collection("Services")
export const Servers = new Mongo.Collection("Servers")
