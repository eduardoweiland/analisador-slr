import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('symbols-input', 'Integration | Component | symbols input', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{symbols-input}}`);
  assert.equal(this.$('input').length, 1);
});

test('it renders initial value', function(assert) {
  assert.expect(1);

  this.set('symbols', ['A', 'B', 'C']);
  this.render(hbs`{{symbols-input symbols=symbols}}`);
  assert.equal(this.$('input').val(), 'A B C');
});

test('it updates symbols array on user input', function(assert) {
  assert.expect(1);

  this.set('symbols', []);
  this.render(hbs`{{symbols-input symbols=symbols}}`);

  this.$('input').val('A B C').trigger('change');
  assert.deepEqual(this.get('symbols'), ['A', 'B', 'C']);
});

test('it ignores double spaces', function(assert) {
  assert.expect(1);

  this.set('symbols', []);
  this.render(hbs`{{symbols-input symbols=symbols}}`);

  this.$('input').val('    A   B    C  ').trigger('change');
  assert.deepEqual(this.get('symbols'), ['A', 'B', 'C']);
});
