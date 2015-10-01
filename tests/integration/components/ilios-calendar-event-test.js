import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ilios-calendar-event', 'Integration | Component | ilios calendar event', {
  integration: true
});

test('empty event is empty display', function(assert) {
  assert.expect(1);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ilios-calendar-event}}`);

  assert.equal(this.$().text().trim(), '');
});
