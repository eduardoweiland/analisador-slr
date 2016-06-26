import Ember from 'ember';

const { A } = Ember;

export default Ember.Object.extend({
  terminalSymbols: A(),
  nonTerminalSymbols: A(),
  startSymbol: null,
  productions: A()
});
