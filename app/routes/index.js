import Ember from 'ember';
import { Grammar } from 'analisador-slr/classes';

export default Ember.Route.extend({
  model() {
    return Grammar.create();
  }
});
