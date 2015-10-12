import Ember from 'ember';
import layout from '../templates/components/ilios-calendar-single-event';

export default Ember.Component.extend({
  layout,
  classNames: ['ilios-calendar', 'ilios-calendar-single-event'],
  
  courseTitle: null,
  sessionTitle: null,
  description: null,
  offeredAtPhrase: null,
  taughtByPhrase: null,
  sessionIsPhrase: null,
  
  courseObjectivesPhrase: 'Course Objectives',
  courseLearningMaterialsPhrase: 'Course Learning Materials',
  courseObjectives: null,
  courseLearningMaterials: null,
  
  sessionLearningMaterialsPhrase: 'Session Learning Materials',
  sessionObjectivesPhrase: 'Session Objectives',
  sessionLearningMaterials: null,
  sessionObjectives: null,
  
  requiredPhrase: 'Required',
});
