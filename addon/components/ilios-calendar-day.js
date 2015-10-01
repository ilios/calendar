import Ember from 'ember';
import layout from '../templates/components/ilios-calendar-day';

const {computed, run} = Ember;

export default Ember.Component.extend({
  classNames: ['ilios-calendar-month'],
  layout: layout,
  date: null,
  calendarEvents: [],
  didInsertElement(){
    run.next(() => {
      this.$(".el-calendar .week").scrollTop(500);
    });
  },
});
