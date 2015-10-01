import Ember from 'ember';
import { default as CalendarEvent } from 'el-calendar/components/calendar-event';
import layout from '../templates/components/ilios-calendar-event-month';
import moment from 'moment';

const {computed, Handlebars} = Ember;
const {SafeString} = Handlebars;

export default CalendarEvent.extend({
  layout,
  event: null,
  timeFormat: 'h:mma',
  classNameBindings: [':event', ':event-pos', ':ilios-calendar-event', 'event.eventClass', ':month-event'],
  tooltipContent: computed('event', function(){
    let str = this.get('event.location') + '<br />' +
      moment(this.get('event.startDate')).format(this.get('timeFormat')) + ' - ' +
      moment(this.get('event.endDate')).format(this.get('timeFormat')) + '<br />' +
      this.get('event.name');
  
    return str;
  }),
  style: computed(function() {
    return new SafeString('');
  }),
  click(){
    this.sendAction('action', this.get('event'));
  }
});
