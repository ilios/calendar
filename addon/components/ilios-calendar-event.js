import Ember from 'ember';
import { default as CalendarEvent } from 'el-calendar/components/calendar-event';
import layout from '../templates/components/ilios-calendar-event';
import moment from 'moment';

const {computed, Handlebars} = Ember;
const {SafeString} = Handlebars;

export default CalendarEvent.extend({
  layout,
  event: null,
  timeFormat: 'h:mma',
  classNameBindings: [':event', ':event-pos', ':ilios-calendar-event', 'event.eventClass', ':day'],
  tooltipContent: computed('event', function(){
    let str = this.get('event.location') + '<br />' +
      moment(this.get('event.startDate')).format(this.get('timeFormat')) + ' - ' +
      moment(this.get('event.endDate')).format(this.get('timeFormat')) + '<br />' +
      this.get('event.name');
  
    return str;
  }),
  
  style: computed(function() {
    let escape = Handlebars.Utils.escapeExpression;

    return new SafeString(
      `top: ${escape(this.calculateTop())}%;
       height: ${escape(this.calculateHeight())}%;
       left: ${escape(this.calculateLeft())}%;
       width: ${escape(this.calculateWidth())}%;`
    );
  }),
  
  click(){
    this.sendAction('action', this.get('event'));
  }
});
