// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var map = null;
var searchManager = null;
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);
    document.addEventListener('deviceready', getMap, false);
    //document.addEventListener('deviceready', LoadSearchModule, false);
    document.addEventListener('deviceready', searchRequest, false);

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

    function getMap() {
        map = new Microsoft.Maps.Map(document.getElementById('map'), { credentials: 'AmSAGzZ9ynbNtNEyfJ8wdkqZLwoxt1KGvW8WGgnboLHCPz9m8hZjzPoxjvJR8trg' });
    }
    function createSearchManager() {
        map.addComponent('searchManager', new Microsoft.Maps.Search.SearchManager(map);
        searchManager = map.getComponent('searchManager');
    }
    function LoadSearchModule() {
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: searchRequest })
    }
    function searchRequest() {
        createSearchManager();
        var userData = { name: 'User', id: 'XYZ' };
        var query = 'hotels in Metro Manila, Philippines';
        var request =
            {
                query: query,
                count: 10,
                startIndex: 0,
                bounds: map.getBounds(),
                callback: search_onSearchSuccess,
                errorCallback: search_onSearchFailure,
                userData: userData
            };
        searchManager.search(request);
    }
    function search_onSearchSuccess(result, userData) {
        map.entities.clear();
        var searchResults = result && result.searchResults;
        if (searchResults) {
            for (var i = 0; i < searchResults.length; i++) {
                search_createMapPin(searchResults[i]);
            }
            if (result.searchRegion && result.searchRegion.mapBounds) {
                map.setView({ bounds: result.searchRegion.mapBounds.locationRect });
            }
            else {
                alert('No results returned, Please try after sometime.');
            }
        }
    }
    function search_createMapPin(result) {
        if (result) {
            var pin = new Microsoft.Maps.Pushpin(result.location, null);
            Microsoft.Maps.Events.addHandler(pin, 'click', function () { search_showInfoBox(result) });
            map.entities.push(pin);
        }
    }
    function search_showInfoBox(result) {
        if (currInfobox) {
            currInfobox.setOptions({ visible: true });
            map.entities.remove(currInfobox);
        }
        currInfobox = new Microsoft.Maps.Infobox(
            result.location,
            {
                title: result.name,
                description: [result.address, result.city, result.state, result.country, result.phone].join(' '),
                showPointer: true,
                titleAction: null,
                titleClickHandler: null
            });
        currInfobox.setOptions({ visible: true });
        map.entities.push(currInfobox);
    }
    function search_onSearchFailure(result, userData) {
        alert('Search failed');
    }
} )();