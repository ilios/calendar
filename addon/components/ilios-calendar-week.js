import Ember from 'ember';
import moment from 'moment';
import layout from '../templates/components/ilios-calendar-week';

const {computed, run} = Ember;

export default Ember.Component.extend({
  classNames: ['ilios-calendar-week'],
  layout: layout,
  date: null,
  calendarEvents: [],
  weekOf: computed('selectedDate', function(){
    return moment(this.get('selectedDate')).startOf('week').format('MMMM Do YYYY');
  }),
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
