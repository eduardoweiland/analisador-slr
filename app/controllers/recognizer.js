import Ember from 'ember';
import { ActionType } from 'analisador-slr/classes/action';

const { Controller, computed, isEmpty, inject: { service } } = Ember;

export default Controller.extend({
  recognizer: service('recognizer'),

  sentence: '',
  recognitionSteps: Ember.A(),

  recognized: computed('recognitionSteps', 'recognitionSteps.[]', function() {
    let steps = this.get('recognitionSteps');
    if (!isEmpty(steps) && steps[steps.get('length') - 1].get('action.type') === ActionType.ACCEPT) {
      return true;
    }
    return false;
  }),

  actions: {
    recognizeSentence() {
      let steps = this.get('recognizer').recognizeSentence(this.get('sentence'));
      this.set('recognitionSteps', steps);
      return false;
    }
  }
});
