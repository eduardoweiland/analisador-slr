import Ember from 'ember';

const { A } = Ember;

/**
 * @class RecognitionStep
 * @extends Ember.Object
 * @module classes
 */
const RecognitionStep = Ember.Object.extend({
  /**
   * @property stack
   * @type String[]
   * @public
   */
  stack: A(),

  /**
   * @property input
   * @type String[]
   * @public
   */
  input: A(),

  /**
   * @property action
   * @type Action
   * @public
   */
  action: null
});

export default RecognitionStep;
