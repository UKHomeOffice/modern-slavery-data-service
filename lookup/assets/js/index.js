'use strict';
// eslint-disable-next-line implicit-dependencies/no-implicit
require('$$theme');

var $ = require('jquery');

$.extend({
  highlight: function (node, re, nodeName, className) {
      if (node.nodeType === 3) {
          var match = node.data.match(re);
          if (match) {
              var highlight = document.createElement(nodeName || 'span');
              highlight.className = className || 'highlight';
              var wordNode = node.splitText(match.index);
              wordNode.splitText(match[0].length);
              var wordClone = wordNode.cloneNode(true);
              highlight.appendChild(wordClone);
              wordNode.parentNode.replaceChild(highlight, wordNode);
              return 1; //skip added node in parent
          }
      } else if ((node.nodeType === 1 && node.childNodes) && // only element nodes that have children
              !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
              !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
          for (var i = 0; i < node.childNodes.length; i++) {
              i += $.highlight(node.childNodes[i], re, nodeName, className);
          }
      }
      return 0;
  }
});

$.fn.highlight = function (words, options) {
  var settings = { className: 'highlight', element: 'span', caseSensitive: false, wordsOnly: false };
  $.extend(settings, options);
  
  if (words.constructor === String) {
      words = [words];
  }
  words = $.grep(words, function(word, i){
    return word != '';
  });
  words = $.map(words, function(word, i) {
    return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  });
  if (words.length == 0) { return this; };

  var flag = settings.caseSensitive ? "" : "i";
  var pattern = "(" + words.join("|") + ")";
  if (settings.wordsOnly) {
      pattern = "\\b" + pattern + "\\b";
  }
  var re = new RegExp(pattern, flag);
  
  return this.each(function () {
      $.highlight(this, re, settings.element, settings.className);
  });
};

$('#results').highlight($("#searchTerm").text());

// $('.result-table').each(function foldUpTable(index, el) {
//   $(el).hide();
//   $('<div>Show result ' + index + '</div>').click(function showTable() {
//     $(el).toggle();
//   }).insertBefore($(el));
// });
