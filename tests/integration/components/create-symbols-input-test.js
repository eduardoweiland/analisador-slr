import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { SymbolType } from 'analisador-slr/classes/symbol';

moduleForComponent('create-symbols-input', 'Integration | Component | create symbols input', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{create-symbols-input}}`);
  assert.equal(this.$('input').length, 1);
});

test('it creates symbols with specified type', function(assert) {
  assert.expect(2);

  this.set('symbolType', SymbolType.NON_TERMINAL);
  this.set('symbols', null);

  this.render(hbs`{{create-symbols-input symbolType=symbolType symbolsChanged=(action (mut symbols))}}`);
  this.$('input').val('A B').trigger('change');

  this.get('symbols').forEach((symbol) => {
    assert.equal(symbol.get('type'), SymbolType.NON_TERMINAL);
  });
});
