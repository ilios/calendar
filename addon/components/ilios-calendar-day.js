import Ember from 'ember';
import layout from '../templates/components/ilios-calendar-day';

const {run} = Ember;

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
  actions: {
    selectEvent(event){
      this.sendAction('selectEvent', event);
    }
  }
});
