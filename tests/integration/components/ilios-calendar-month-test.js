import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ilios-calendar-month', 'Integration | Component | ilios calendar month', {
  integration: true
});

test('month displays', function(assert) {
  assert.expect(2);
  let date = new Date('2015-09-30T12:00:00');
  this.set('date', date);

  this.render(hbs`{{ilios-calendar-month date=date}}`);
  //Date input is Wednesday, Septrmber 30th.  Should be the first string
  assert.equal(this.$().text().trim().search(/^September 2015/), 0);
  assert.equal(this.$('.event').length, 0);
});

test('clicking on a day fires the correct event', function(assert) {
  assert.expect(3);
  let date = new Date('2015-09-30T12:00:00');
  this.set('date', date);

  this.render(hbs`{{ilios-calendar-month
    date=date
    changeDate='changeDate'
    changeView='changeView'
  }}`);
  this.on('changeDate', newDate => {
    assert.ok(newDate instanceof Date);
    assert.ok(newDate.toString().search(/Sun Aug 30/) === 0);
  });
  this.on('changeView', newView => {
    assert.equal(newView, 'day');
  });
  this.$('.day .clickable').eq(0).click();
});
