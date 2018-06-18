'use strict';

module.exports = {
  name: 'ember-g-map',

  included: function(app, parentAddon) {
    var target = (parentAddon || app);
    target.import('vendor/addons.css');

    var gMapOptions = target.options.gMap || {};
    var extensions = gMapOptions.extensions || [];
    for (var i = 0; i < extensions.length; i++) {
      var extension = extensions[i];
      if (extension === 'clustering') {
        app.import(app.bowerDirectory + '/markerclustererplus/src/markerclusterer.js');
      }
    }
  },

  contentFor: function(type, config) {
    var content = '';

    if (type === 'head') {
      let src = '//maps.googleapis.com/maps/api/js';
      let gMapConfig = config['g-map'] || {};
      let params = [];

      if (gMapConfig.key) {
        params.push(`key=${encodeURIComponent(gMapConfig.key)}`);
      }

      if (gMapConfig.version) {
        params.push(`v=${encodeURIComponent(gMapConfig.version)}`);
      }

      if (gMapConfig.client) {
        params.push(`client=${encodeURIComponent(gMapConfig.client)}`);
      }

      if (gMapConfig.channel) {
        params.push(`channel=${encodeURIComponent(gMapConfig.channel)}`);
      }

      if (gMapConfig.libraries && gMapConfig.libraries.length) {
        params.push(`libraries=${encodeURIComponent(gMapConfig.libraries.join(','))}`);
      }

      if (gMapConfig.language) {
        params.push(`language=${encodeURIComponent(gMapConfig.language)}`);
      }

      if (gMapConfig.protocol) {
        src = `${gMapConfig.protocol}:${src}`;
      }

      src = `${src}?${params.join('&')}`;
      content = `<script type="text/javascript" src="${src}"></script>`;

      if (gMapConfig.exclude) {
        content = '';
      }
    }

    return content;
  }
};
