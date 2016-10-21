/*eslint-env node*/
'use strict';

module.exports = {
  isDevelopingAddon: function() {
    return false;
  },
  name: 'ilios-calendar',
  //needed for scss to get pushed up to parent app
  included: function(app) {
    this._super.included(app);
  }
};
