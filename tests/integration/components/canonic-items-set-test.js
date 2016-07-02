import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { CanonicItem, ItemMarker, Production, Sentence, Symbol } from 'analisador-slr/classes';
import { SymbolType } from 'analisador-slr/classes/symbol';

moduleForComponent('canonic-items-set', 'Integration | Component | canonic items set', {
  integration: true
});

test('it renders', function(assert) {
  let marker = ItemMarker.create();
  let S = Symbol.create({ name: 'S', type: SymbolType.NON_TERMINAL });
  let A = Symbol.create({ name: 'A', type: SymbolType.NON_TERMINAL });
  let a = Symbol.create({ name: 'a', type: SymbolType.TERMINAL });
  let p1 = Production.create({ leftSide: S, rightSide: Sentence.create({ symbols: [marker, A] }) });
  let p2 = Production.create({ leftSide: A, rightSide: Sentence.create({ symbols: [marker, a] }) });

  let canonicItem1 = CanonicItem.create({
    startState: 0,
    endState: 1,
    inputSymbol: A,
    parameters: [p1],
    productions: [p1, p2]
  });
  let canonicItem2 = CanonicItem.create({
    startState: 1,
    endState: 2,
    inputSymbol: a,
    parameters: [p2],
    productions: [p2]
  });

  this.set('canonicItems', [canonicItem1, canonicItem2]);
  this.render(hbs`{{canonic-items-set canonicItems}}`);

  assert.equal(this.$('tr').length, 2);
});
