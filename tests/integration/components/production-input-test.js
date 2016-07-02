import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { Production, Sentence, Symbol } from 'analisador-slr/classes';
import { SymbolType } from 'analisador-slr/classes/symbol';

moduleForComponent('production-input', 'Integration | Component | production input', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  let S = Symbol.create({ name: 'S', type: SymbolType.NON_TERMINAL });
  let a = Symbol.create({ name: 'a', type: SymbolType.TERMINAL });
  let production = Production.create({ leftSide: S, rightSide: Sentence.create({ symbols: [a] }) });

  this.set('production', production);
  this.render(hbs`{{production-input production}}`);

  assert.equal(this.$('input').length, 2, 'inputs for left side and right side were rendered');
  assert.equal(this.$('input:first').val(), 'S', 'left side is initialized with correct value');
  assert.equal(this.$('input:last').val(), 'a', 'right side is initialized with correct value');
});

test('updates production object on user input', function(assert) {
  assert.expect(2);

  let S = Symbol.create({ name: 'S', type: SymbolType.NON_TERMINAL });
  let A = Symbol.create({ name: 'A', type: SymbolType.NON_TERMINAL });
  let a = Symbol.create({ name: 'a', type: SymbolType.TERMINAL });
  let b = Symbol.create({ name: 'b', type: SymbolType.TERMINAL });
  let production = Production.create({ leftSide: S, rightSide: Sentence.create({ symbols: [a] }) });

  this.set('production', production);
  this.set('nonTerminalSymbols', [S, A]);
  this.set('terminalSymbols', [a, b]);

  this.render(hbs`
    {{production-input production nonTerminalSymbols=nonTerminalSymbols terminalSymbols=terminalSymbols}}
  `);

  this.$('input:first').val('A').trigger('change');
  this.$('input:last').val('b').trigger('change');

  assert.equal(production.get('leftSide'), A, 'left side updated on user input');
  assert.equal(production.get('rightSide.symbols.0'), b, 'right side updated on user input');
});

test('triggers "remove" action on remove button click', function(assert) {
  assert.expect(1);

  this.set('onRemove', () => {
    assert.ok(true, 'remove action was triggered');
  });

  this.render(hbs`{{production-input remove=onRemove}}`);
  this.$('button').click();
});
