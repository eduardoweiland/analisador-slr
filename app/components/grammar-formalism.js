import Ember from 'ember';

const { Component, assert } = Ember;

const GrammarFormalism = Component.extend({
  tagName: 'pre',
  classNames: ['grammar-formalism'],

  /**
   * Configures the symbol used to display the grammar formalism.
   *
   * @property grammarSymbol
   * @type {String}
   * @default 'G'
   * @public
   */
  grammarSymbol: 'G',

  /**
   * Configures the symbol used to display the set of production rules for
   * in the grammar.
   *
   * @property productionsSymbol
   * @type {String}
   * @default 'P'
   * @public
   */
  productionsSymbol: 'P',

  /**
   * Configures if the productions should be numbered (starting from zero).
   *
   * @property numberProductions
   * @type {Boolean}
   * @default false
   * @public
   */
  numberProductions: false,

  grammar: null,

  init() {
    this._super(...arguments);
    assert('You should pass a grammar parameter to grammar-formalism component', this.get('grammar'));
  }
});

GrammarFormalism.reopenClass({
  positionalParams: ['grammar']
});

export default GrammarFormalism;
