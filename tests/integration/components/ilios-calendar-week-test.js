import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ilios-calendar-week', 'Integration | Component | ilios calendar week', {
  integration: true
});

test('it renders', function(assert) {
    assert.expect(2);
    let date = new Date('2015-09-30T12:00:00');
    this.set('date', date);

    this.render(hbs`{{ilios-calendar-week date=today}}`);
    assert.equal(this.$().text().trim().search(/^Week of September/), 0);
    assert.equal(this.$('.event').length, 0);
});
