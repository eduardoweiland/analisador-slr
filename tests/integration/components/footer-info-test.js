import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('footer-info', 'Integration | Component | footer info', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{footer-info}}`);

  let text = this.$().text().trim();

  assert.notEqual(text.indexOf('UNISC'), -1);
  assert.notEqual(text.indexOf('Eduardo Weiland'), -1);
  assert.notEqual(text.indexOf('Guilherme Bohm'), -1);
});
