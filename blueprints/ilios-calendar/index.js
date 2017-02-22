/*eslint-env node*/
/* global require, module */

module.exports = {
  description: 'Add a project dep for ember-font-awesome',

  normalizeEntityName: function() {
    // allows us to run ember -g ilios-frontend and not blow up
    // because ember cli normally expects the format
    // ember generate <entitiyName> <blueprint>
  },

  afterInstall: function() {
    return this.addAddonToProject('ember-font-awesome');
  },

};
