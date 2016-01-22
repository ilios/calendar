import { moduleForComponent, test } from 'ember-qunit';
import moment from 'moment';
import hbs from 'htmlbars-inline-precompile';

let getEvent = function(){
  return {
    startDate: moment('1984-11-11').toDate(),
    endDate: moment('1984-11-12').toDate(),
    name: "Cheramie is born",
    location: 'Lancaster, CA',
  };
};

moduleForComponent('ilios-calendar-multiday-event', 'Integration | Component | ilios calendar multiday event', {
  integration: true
});

test('event displays correctly', function(assert) {
  let event = getEvent();
  this.set('event', event);
  assert.expect(4);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ilios-calendar-multiday-event event=event}}`);
  
  assert.equal(this.$().text().search(/11\/11\/84/), 0);
  assert.equal(this.$().text().search(/11\/12\/84/), 19);
  assert.equal(this.$().text().search(/Cheramie is born/), 40);
  assert.equal(this.$().text().search(/Lancaster, CA/), 60);
  
});

test('action fires on click', function(assert) {
  let event = getEvent();
  event.offering = 1;
  
  this.set('event', event);
  assert.expect(2);
  this.render(hbs`{{ilios-calendar-multiday-event event=event action='handleAction'}}`);
  assert.ok(this.$().text().search(/Cheramie is born/) > 0);
  this.on('handleAction', (value) => {
    assert.deepEqual(event, value);
  });
  
  this.$('.clickable').click();
});

test('action does not fire for scheduled events', function(assert) {
  let event = getEvent();
  
  this.set('event', event);
  assert.expect(1);
  this.render(hbs`{{ilios-calendar-multiday-event event=event action='handleAction'}}`);
  assert.ok(this.$().text().search(/Cheramie is born/) > 0);
  this.on('handleAction', () => {
    //this should never get called
    assert.ok(false);
  });
  
  this.$('.clickable').click();
});
