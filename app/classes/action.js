import Ember from 'ember';

/**
 * @enum ActionType
 */
export const ActionType = {
  SHIFT: 's',
  REDUCE: 'r',
  ACCEPT: 'a',
  DEVIATE: 'd'
};

/**
 * @class Action
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
  useProduction: null
});

export default Action;
