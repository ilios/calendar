import Ember from 'ember';
import { default as CalendarEvent } from 'el-calendar/components/calendar-event';
import layout from '../templates/components/ilios-calendar-event';
import moment from 'moment';

const { computed, Handlebars, isBlank, isArray } = Ember;
const { SafeString } = Handlebars;
const { notEmpty, any } = computed;

export default CalendarEvent.extend({
  layout,
  event: null,
  timeFormat: 'h:mma',
  isDay: false,
  classNameBindings: [
    ':event',
    ':event-pos',
    ':ilios-calendar-event',
    'isDay:day',
    'event.eventClass',
    'clickable:clickable',
    'isIlm'
  ],
  taughtByPhrase: 'Taught by',
  courseTitlePhrase: 'Course',
  multiplePhrase: 'Multiple',
  etAlPhrase: 'et al.',
  tooltipContent: computed('event', function() {
    if (this.get('event') == null) {
      return '';
    }

    let addLocationToContents = function(contents, location) {
      if (! isBlank(location)) {
        contents = contents + `${location}<br />`;
      }
      return contents;
    };

    let addInstructorsToContents = function(contents, instructors, taughtByPhrase, etAlPhrase) {
      if (! instructors.length) {
        return contents;
      }

      if (3 > instructors.length) {
        contents = contents + `<br />${taughtByPhrase} ` + instructors.join(', ');
      } else {
        contents = contents + `<br />${taughtByPhrase} ` + instructors.slice(0, 2).join(', ') + ` ${etAlPhrase}`;
      }
      return contents;
    };

    let addCourseTitleToContents = function(contents, courseTitle, courseTitlePhrase) {
      if (courseTitle) {
        contents = contents + `<br />${courseTitlePhrase}: ${courseTitle}`;
      }
      return contents;
    };

    const location = this.get('event.location') || '';
    const name = this.get('event.name');
    const startTime = moment(this.get('event.startDate')).format(this.get('timeFormat'));
    const endTime = moment(this.get('event.endDate')).format(this.get('timeFormat'));
    const dueThisDay = this.get('dueThisDay');
    const instructors = this.get('event.instructors') || [];
    const courseTitle = this.get('event.courseTitle');
    const isMulti = this.get('event.isMulti');
    const taughtByPhrase = this.get('taughtByPhrase');
    const multiplePhrase = this.get('multiplePhrase');
    const courseTitlePhrase = this.get('courseTitlePhrase');
    const etAlPhrase = this.get('etAlPhrase');
    let contents = '';

    if (this.get('isIlm')) {
      if (! isMulti) {
        contents = addLocationToContents(contents, location);
      }
      contents = contents + `ILM - ${dueThisDay}<br />${name}`;
      if (! isMulti) {
        contents = addInstructorsToContents(contents, instructors, taughtByPhrase, etAlPhrase);
      }
      contents = addCourseTitleToContents(contents, courseTitle, courseTitlePhrase);
      if (isMulti) {
        contents = contents + `<br />, ${multiplePhrase}`;
      }
    } else if (this.get('isOffering')) {
      if (! isMulti) {
        contents = addLocationToContents(contents, location);
      }
      contents = contents + `${startTime} - ${endTime}<br />${name}`;
      if (! isMulti) {
        contents = addInstructorsToContents(contents, instructors, taughtByPhrase, etAlPhrase);
      }
      contents = addCourseTitleToContents(contents, courseTitle, courseTitlePhrase);
      if (isMulti) {
        contents = contents + `<br />, ${multiplePhrase}`;
      }
    } else { // 'TBD' event
      contents = `TBD<br />${startTime} - ${endTime}<br />${name}`;
    }

    return contents;
  }),
  isIlm: notEmpty('event.ilmSession'),
  isOffering: notEmpty('event.offering'),
  clickable: any('isIlm', 'isOffering'),

  formattedInstructors: computed(function() {
    let instructors = this.get('event.instructors');
    if (! isArray(instructors) || ! instructors.length) {
      return '';
    }
    if (3 > instructors.length) {
      return instructors.join(', ');
    } else {
      return instructors.slice(0, 2).join(', ') + ' ' + this.get('etAlPhrase');
    }
  }),

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

  daysToShowAlert: null,

  recentlyUpdated: computed('event.lastModified', {
    get() {
      const lastModifiedDate = moment(this.get('event.lastModified'));
      const today = moment();
      const daysSinceLastUpdate = today.diff(lastModifiedDate, 'days');

      return daysSinceLastUpdate < 6 ? true : false;
    }
  }).readOnly(),

  click(){
    if(this.get('clickable')){
      this.sendAction('action', this.get('event'));
    }
  }
});
