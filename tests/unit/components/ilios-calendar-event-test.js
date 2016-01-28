import { moduleForComponent, test } from 'ember-qunit';
import moment from 'moment';

moduleForComponent('ilios-calendar-event', 'Unit | Component | ilios calendar event', {
  unit: true
});

test('`recentlyUpdated` computed property works', function(assert) {
  const lastModified = moment().subtract(5, 'day');
  const event = { lastModified };
  const component = this.subject({ event });

  assert.ok(component.get('recentlyUpdated'), 'last modified within 5 days');

  component.set('event.lastModified', moment().subtract(7, 'day'));
  assert.notOk(component.get('recentlyUpdated'), 'last modified more than 5 days');
});
