import Ember from 'ember';
import moment from 'moment';

const { computed, isBlank } = Ember;

export default Ember.Mixin.create({
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
});
