import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { Grammar } from 'analisador-slr/classes';

moduleForComponent('grammar-input', 'Integration | Component | grammar input', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  this.set('grammar', Grammar.create());
  this.render(hbs`{{grammar-input grammar}}`);

  assert.equal(this.$('.panel-alphabet .panel-heading h4').text().trim(), 'Alfabeto');
  assert.equal(this.$('.panel-productions .panel-heading h4').text().trim(), 'Regras de produção');
});

test('can add a new production', function(assert) {
  assert.expect(3);

  this.set('grammar', Grammar.create());
  this.render(hbs`{{grammar-input grammar}}`);

  assert.equal(this.$('button.add-production').length, 1, 'button to add productions exists');

  this.$('button.add-production').click();
  assert.equal(this.get('grammar.productions.length'), 1, 'new production added to grammar object');
  assert.equal(this.$('.panel-productions .production-input').length, 1, 'new production added to screen');
});
