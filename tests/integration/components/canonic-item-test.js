import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { CanonicItem, ItemMarker, Production, Symbol } from 'analisador-slr/classes';
import { SymbolType } from 'analisador-slr/classes/symbol';

moduleForComponent('canonic-item', 'Integration | Component | canonic item', {
  integration: true
});

test('it renders', function(assert) {
  let marker = ItemMarker.create();
  let S = Symbol.create({ name: 'S', type: SymbolType.NON_TERMINAL });
  let A = Symbol.create({ name: 'A', type: SymbolType.NON_TERMINAL });
  let a = Symbol.create({ name: 'a', type: SymbolType.TERMINAL });
  let p1 = Production.create({ leftSide: S, rightSide: [marker, A] });
  let p2 = Production.create({ leftSide: A, rightSide: [marker, a] });

  let canonicItem = CanonicItem.create({
    startState: 0,
    endState: 1,
    inputSymbol: 'A',
    productions: [p1, p2]
  });

  this.set('canonicItem', canonicItem);
  this.render(hbs`{{canonic-item canonicItem arrow='->'}}`);

  let dot = marker.get('name');
  let expected = `I1 = goto(I0, A) = closure() = { S -> ${dot} A, A -> ${dot} a };`;
  assert.equal(this.$().text().trim().replace(/\s+/g, ' '), expected);
});
