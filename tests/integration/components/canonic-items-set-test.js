import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('canonic-items-set', 'Integration | Component | canonic items set', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{canonic-items-set}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#canonic-items-set}}
      template block text
    {{/canonic-items-set}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
