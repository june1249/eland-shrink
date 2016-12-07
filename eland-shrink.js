angular.module('eland-shrink', [])
.directive('headerShrink', function($document, $rootScope) {
  var fadeAmt;

  var shrink = function(header, content, amt, max) {
    amt = Math.min(max, amt);
    fadeAmt = 1 - amt / max;
    ionic.requestAnimationFrame(function() {
      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
      for(var i = 0, j = header.children.length; i < j; i++) {
        header.children[i].style.opacity = fadeAmt;
      }
    });
  };

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var starty = $scope.$eval($attr.headerShrink) || 0;
      var shrinkAmt;

      var amt;

      var y = 0;
      var prevY = 0;
      var scrollDelay = 0.4;

      var fadeAmt;

      var header = $document[0].body.querySelector('.bar-subheader');
      var content = $document[0].body.querySelector('ion-content');
      var headerHeight = header.offsetHeight;

      var translate3dPixel = -$rootScope.base.defaultElementPixel + 'px';

      header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + translate3dPixel + ', 0)';

      function onScroll(e) {
        var scrollTop = e.currentTarget.scrollTop;
        console.log('scrollTop: ' + scrollTop);

        if(scrollTop >= $rootScope.base.defaultElementPixel) {
          y = 0;
        } else {
          y = $rootScope.base.defaultElementPixel;
        }

        ionic.requestAnimationFrame(function() {
          fadeAmt = 1 - (y / headerHeight);
          // console.log('fadeAmt: ' + fadeAmt);
          header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -y + 'px, 0)';
          for(var i = 0, j = header.children.length; i < j; i++) {
            header.children[i].style.opacity = fadeAmt;
          }
        });

        prevY = scrollTop;
      }

      $element.bind('scroll', onScroll);
    }
  }
});