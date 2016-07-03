import Ember from 'ember';

const { assert, isEmpty } = Ember;

/**
 * @class ActionType
 * @module classes
 * @submodule action
 */
export const ActionType = {
  /**
   * @property SHIFT
   * @type String
   * @static
   * @final
   */
  SHIFT: 's',

  /**
   * @property REDUCE
   * @type String
   * @static
   * @final
   */
  REDUCE: 'r',

  /**
   * @property ACCEPT
   * @type String
   * @static
   * @final
   */
  ACCEPT: 'a',

  /**
   * @property DEVIATE
   * @type String
   * @static
   * @final
   */
  DEVIATE: 'd'
};

/**
 * @class Action
 * @extends Ember.Object
 * @module classes
 */
const Action = Ember.Object.extend({
  /**
   * Action type.
   *
   * @property type
   * @type ActionType
   * @public
   */
  type: null,

  /**
   * State to which transition after this action. Used with action types
   * `SHIFT` and `DEVIATE`.
   *
   * @property toState
   * @type Number
   * @public
   */
  toState: null,

  /**
   * Production used to perform the reduction. Used with action type `REDUCE`.
   *
   * @property useProduction
   * @type Production
   * @public
   */
  useProduction: null,

  init() {
    this._super(...arguments);
    assert('You mus specify a type for the action', !isEmpty(this.get('type')));
  }
});

export default Action;
