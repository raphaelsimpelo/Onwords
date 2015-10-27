var renderAnnotations = require('./annotationRender');


exports.annotate = function(event) {

  var pageUri = function() {
    return {
      beforeAnnotationCreated: function(ann) {
        ann.uri = window.location.href.split("?")[0];
      }
    };
  };

  var app = new annotator.App();
  app.include(annotator.ui.main)
    .include(annotator.storage.http, {
      prefix: 'https://onwords-test-server.herokuapp.com',
      urls: {
        create: '/api/annotations',
        update: '/api/annotations/{id}',
        destroy: '/api/annotations/{id}',
        search: '/api/search'
      }
    })
   .include(pageUri)
   .include(renderAnnotations);

  app.start()
    .then(function() {
      app.annotations.load({uri: window.location.href.split("?")[0]});
    })

    chrome.runtime.onMessage.addListener(function(request) {
      if (request.message === 'tokenRemoved') {
        app.destroy();
      }
    })

}
