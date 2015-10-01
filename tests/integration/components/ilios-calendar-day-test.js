import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ilios-calendar-day', 'Integration | Component | ilios calendar day', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);
  let today = new Date('2015-09-30');
  this.set('today', today);
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ilios-calendar-day date=today}}`);
  //Date input is Wednesday, Septrmber 30th.  Should be the first string
  assert.equal(this.$().text().trim().search(/^Wednesday/), 0);
  assert.equal(this.$('.event').length, 0);
  
});
