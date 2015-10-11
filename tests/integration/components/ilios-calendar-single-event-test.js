import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ilios-calendar-single-event', 'Integration | Component | ilios calendar single event', {
  integration: true
});

test('it renders empty', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ilios-calendar-single-event}}`);
  assert.equal(this.$().text().trim().search(/Course/), 0);
});

test('setting title changes display', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ilios-calendar-single-event title='Being a Champion'}}`);
  assert.equal(this.$().text().trim().search(/Being a Champion/), 0);
});

test('setting coursePhrase changes display', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ilios-calendar-single-event coursePhrase='Taco Tuesday'}}`);
  assert.equal(this.$().text().trim().search(/Taco Tuesday/), 0);
});

test('setting taughtBy changes display', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ilios-calendar-single-event taughtByPhrase='A swell guy, Dr. Famous'}}`);
  assert.notEqual(this.$().text().trim().search(/A swell guy, Dr. Famous/), -1);
});

test('setting offeringIsAPhrase changes display', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ilios-calendar-single-event offeringIsAPhrase='This is some good stuff!'}}`);
  assert.notEqual(this.$().text().trim().search(/This is some good stuff!/), -1);
});

test('setting sessionPhrase changes display', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ilios-calendar-single-event sessionPhrase='Taco Wednesday'}}`);
  assert.notEqual(this.$().text().trim().search(/Taco Wednesday/), -1);
});
