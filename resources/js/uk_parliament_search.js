'use strict';

UK_Parliament.searchTracking = function () {

  var
    addListeners = function () {
      var cardArray = document.querySelectorAll('.card__details');

      for (var i = 0; i < cardArray.length; i++) {
        var resultObject = createResultObject(cardArray, i);
        var linkNode = getLinkNode(cardArray, i);
        addResultListener(linkNode, resultObject);
      }

      return cardArray;
    },

    addResultListener = function (node, object) {
      var resultObjectInstance = object;

      node.addEventListener('click', function (e) {

        if (resultObjectInstance.resultHintCount > 0) {
          appInsights.trackEvent('resultLinkClicked', {
            url: this.href,
            hints: resultObjectInstance.resultHints
          }, {
            position: resultObjectInstance.resultPosition,
            hintCount: resultObjectInstance.resultHintCount
          });
        } else {
          appInsights.trackEvent('resultLinkClicked', {
            url: this.href
          }, {
            position: resultObjectInstance.resultPosition
          });
        }
      }, false);
    },

    createResultObject = function (cardArray, i) {
      var resultObject = {
        resultPosition: null,
        resultHints: [],
        resultHintCount: 0
      };

      var startIndex = getQueryStrings()['start_index'];
      startIndex ? resultObject.resultPosition = i + parseInt(startIndex) : resultObject.resultPosition = i + 1;

      var hintNodes = cardArray[i].querySelectorAll('.hint');

      if (hintNodes !== []) {
        resultObject.resultHints = resultHintArray(hintNodes);
        resultObject.resultHintCount = resultObject.resultHints.length;
      }

      return resultObject;
    },

    getLinkNode = function (cardArray, i) {
      var linkNodes = cardArray[i].querySelectorAll('a');

      if (linkNodes.length > 0) {
        return linkNodes[0];
      }
    },

    resultHintArray = function (hintNodes) {
      var resultHints = [];
      for (var i = 0; i < hintNodes.length; i++) {
        resultHints.push(hintNodes[i].textContent);
      }
      return resultHints;
    },

    getQueryStrings = function(url) {
      if (!url) url = window.location.search;
      var query_params = {};
      url = url.split('?')[1].split('&');
      for (var i = 0; i < url.length; i++) {
        var params = url[i].split('=');
        query_params[params[0]] = params[1];
      }
      return query_params;
    };

  return {
    addListeners: addListeners,
    addResultListener: addResultListener,
    createResultObject: createResultObject,
    getLinkNode: getLinkNode,
    resultHintArray: resultHintArray,
    getQueryStrings: getQueryStrings
  };
};
UK_Parliament.searchTracking().addListeners();
