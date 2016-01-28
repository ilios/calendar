import Ember from 'ember';
import layout from '../templates/components/ilios-calendar-single-event';
import moment from 'moment';

const { Component, computed } = Ember;

export default Component.extend({
  layout,
  classNames: ['ilios-calendar', 'ilios-calendar-single-event'],

  courseTitle: null,
  sessionTitle: null,
  description: null,
  offeredAtPhrase: null,
  taughtByPhrase: null,
  sessionIsPhrase: null,
  noContentPhrase: 'None',

  courseObjectivesPhrase: 'Course Objectives',
  courseLearningMaterialsPhrase: 'Course Learning Materials',
  courseObjectives: null,
  courseLearningMaterials: null,

  sessionLearningMaterialsPhrase: 'Session Learning Materials',
  sessionObjectivesPhrase: 'Session Objectives',
  sessionLearningMaterials: null,
  sessionObjectives: null,

  requiredPhrase: 'Required',

  daysToShowAlert: null,

  recentlyUpdated: computed('lastModified', {
    get() {
      const lastModifiedDate = moment(this.get('lastModified'));
      const today = moment();
      const daysSinceLastUpdate = today.diff(lastModifiedDate, 'days');

      return daysSinceLastUpdate < 6 ? true : false;
    }
  }).readOnly(),
});
