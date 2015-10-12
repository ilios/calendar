import Ember from 'ember';
import layout from '../templates/components/ilios-calendar-single-event';

export default Ember.Component.extend({
  layout,
  classNames: ['ilios-calendar', 'ilios-calendar-single-event'],
  
  title: null,
  description: null,
  offeredAtPhrase: null,
  taughtByPhrase: null,
  offeringIsAPhrase: null,
  
  coursePhrase: 'Course',
  courseObjectivesPhrase: 'Course Objectives',
  courseLearningMaterialsPhrase: 'Course Learning Materials',
  courseObjectives: null,
  courseLearningMaterials: null,
  
  sessionPhrase: 'Session',
  sessionLearningMaterialsPhrase: 'Session Learning Materials',
  sessionObjectivesPhrase: 'Session Objectives',
  sessionLearningMaterials: null,
  sessionObjectives: null,
  
  requiredPhrase: 'Required',
});
