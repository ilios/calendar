import Ember from 'ember';
import layout from '../templates/components/ilios-calendar';
import moment from 'moment';

const {Component} = Ember;

export default Component.extend({
  layout,
  classNames: ['ilios-calendar'],
  selectedView: null,
  selectedDate: null,
  calendarEventsPromise: false,
  day: 'Day',
  week: 'Week',
  month: 'Month',
  today: 'Today',
  loadingMessage: 'Loading Events...',
  actions: {
    changeView(newView){
      this.sendAction('changeView', newView);
    },
    changeDate(newDate){
      this.sendAction('changeDate', newDate);
    },
    goForward(){
      let newDate = moment(this.get('selectedDate')).add(1, this.get('selectedView')).toDate();
      this.sendAction('changeDate', newDate);
    },
    goBack(){
      let newDate = moment(this.get('selectedDate')).subtract(1, this.get('selectedView')).toDate();
      this.sendAction('changeDate', newDate);
    },
    gotoToday(){
      let newDate = moment().toDate();
      this.sendAction('changeDate', newDate);
    },
    selectEvent(event){
      this.sendAction('selectEvent', event);
    }
  }
});
