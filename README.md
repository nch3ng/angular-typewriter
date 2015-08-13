#angular-typewriter
[Demo](http://codepen.io/boo0330/pen/GJLmZy)</b> in Codepen

<b>Prerequisites:</b> angular.js

Include the typewriter.js and typewriter.css in the HTML file

In your HTML:
Define your angular app & controller
~~~ html
<html ng-app="demoapp">
  <body ng-controller="mainCtrl">
    ...
  </body>
</html>
~~~

With the controller:
EX:
~~~ html
<span class="typewriter" typewriter type-speed="200" loop=true loop-delay="1000" custom-style=false cursor=true shell=false>Welcome, type-write your message here!</span>
~~~

Options:

~~~javascript
  {
    // The speed of typewriter
    type-speed: 100,
    // Loop when a sentence ends
    loop: false,
    // Delay time when the sentence starts over
    loopDelay: 2000,
    // Use custom style, if true, the background is black, font color is white, font is Courier New
    customStyle: false,
    // Show cursor
    cursor: true,
    // Show shell
    shell: false,
    // Change line for next sentences
    newline: false,
    // Message box showing sequencely
    messages: string array
  }
~~~

In your javascript:
~~~ javascript
var demoApp = angular.module("demoapp", ["angular.typewriter"]);
~~~
