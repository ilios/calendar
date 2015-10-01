import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

const {RSVP} = Ember;

moduleForComponent('ilios-calendar', 'Integration | Component | ilios calendar', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  let events = RSVP.resolve([]);
  this.set('events', events);
  let date = new Date('2015-09-30T12:00:00');
  this.set('date', date);

  this.render(hbs`{{ilios-calendar selectedDate=date selectedView='day' calendarEventsPromise=events}}`);

  assert.ok(this.$().text().trim().search(/Wednesday, September 30th 2015/) !== -1);
});
