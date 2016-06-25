import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('header-navbar', 'Integration | Component | header navbar', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{header-navbar}}`);
  assert.equal(this.$('.navbar').length, 1);
});
