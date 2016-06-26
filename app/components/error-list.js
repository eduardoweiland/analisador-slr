import Ember from 'ember';

const { A, Component } = Ember;

const ErrorList = Component.extend({
  errors: A()
});

ErrorList.reopenClass({
  positionalParams: ['errors']
});

export default ErrorList;
