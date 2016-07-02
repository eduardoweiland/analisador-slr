import Ember from 'ember';

const { A } = Ember;

const RecognitionStep = Ember.Object.extend({
  stack: A(),

  input: A(),

  action: null
});

export default RecognitionStep;
