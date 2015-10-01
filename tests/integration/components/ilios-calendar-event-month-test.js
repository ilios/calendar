import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ilios-calendar-event-month', 'Integration | Component | ilios calendar event month', {
  integration: true
});

test('no event ends up empty', function(assert) {
  assert.expect(1);
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  
  this.render(hbs`{{ilios-calendar-event-month}}`);

  assert.equal(this.$().text().trim(), '');
});
