import Ember from 'ember';
import layout from '../templates/components/ilios-calendar-single-event-objective-list';
import DS from 'ember-data';

const { computed, isEmpty, RSVP } = Ember;
const { Promise } = RSVP;
const { PromiseArray } = DS;

export default Ember.Component.extend({
  layout,

  domains: computed('objectives.@each.[title,domain]', function(){
    let promiseDomains = new Promise((resolve) => {
      this.get('objectives').then((objectives) => {
        if (isEmpty(objectives)) {
          resolve([]);
          return;
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

        resolve(Ember.A(domains).sortBy('title'));
      });
    });

    // Make it an ennumerable so it can be observed
    return PromiseArray.create({
      promise: promiseDomains
    });
  }),
});
