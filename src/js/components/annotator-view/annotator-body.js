var React = require('react');
var AnnotationList = require('./annotationList');

var AnnotatorBody = React.createClass({
  deleteAnn: function(ann) {
    
  },

  getInitialState: function() {
    return {
      annotations: []
    }
  },

  componentWillMount: function() {
    var self = this;
    var uri = window.location.href.split("?")[0];
    chrome.storage.local.get(uri, function(object) {
      console.log('inside annotator body', object);
      if (object[uri]) {
        self.setState({annotations: object[uri]});
      }
    })
    chrome.storage.onChanged.addListener(function(changes) {
      console.log('annotator body, storage updated', changes[uri]);
      if (changes[uri].newValue) {
        self.setState({annotations: changes[uri].newValue});
      }
    })
  },

  render: function() {
    return (
      <div id='annotator-body-container'>
        <AnnotationList annotations={this.state.annotations}/>
      </div>
    );
  }
});

module.exports = AnnotatorBody;
