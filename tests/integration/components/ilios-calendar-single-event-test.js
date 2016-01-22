import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { isEmpty, RSVP } = Ember;
const { Promise } = RSVP;

moduleForComponent('ilios-calendar-single-event', 'Integration | Component | ilios calendar single event', {
  integration: true,
  beforeEach() {
    let objectives = new Promise((resolve) => {
      const array = Ember.A([
        {domain: 'great things', title: 'cheese'}
      ]);

      resolve(array);
    });

    this.setProperties({ courseObjectives: objectives, sessionObjectives: objectives });
  }
});

test('setting course title changes display', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ilios-calendar-single-event courseTitle='Being a Champion'
    courseObjectives=courseObjectives
    sessionObjectives=sessionObjectives
  }}`);
  assert.equal(this.$().text().trim().search(/Being a Champion/), 0);
});

test('setting session title changes display', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ilios-calendar-single-event sessionTitle='Being a Champion'
    courseObjectives=courseObjectives
    sessionObjectives=sessionObjectives
  }}`);
  assert.equal(this.$().text().trim().search(/- Being a Champion/), 0);
});

test('setting taughtBy changes display', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ilios-calendar-single-event taughtByPhrase='A swell guy, Dr. Famous'
    courseObjectives=courseObjectives
    sessionObjectives=sessionObjectives
  }}`);
  assert.notEqual(this.$().text().trim().search(/A swell guy, Dr. Famous/), -1);
});

test('setting sessionIsPhrase changes display', function(assert) {
  assert.expect(1);
  this.render(hbs`{{ilios-calendar-single-event sessionIsPhrase='This is some good stuff!'
    courseObjectives=courseObjectives
    sessionObjectives=sessionObjectives
  }}`);
  assert.notEqual(this.$().text().trim().search(/This is some good stuff!/), -1);
});

test('taughtBy does not display', function(assert) {
  assert.expect(1);

  this.render(hbs`{{ilios-calendar-single-event taughtByPhrase=''
    courseObjectives=courseObjectives
    sessionObjectives=sessionObjectives
  }}`);

  assert.ok(isEmpty(this.$('.ilios-calendar-single-event-instructors')));
});
