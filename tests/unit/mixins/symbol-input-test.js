import Ember from 'ember';
import SymbolInputMixin from 'analisador-slr/mixins/symbol-input';
import { module, test } from 'qunit';

module('Unit | Mixin | symbol input');

// Replace this with your real tests.
test('it works', function(assert) {
  let SymbolInputObject = Ember.Object.extend(SymbolInputMixin);
  let subject = SymbolInputObject.create();
  assert.ok(subject);
});
