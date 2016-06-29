import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { Grammar, Production, Symbol } from 'analisador-slr/classes';
import { SymbolType } from 'analisador-slr/classes/symbol';

moduleForComponent('grammar-formalism', 'Integration | Component | grammar formalism', {
  integration: true
});

const S = Symbol.create({name: 'S', type: SymbolType.NON_TERMINAL});
const a = Symbol.create({name: 'a', type: SymbolType.TERMINAL});
const grammar = Grammar.create({
  nonTerminalSymbols: [S],
  terminalSymbols: [a],
  startSymbol: S,
  productions: [
    Production.create({
      leftSide: S,
      rightSide: [a]
    }),
    Production.create({
      leftSide: S,
      rightSide: [a, S]
    })
  ]
});

test('it renders', function(assert) {
  assert.expect(6);

  this.set('grammar', grammar);
  this.render(hbs`{{grammar-formalism grammar}}`);

  let lines = this.$().text().trim().split('\n');
  let definition = lines.shift();

  assert.equal(definition, 'G = ({ S }, { a }, P, S)');
  assert.equal(lines.length, 4);
  assert.equal(lines[0].trim(), 'P = {');
  assert.equal(lines[1].trim(), 'S \u2192 a');
  assert.equal(lines[2].trim(), 'S \u2192 a S');
  assert.equal(lines[3].trim(), '}');
});

test('it renders numbered productions', function(assert) {
  assert.expect(6);

  this.set('grammar', grammar);
  this.render(hbs`{{grammar-formalism grammar numberProductions=true}}`);

  let lines = this.$().text().trim().split('\n');
  let definition = lines.shift();

  assert.equal(definition, 'G = ({ S }, { a }, P, S)');
  assert.equal(lines.length, 4);
  assert.equal(lines[0].trim(), 'P = {');
  assert.equal(lines[1].trim(), '(0)  S \u2192 a');
  assert.equal(lines[2].trim(), '(1)  S \u2192 a S');
  assert.equal(lines[3].trim(), '}');
});

test('it renders custom symbols', function(assert) {
  assert.expect(6);

  this.set('grammar', grammar);
  this.render(hbs`{{grammar-formalism grammar grammarSymbol='CUSTOM1' productionsSymbol='CUSTOM2'}}`);

  let lines = this.$().text().trim().split('\n');
  let definition = lines.shift();

  assert.equal(definition, 'CUSTOM1 = ({ S }, { a }, CUSTOM2, S)');
  assert.equal(lines.length, 4);
  assert.equal(lines[0].trim(), 'CUSTOM2 = {');
  assert.equal(lines[1].trim(), 'S \u2192 a');
  assert.equal(lines[2].trim(), 'S \u2192 a S');
  assert.equal(lines[3].trim(), '}');
});
