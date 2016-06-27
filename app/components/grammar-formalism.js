import Ember from 'ember';

const { Component, assert } = Ember;

const GrammarFormalism = Component.extend({
  tagName: 'pre',
  classNames: ['grammar-formalism'],

  grammar: null,

  numberProductions: false,

  init() {
    this._super(...arguments);
    assert('You should pass a grammar parameter to grammar-formalism component', this.get('grammar'));
  }
});

GrammarFormalism.reopenClass({
  positionalParams: ['grammar']
});

export default GrammarFormalism;
