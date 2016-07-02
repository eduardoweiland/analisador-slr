import Ember from 'ember';
import { Grammar } from 'analisador-slr/classes';

export default Ember.Service.extend({
  /**
   * Original grammar used for the analysis.
   *
   * @property grammar
   * @type Grammar
   * @public
   */
  grammar: Grammar.create(),

  parsingTable: null
});
