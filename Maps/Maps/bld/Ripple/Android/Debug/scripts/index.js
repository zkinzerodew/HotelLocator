// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    document.addEventListener('deviceready', initializeMap, false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
    function initializeMap() {
        // this is where the custom code will go for each mapping implementation
        var mapOptions = {
            credentials: "AmSAGzZ9ynbNtNEyfJ8wdkqZLwoxt1KGvW8WGgnboLHCPz9m8hZjzPoxjvJR8trg",
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            center: new Microsoft.Maps.Location(43.069452, -89.411373),
            zoom: 11
        };
        var map = new Microsoft.Maps.Map(document.getElementById("map"), mapOptions);
    }
} )();