import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ilios-calendar-single-event', 'Integration | Component | ilios calendar single event', {
  integration: true
});

test('it renders empty', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ilios-calendar-single-event}}`);
  assert.ok(this.$().text().trim().length > 0);
});

test('setting course title changes display', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ilios-calendar-single-event courseTitle='Being a Champion'}}`);
  assert.equal(this.$().text().trim().search(/Being a Champion/), 0);
});

test('setting session title changes display', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ilios-calendar-single-event sessionTitle='Being a Champion'}}`);
  assert.equal(this.$().text().trim().search(/- Being a Champion/), 0);
});

test('setting taughtBy changes display', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ilios-calendar-single-event taughtByPhrase='A swell guy, Dr. Famous'}}`);
  assert.notEqual(this.$().text().trim().search(/A swell guy, Dr. Famous/), -1);
});

test('setting sessionIsPhrase changes display', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ilios-calendar-single-event sessionIsPhrase='This is some good stuff!'}}`);
  assert.notEqual(this.$().text().trim().search(/This is some good stuff!/), -1);
});
