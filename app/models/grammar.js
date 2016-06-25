import Ember from 'ember';
import Model from 'ember-data/model';
import { hasMany } from 'ember-data/relationships';

const { A } = Ember;

export default Model.extend({
  terminalSymbols: A(),
  nonTerminalSymbols: A(),
  startSymbol: null,
  productions: hasMany('production')
});
