import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Symbol, { SymbolType } from 'analisador-slr/classes/symbol';

moduleForComponent('select-symbols-input', 'Integration | Component | select symbols input', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{select-symbols-input}}`);
  assert.equal(this.$('input').length, 1);
});

test('it returns a reference to the selected symbol', function(assert) {
  assert.expect(1);

  let symbol = Symbol.create({ name: 'A', type: SymbolType.NON_TERMINAL });
  this.set('availableSymbols', [symbol]);
  this.set('symbols', null);

  this.render(hbs`
    {{select-symbols-input
      availableSymbols=availableSymbols
      symbolsChanged=(action (mut symbols))}}
  `);

  this.$('input').val('A').trigger('change');
  assert.equal(this.get('symbols.0'), symbol);
});

test('it returns null for invalid symbols', function(assert) {
  assert.expect(1);

  let symbol = Symbol.create({ name: 'A', type: SymbolType.NON_TERMINAL });
  this.set('availableSymbols', [symbol]);
  this.set('symbols', null);

  this.render(hbs`
    {{select-symbols-input
      availableSymbols=availableSymbols
      symbolsChanged=(action (mut symbols))}}
  `);

  this.$('input').val('a').trigger('change');
  assert.equal(this.get('symbols.0'), null);
});

test('it returns only one symbol in single mode', function(assert) {
  assert.expect(1);

  let symbol = Symbol.create({ name: 'A', type: SymbolType.NON_TERMINAL });
  this.set('availableSymbols', [symbol]);
  this.set('symbol', null);

  this.render(hbs`
    {{select-symbols-input
      availableSymbols=availableSymbols
      single=true
      symbolChanged=(action (mut symbol))}}
  `);

  this.$('input').val('A').trigger('change');
  assert.equal(this.get('symbol'), symbol);
});
