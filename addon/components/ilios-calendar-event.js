import Ember from 'ember';
import { default as CalendarEvent } from 'el-calendar/components/calendar-event';
import layout from '../templates/components/ilios-calendar-event';
import moment from 'moment';

const { computed, Handlebars, isBlank } = Ember;
const { SafeString } = Handlebars;
const { notEmpty, any }= computed;

export default CalendarEvent.extend({
  layout,
  event: null,
  timeFormat: 'h:mma',
  classNameBindings: [':event', ':event-pos', ':ilios-calendar-event', 'event.eventClass', ':day', 'clickable:clickable'],
  tooltipContent: computed('event', function() {
    if (this.get('event') == null) {
      return '';
    }

    const location = this.get('event.location');
    const name = this.get('event.name');
    const startTime = moment(this.get('event.startDate')).format(this.get('timeFormat'));
    const endTime = moment(this.get('event.endDate')).format(this.get('timeFormat'));
    const dueThisDay = this.get('dueThisDay');
    const isILM = this.get('event.ilmSession');

    if (isILM) {
      if (location) {
        return `${location}<br />${dueThisDay}<br />${name}`;
      } else {
        return `${dueThisDay}<br />${name}`;
      }
    } else if (isBlank(location)) {
      return `TBD<br />${startTime} - ${endTime}<br />${name}`;
    } else {
      return `${location}<br />${startTime} - ${endTime}<br />${name}`;
    }
  }),
  isIlm: notEmpty('event.ilmSession'),
  isOffering: notEmpty('event.offering'),
  clickable: any('isIlm', 'isOffering'),
  
  style: computed(function() {
    if (this.get('event') == null) {
      return new SafeString('');
    }

    let escape = Handlebars.Utils.escapeExpression;

    return new SafeString(
      `top: ${escape(this.calculateTop())}%;
       height: ${escape(this.calculateHeight())}%;
       left: ${escape(this.calculateLeft())}%;
       width: ${escape(this.calculateWidth())}%;`
    );
  }),

  click(){
    if(this.get('clickable')){
      this.sendAction('action', this.get('event'));
    }
  }
});
