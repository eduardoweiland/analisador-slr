import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('error-list', 'Integration | Component | error list', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{error-list}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it renders list of error messages', function(assert) {
  assert.expect(3);

  this.set('errors', ['error1', 'error2']);
  this.render(hbs`{{error-list errors=errors}}`);

  assert.equal(this.$('li').length, 2);
  assert.equal(this.$('li:first').text().trim(), 'error1');
  assert.equal(this.$('li:last').text().trim(), 'error2');
});
