import Ember from 'ember';
import layout from '../templates/components/ilios-calendar-single-event-objective-list';

const { Component, computed, isEmpty } = Ember;

export default Component.extend({
  layout,
  objectives: null,

  domains: computed('objectives.[]', function(){
    const objectives = this.get('objectives');
    if (isEmpty(objectives)) {
      return Ember.A();
    }

    let domainTitles = objectives.map(obj => {
      return obj.domain.toString();
    });

    domainTitles = Ember.A(domainTitles).uniq();

    let domains = domainTitles.map(title => {
      let domain = {
        title,
        objectives: []
      };
      let filteredObjectives = objectives.filter(obj => {
        return obj.domain.toString() === title;
      }).map(obj => {
        return obj.title;
      });
      domain.objectives = Ember.A(filteredObjectives).sortBy('title');

      return domain;
    });

    return Ember.A(domains).sortBy('title');
  }),
});
