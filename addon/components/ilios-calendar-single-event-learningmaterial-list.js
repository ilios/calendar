import Ember from 'ember';
import layout from '../templates/components/ilios-calendar-single-event-learningmaterial-list';

const {computed} = Ember;

export default Ember.Component.extend({
  layout: layout,
  learningMaterials: [],
  requiredPhrase: null,
  proxiedLearningMaterials: computed('learningMaterials.[]', function(){
    return this.get('learningMaterials').map(lm => {
      let icon;
      if(lm.type === 'link'){
        icon = 'fa-link';
      } else if(lm.type === 'citation'){
        icon = 'fa-paragraph';
      } else {
        icon = 'fa-file';
        if(lm.mimetype.search(/pdf/) !== -1){
          icon = 'fa-file-pdf-o';
        }
        if(lm.mimetype.search(/ppt|keynote|pps|ppx/) !== -1){
          icon = 'fa-file-powerpoint-o';
        }
        if(lm.mimetype.search(/mp4|mpg|mpeg|mov/) !== -1){
          icon = 'fa-file-movie-o';
        }
        if(lm.mimetype.search(/wav|mp3|aac|flac/) !== -1){
          icon = 'fa-file-audio-o';
        }
      }
      lm.icon = icon;
      
      return lm;
    });
  })
});
