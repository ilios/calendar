import Ember from 'ember';
import { default as CalendarEvent } from 'el-calendar/components/calendar-event';
import layout from '../templates/components/ilios-calendar-event';
import moment from 'moment';

const { computed, Handlebars, isBlank } = Ember;
const { SafeString } = Handlebars;
const { notEmpty, any } = computed;

export default CalendarEvent.extend({
  layout,
  event: null,
  timeFormat: 'h:mma',
  isDay: false,
  classNameBindings: [':event', ':event-pos', ':ilios-calendar-event', 'isDay:day', 'event.eventClass', 'clickable:clickable'],
  tooltipContent: computed('event', function() {
    if (this.get('event') == null) {
      return '';
    }

    let addInstructorsToContents = function(contents, instructors) {
      const taughtByPhrase = 'Taught By'; // @todo make this translatable. [ST 2016/01/14]
      if (instructors.length) {
        contents = contents + `<br />${taughtByPhrase}: ` + instructors.join(', ');
      }
      return contents;
    };

    const location = this.get('event.location');
    const name = this.get('event.name');
    const startTime = moment(this.get('event.startDate')).format(this.get('timeFormat'));
    const endTime = moment(this.get('event.endDate')).format(this.get('timeFormat'));
    const dueThisDay = this.get('dueThisDay');
    const isILM = this.get('event.ilmSession');
    const instructors = this.get('event.instructors') || [];

    let contents;

    if (isILM) {
      if (location) {
        contents = `${location}<br />${dueThisDay}<br />${name}`;
        contents = addInstructorsToContents(contents, instructors);
      } else {
        contents = `${dueThisDay}<br />${name}`;
      }
    } else if (isBlank(location)) {
      contents = `TBD<br />${startTime} - ${endTime}<br />${name}`;
    } else {
      contents = `${location}<br />${startTime} - ${endTime}<br />${name}`;
      contents = addInstructorsToContents(contents, instructors);
    }

    return contents;
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
