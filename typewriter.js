angular.module("nate.util", [])
.directive("resizeable", [function(){
  return {
    restrict: "EA",
    template:"<div class='resizeableShape'><div class='boundary'><div class='innerContent'></div></div></div>",
    scope:[],
    link: function(scope, element, attrs){
      console.log("Directive...");
      element.on("mouseup", function(e){
        console.log("mouse up");
      });
    }
  }
}])
.directive("typewriter", ["$timeout", "$compile", function($timeout, $compile){
  return {
    restrict: "EA",
    template: "",
    scope: {
      typeSpeed: '@',
      loop: '=loop',
      loopDelay: '@',
      customStyle: '=customStyle',
      cursor: '=cursor',
      shell: '=shell',
      messages: '=',
      newline: '=newline'
    },
    link: function(scope, element, attrs){
      //console.log("Typewriter directive...");
      
      scope.typeSpeed = scope.typeSpeed || 100;
      scope.loopDelay = scope.loopDelay || 2000;
      scope.customStyle = scope.customStyle || false;
      scope.cursor = scope.cursor || true;
      scope.shell = scope.shell || false;
      scope.newline = scope.newline || false;
      
      if(scope.cursor){
        var contentCursor = angular.element('<span class="cursor"> |</span>');
        contentCursor.insertAfter(element);
        $compile(contentCursor)(scope);
      }
      
      if(scope.shell){
        var contentShell = angular.element('<span class="shell" style="font-family: \'Consolas\', \'Courier New\', \'Courier\'">$ </span>');
        contentShell.insertBefore(element);
        $compile(contentShell)(scope);
      }
      
      scope.typewrite = function(element, text, n, loop){
        if(n<text.length+1){
          if(text.substring(n-1,n)=='<'){
            $timeout(function(){
              scope.typewrite(element, text, n+2, scope.loop);
            }, scope.loopDelay);
          }
          else{
            element.html(text.substring(0,n));
            $timeout(function(){
              scope.typewrite(element, text, n+1, scope.loop);
            }, scope.typeSpeed);
          }
        }
        else if(scope.loop) {
          $timeout(function(){
            scope.typewrite(element, text, 0, scope.loop);
          }, scope.loopDelay);
        }
      }
      
      scope.typewrite_msgs = function(element, text_array, array_idx, n, loop){
        if(n<text_array[array_idx].length+1){
          
          element.html(text_array[array_idx].substring(0,n));
          $timeout(function(){
            scope.typewrite_msgs(element, text_array, array_idx, n+1, loop);
          }, scope.typeSpeed);
        }
        else if(array_idx+1 < text_array.length){
          $timeout(function(){
            scope.typewrite_msgs(element, text_array, array_idx+1, 0, loop);
          }, scope.loopDelay);
        }
        else if(scope.loop) {
          $timeout(function(){
            scope.typewrite_msgs(element, text_array, 0, 0, loop);
          }, scope.loopDelay);
        }
      }
      
      
      if(scope.messages){
        
        if(scope.newline) {
          var whole_msg = '';
          angular.forEach(scope.messages, function(value, key){
            whole_msg = whole_msg + value + "<br>";
          })
          scope.typewrite(element, whole_msg, 0, scope.loop);
        }
        else {
          scope.typewrite_msgs(element, scope.messages, 0, 0, scope.loop, scope.newline);
        }
      }
      else {
        var text = element.html();
        //var length = text.length;
        //console.log(text + ": " + length);
        scope.typewrite(element, text, 0, scope.loop);
      }
      
      if(!scope.customStyle){
        element.css("font-family", '"Consolas", "Courier New", "Courier"');
        element.css("background-color", "#000000");
        element.css("color", "#f0f0f0");
      }
    }
  }	
}]);