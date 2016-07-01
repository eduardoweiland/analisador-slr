import Ember from 'ember';

const { A } = Ember;

export default Ember.Object.extend({
  /**
   * Initial state for the goto operation in this canonic item.
   *
   * @property startState
   * @type Number
   * @public
   */
  startState: null,

  /**
   * Resulting state after the goto operation with this canonic item.
   *
   * @property endState
   * @type Number
   * @public
   */
  endState: null,

  /**
   * Symbol read from the input.
   *
   * @property inputSymbol
   * @type Symbol
   * @public
   */
  inputSymbol: null,

  /**
   * Productions with item marker in this canonic item. This is the result
   * of the closure operation.
   *
   * @property productions
   * @type Production[]
   * @public
   */
  productions: A()
});
