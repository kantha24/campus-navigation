// MapTiler API key
const key = 'oAeKnWc4TcILeac3CSw5';

// Add Leaflet.curve plugin
const script = document.createElement('script');
script.src = 'https://unpkg.com/leaflet-curve@1.0.0/leaflet.curve.js';
document.head.appendChild(script);

// Initialize the map centered on the middle of our path
const map = L.map('map', {
    maxZoom: 19,
    zoom: 19,
    zoomControl: false // Disable default zoom control
}).setView([12.9744003, 77.5829786], 19);

// Add the Esri satellite tile layer (no API key required)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles © Esri'
}).addTo(map);

// Function to create a road
function createRoad(points) {
    // Add intermediate points to create smoother curves
    let smoothPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
        const start = points[i];
        const end = points[i + 1];
        
        // Add start point
        smoothPoints.push(start);
        
        // Add intermediate points if there's enough distance
        const distance = L.latLng(start).distanceTo(L.latLng(end));
        if (distance > 10) {  // Only add intermediate points if points are far enough apart
            // Add two intermediate points for smoother curve
            smoothPoints.push([
                start[0] + (end[0] - start[0]) * 0.33,
                start[1] + (end[1] - start[1]) * 0.33
            ]);
            smoothPoints.push([
                start[0] + (end[0] - start[0]) * 0.66,
                start[1] + (end[1] - start[1]) * 0.66
            ]);
        }
        
        // Add end point
        if (i === points.length - 2) {
            smoothPoints.push(end);
        }
    }
    
    const path = L.polyline(smoothPoints, {
        className: 'road-path',
        color: '#666666',
        weight: 4,
        opacity: 1,
        smoothFactor: 1,
        interactive: false
    }).addTo(map);
    return path;
}

// Function to highlight a path
function highlightPath(path) {
    if (highlightedPath) {
        map.removeLayer(highlightedPath);
    }
    
    // Create smooth points for the highlighted path
    let smoothPoints = [];
    for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];
        
        smoothPoints.push(start);
        
        const distance = L.latLng(start).distanceTo(L.latLng(end));
        if (distance > 10) {
            smoothPoints.push([
                start[0] + (end[0] - start[0]) * 0.33,
                start[1] + (end[1] - start[1]) * 0.33
            ]);
            smoothPoints.push([
                start[0] + (end[0] - start[0]) * 0.66,
                start[1] + (end[1] - start[1]) * 0.66
            ]);
        }
        
        if (i === path.length - 2) {
            smoothPoints.push(end);
        }
    }
    
    highlightedPath = L.polyline(smoothPoints, {
        className: 'highlighted-path',
        color: '#0000FF',
        weight: 6,
        opacity: 1,
        smoothFactor: 1
    }).addTo(map);
    
    map.fitBounds(highlightedPath.getBounds(), {
        padding: [50, 50]
    });
}

// Create the main path coordinates array (Library to Chemistry)
const mainPoints = [
    [12.9737905, 77.5821589], // A
    [12.9738984, 77.5822917], // B
    [12.9741664, 77.5826555], // C
    [12.9744326, 77.5829925], // D
    [12.9745868, 77.5832069], // E
    [12.9747175, 77.5833891], // F
    [12.9748133, 77.5835392], // G
    [12.9750102, 77.5837984]  // H
];

// Create the MBA to Library path coordinates
const mbaToLibraryPoints = [
    [12.9736787, 77.5820710], // Point 2
    [12.9737905, 77.5821589]  // Point A (Library)
];

// Create the Chemistry to K path coordinates
const chemistryToKPoints = [
    [12.9750102, 77.5837984], // H (Chemistry)
    [12.9750102, 77.5837984], // I
    [12.9751220, 77.5838759], // J
    [12.9755661, 77.5844339]  // K
];

// Create the K to L path coordinates
const kToLPoints = [
    [12.9755661, 77.5844339], // K
    [12.9751029, 77.5847874]  // L (intersection)
];

// Create the L to M path coordinates
const lToMPoints = [
    [12.9751029, 77.5847874], // L (intersection)
    [12.9751503, 77.5848042]  // M
];

// Create the L to Exit 4 path coordinates
const lToExit4Points = [
    [12.9751029, 77.5847874], // L (intersection)
    [12.9749864, 77.5848571]  // Exit 4
];

// Create the L to O path coordinates
const lToOPoints = [
    [12.9751029, 77.5847874], // L (intersection)
    [12.9750631, 77.5846552]  // O
];

// Create the O to Q path coordinates
const oToPToQPoints = [
    [12.9750631, 77.5846552], // O
    [12.9751566, 77.5845626], // P
    [12.9749609, 77.5842866]  // Q
];

// Create the Q to Exit 3 path coordinates
const qToExit3Points = [
    [12.9749609, 77.5842866], // Q
    [12.9748307, 77.5841053], // R (intersection)
    [12.9747828, 77.5840874], // S (intersection)
    [12.9746400, 77.5842158]  // Exit 3
];

// Create the R to J path coordinates
const rToJPoints = [
    [12.9748307, 77.5841053], // R (intersection)
    [12.9751220, 77.5838759]  // J
];

// Create the S to H path coordinates
const sToHPoints = [
    [12.9747828, 77.5840874], // S (intersection)
    [12.9750102, 77.5837984]  // H (Chemistry)
];

// New paths - T intersection and connections
const startToTPoints = [
    [12.9752154, 77.5838264], // Start point
    [12.9755846, 77.5834003]  // T (intersection)
];

const tToEndPoint1 = [
    [12.9755846, 77.5834003], // T (intersection)
    [12.9756974, 77.5833564]  // End point 1
];

const tToEndPoint2 = [
    [12.9755846, 77.5834003], // T (intersection)
    [12.9758044, 77.5831842]  // End point 2
];

// New connection from J to start point
const jToStartPoints = [
    [12.9751220, 77.5838759], // J
    [12.9752154, 77.5838264]  // Start point
];

// New connection from F to new point
const fToNewPoints = [
    [12.9747175, 77.5833891], // F
    [12.9752041, 77.5830068]  // New point
];

// New path from D through multiple points
const dToNewEndPoints = [
    [12.9744326, 77.5829925], // D
    [12.9743780, 77.5828740], // New point 1
    [12.9743816, 77.5827876], // New point 2
    [12.9743240, 77.5826666], // New point 3
    [12.9745897, 77.5823791]  // New end point
];

// New path from B to new point
const bToNewPoint = [
    [12.9738984, 77.5822917], // B
    [12.9740911, 77.5821431]  // New point
];

// Add new path from [12.9745897,77.5823791] to KB side exit [12.9746448,77.5822936]
const newToKbExit = [
    [12.9745897, 77.5823791],
    [12.9746448, 77.5822936]
];

// Create a mapping of location names to coordinates
const locationMap = {
    'Library (A)': [12.9737905, 77.5821589],
    'Chemistry (H)': [12.9750102, 77.5837984],
    'MBA Department': [12.9735630, 77.5820951],
    'Point K': [12.9755661, 77.5844339],
    'Point L': [12.9751029, 77.5847874],
    'Point M': [12.9751503, 77.5848042],
    'STONE BUILDING GATE': [12.9749864, 77.5848571],
    'Point O': [12.9750631, 77.5846552],
    'Point P': [12.9751566, 77.5845626],
    'Point Q': [12.9749609, 77.5842866],
    'Point R': [12.9748307, 77.5841053],
    'Point S': [12.9747828, 77.5840874],
    'MAIN GATE': [12.9746400, 77.5842158],
    'Point J': [12.9751220, 77.5838759],
    'Point F': [12.9747175, 77.5833891],
    'Point D': [12.9744326, 77.5829925],
    'Point B': [12.9738984, 77.5822917],
    'Point T': [12.9755846, 77.5834003],
    'New End Point 1': [12.9756974, 77.5833564],
    'New End Point 2': [12.9758044, 77.5831842],
    'KB SIDE EXIT': [12.9746448, 77.5822936],
    'NEW BUILDING ENTRY GATE': [12.9747934, 77.5819927]
};

// Building locations and their connection points
const buildings = {
    'MBA BLOCK': {
        location: [12.973508538643548, 77.58192613354694],
        connectTo: [12.9736787, 77.5820710]
    },
    'LIBRARY': {
        location: [12.973792292523923, 77.58208185007084],
        connectTo: [12.9737905, 77.5821589]
    },
    'PHYSICS & KANNADA BLOCK': {
        location: [12.974104436982566, 77.58243878049842],
        connectTo: [12.9741664, 77.5826555]
    },
    'ADMINISTRATIVE BLOCK': {
        location: [12.974595689152853, 77.58297051811772],
        connectTo: [12.9744326, 77.5829925]
    },
    'FINANCE BLOCK': {
        location: [12.97473245290571, 77.58308056283535],
        connectTo: [12.9745868, 77.5832069]
    },
    'CANTEEN': {
        location: [12.975150770258606, 77.58282662136088],
        connectTo: [12.9752041, 77.5830068]
    },
    'CHEMISTRY': {
        location: [12.974941972288217, 77.58354385760472],
        connectTo: [12.9748133, 77.5835392]
    },
    'CS BLOCK': {
        location: [12.974994127871195, 77.584201971778],
        connectTo: [12.9749609, 77.5842866]
    },
    'MATHS BLOCK': {
        location: [12.975200280495454, 77.58447007291515],
        connectTo: [12.9751566, 77.5845626]
    },
    'AUDITORIUM': {
        location: [12.975912101618798, 77.58345410504349],
        connectTo: [12.9756974, 77.5833564]
    },
    'ZOOLOGY': {
        location: [12.975816426921481, 77.58439039884884],
        connectTo: [12.9755661, 77.5844339]
    },
    'EXAMINATION': {
        location: [12.975273109116046, 77.58487274043324],
        connectTo: [12.9751503, 77.5848042]
    }
};

// Update locationMap with building locations
Object.entries(buildings).forEach(([name, data]) => {
    locationMap[name] = data.location;
});

// Store all paths for navigation
const allPaths = [
    mainPoints,
    mbaToLibraryPoints,
    chemistryToKPoints,
    kToLPoints,
    lToMPoints,
    lToExit4Points,
    lToOPoints,
    oToPToQPoints,
    qToExit3Points,
    rToJPoints,
    sToHPoints,
    startToTPoints,
    tToEndPoint1,
    tToEndPoint2,
    jToStartPoints,
    fToNewPoints,
    dToNewEndPoints,
    bToNewPoint,
    newToKbExit
];

// Add building paths to allPaths
Object.entries(buildings).forEach(([name, data]) => {
    allPaths.push([data.location, data.connectTo]);
});

let highlightedPath = null;

// Function to find the nearest point on any path
function findNearestPathPoint(coord) {
    let minDist = Infinity;
    let nearestPoint = null;
    
    allPaths.forEach(path => {
        path.forEach(point => {
            const dist = L.latLng(coord).distanceTo(L.latLng(point));
            if (dist < minDist) {
                minDist = dist;
                nearestPoint = point;
            }
        });
    });
    
    return nearestPoint;
}

// Create a graph representation of our paths
const graph = {};

// Function to add an edge to the graph
function addEdge(point1, point2) {
    const key1 = point1.join(',');
    const key2 = point2.join(',');
    
    if (!graph[key1]) graph[key1] = [];
    if (!graph[key2]) graph[key2] = [];
    
    // Calculate distance between points
    const distance = L.latLng(point1).distanceTo(L.latLng(point2));
    
    graph[key1].push({ point: key2, distance });
    graph[key2].push({ point: key1, distance });
}

// Build the graph from all paths
function buildGraph() {
    // Clear the graph before rebuilding
    Object.keys(graph).forEach(key => delete graph[key]);
    allPaths.forEach(path => {
        for (let i = 0; i < path.length - 1; i++) {
            addEdge(path[i], path[i + 1]);
        }
    });
}

// Find shortest path using Dijkstra's algorithm
function findShortestPath(start, end) {
    const startKey = start.join(',');
    const endKey = end.join(',');
    
    const distances = {};
    const previous = {};
    const unvisited = new Set();
    
    // Initialize distances
    Object.keys(graph).forEach(point => {
        distances[point] = Infinity;
        previous[point] = null;
        unvisited.add(point);
    });
    distances[startKey] = 0;
    
    while (unvisited.size > 0) {
        // Find unvisited point with smallest distance
        let current = null;
        let smallestDistance = Infinity;
        unvisited.forEach(point => {
            if (distances[point] < smallestDistance) {
                smallestDistance = distances[point];
                current = point;
            }
        });
        
        if (current === endKey) break;
        if (current === null) break;
        
        unvisited.delete(current);
        
        // Update distances to neighbors
        graph[current].forEach(neighbor => {
            if (!unvisited.has(neighbor.point)) return;
            
            const distance = distances[current] + neighbor.distance;
            if (distance < distances[neighbor.point]) {
                distances[neighbor.point] = distance;
                previous[neighbor.point] = current;
            }
        });
    }
    
    // Build path
    const path = [];
    let current = endKey;
    while (current !== null) {
        path.unshift(current.split(',').map(Number));
        current = previous[current];
    }
    
    return path;
}

// Build the graph when initializing
buildGraph();

// Global variables for location tracking
let currentLocationMarker = null;
let watchId = null;
let userLocation = null;

// Function to create a current location marker
function createLocationMarker(latlng) {
    return L.marker(latlng, {
        icon: L.divIcon({
            className: 'current-location-marker',
            html: '<div style="width: 16px; height: 16px;"></div>',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        })
    });
}

// Function to update user's location
function updateLocation(position) {
    const latlng = [position.coords.latitude, position.coords.longitude];
    userLocation = latlng;

    if (!currentLocationMarker) {
        currentLocationMarker = createLocationMarker(latlng).addTo(map);
    } else {
        currentLocationMarker.setLatLng(latlng);
    }

    // Center map on user's location
    map.setView(latlng, map.getZoom());
}

// Function to handle location errors
function handleLocationError(error) {
    let message;
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = "Please allow location access to use this feature.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            message = "Location request timed out.";
            break;
        default:
            message = "An unknown error occurred.";
    }
    alert(message);
}

// Function to start location tracking
function startLocationTracking() {
    if ("geolocation" in navigator) {
        // Get initial position
        navigator.geolocation.getCurrentPosition(updateLocation, handleLocationError);
        
        // Start watching position
        watchId = navigator.geolocation.watchPosition(updateLocation, handleLocationError);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Function to stop location tracking
function stopLocationTracking() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
    if (currentLocationMarker) {
        map.removeLayer(currentLocationMarker);
        currentLocationMarker = null;
    }
    userLocation = null;
}

// Wait for the DOM to be fully loaded before creating the navigation panel
document.addEventListener('DOMContentLoaded', () => {
    // Minimalist two-step navigation UI
    const topSearchBar = document.getElementById('top-search-bar');
    const destinationDropdown = document.getElementById('destination-dropdown');
    const startDropdown = document.getElementById('start-dropdown');
    const navBackBtn = document.getElementById('nav-back-btn');
    let selectedDestination = null;
    let selectedStart = null;

    // Render the back button SVG
    navBackBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`;
    navBackBtn.style.display = 'none';

    // Render the search bar
    function renderSearchBar(label = 'Where to?') {
      topSearchBar.innerHTML = `
        <div id="search-bar-fake" class="search-bar-fake" tabindex="0">
          <span class="search-icon"></span>
          <span id="search-bar-label" style="color:#444; font-weight:500;">${label}</span>
        </div>
      `;
    }
    renderSearchBar();

    // Helper to show/hide dropdowns and back button
    function showDropdown(dropdown) {
      destinationDropdown.style.display = 'none';
      startDropdown.style.display = 'none';
      if (dropdown) dropdown.style.display = 'flex';
      navBackBtn.style.display = 'flex';
    }
    function hideDropdowns() {
      destinationDropdown.style.display = 'none';
      startDropdown.style.display = 'none';
      navBackBtn.style.display = 'none';
    }
    function resetNavigationUI() {
      selectedDestination = null;
      selectedStart = null;
      renderSearchBar();
      hideDropdowns();
      attachSearchBarClick();
    }

    // Populate destination dropdown
    function renderDestinationDropdown() {
      destinationDropdown.innerHTML = '';
      // Add TO label
      const toLabel = document.createElement('div');
      toLabel.textContent = 'TO';
      toLabel.className = 'dropdown-label';
      destinationDropdown.appendChild(toLabel);
      const allLocations = [...Object.keys(buildings), ...Object.keys(exits)];
      allLocations.forEach(loc => {
        const opt = document.createElement('div');
        opt.className = 'dropdown-option';
        opt.textContent = loc;
        opt.onclick = () => {
          selectedDestination = loc;
          document.getElementById('search-bar-label').textContent = loc;
          showDropdown(startDropdown);
          renderStartDropdown();
        };
        destinationDropdown.appendChild(opt);
      });
    }

    // Populate start dropdown
    function renderStartDropdown() {
      startDropdown.innerHTML = '';
      // Add FROM label
      const fromLabel = document.createElement('div');
      fromLabel.textContent = 'FROM';
      fromLabel.className = 'dropdown-label';
      startDropdown.appendChild(fromLabel);
      const allStarts = ['Current Location', ...Object.keys(buildings), ...Object.keys(exits)];
      allStarts.forEach(loc => {
        const opt = document.createElement('div');
        opt.className = 'dropdown-option';
        opt.textContent = loc;
        opt.onclick = () => {
          selectedStart = loc;
          hideDropdowns();
          document.getElementById('search-bar-label').textContent = `${selectedStart} → ${selectedDestination}`;
          runNavigation(selectedStart, selectedDestination);
        };
        startDropdown.appendChild(opt);
      });
    }

    // Show destination dropdown on search bar click
    function attachSearchBarClick() {
      document.getElementById('search-bar-fake').onclick = () => {
        renderDestinationDropdown();
        showDropdown(destinationDropdown);
      };
    }
    attachSearchBarClick();

    // Hide dropdowns on outside click
    document.addEventListener('click', (e) => {
      if (!topSearchBar.contains(e.target) && !destinationDropdown.contains(e.target) && !startDropdown.contains(e.target) && e.target !== navBackBtn) {
        hideDropdowns();
      }
    });

    // Back button resets navigation UI
    navBackBtn.onclick = resetNavigationUI;

    // Navigation logic (unchanged)
    function runNavigation(startLabel, endLabel) {
      let start;
      // Remove any previous pin marker
      if (window._navPinMarker) {
        map.removeLayer(window._navPinMarker);
        window._navPinMarker = null;
      }
      // Restore any previously faded marker
      if (window._navFadedMarker) {
        window._navFadedMarker._icon.classList.remove('marker-faded');
        window._navFadedMarker._icon.classList.remove('pin-faded');
        window._navFadedMarker = null;
      }
      // Find the marker for the end point and fade it (opacity 0)
      let fadedMarker = null;
      map.eachLayer(layer => {
        if (layer instanceof L.Marker && layer.getLatLng && layer._icon && layer.getLatLng().lat === locationMap[endLabel][0] && layer.getLatLng().lng === locationMap[endLabel][1]) {
          layer._icon.classList.add('marker-faded');
          fadedMarker = layer;
        }
      });
      window._navFadedMarker = fadedMarker;
      // Add SVG Google-style pin marker at end point
      const endCoord = locationMap[endLabel];
      const pinSVG = `<svg width="28" height="38" viewBox="0 0 28 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 0C6.268 0 0 6.268 0 14c0 8.284 12.25 23.25 12.25 23.25a2 2 0 0 0 3.5 0S28 22.284 28 14C28 6.268 21.732 0 14 0zm0 20a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" fill="#000"/><circle cx="14" cy="14" r="5" fill="#fff"/></svg>`;
      window._navPinMarker = L.marker(endCoord, {
        icon: L.divIcon({
          className: 'pin-marker-svg',
          html: pinSVG,
          iconSize: [28, 38],
          iconAnchor: [14, 38]
        })
      }).addTo(map);
      // Navigation logic (unchanged)
      if (startLabel === 'Current Location') {
        if (!('geolocation' in navigator)) {
          alert('Geolocation is not supported by your browser.');
          return;
        }
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latlng = [position.coords.latitude, position.coords.longitude];
            if (currentLocationMarker) {
              currentLocationMarker.setLatLng(latlng);
            } else {
              currentLocationMarker = createLocationMarker(latlng).addTo(map);
            }
            map.setView(latlng, map.getZoom());
            userLocation = latlng;
            const nearestStart = findNearestPathPoint(latlng);
            const nearestEnd = findNearestPathPoint(endCoord);
            const path = findShortestPath(nearestStart, nearestEnd);
            if (path.length > 0) {
              path.unshift(latlng);
              highlightPath(path);
            } else {
              alert('No path found between these points');
            }
          },
          (error) => {
            let message;
            switch(error.code) {
              case error.PERMISSION_DENIED:
                message = "Please allow location access to use this feature.";
                break;
              case error.POSITION_UNAVAILABLE:
                message = "Location information is unavailable.";
                break;
              case error.TIMEOUT:
                message = "Location request timed out.";
                break;
              default:
                message = "An unknown error occurred.";
            }
            alert(message);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else {
        start = locationMap[startLabel];
        const nearestStart = findNearestPathPoint(start);
        const nearestEnd = findNearestPathPoint(endCoord);
        const path = findShortestPath(nearestStart, nearestEnd);
        if (path.length > 0) {
          highlightPath(path);
        } else {
          alert('No path found between these points');
        }
      }
    }

    // When navigation is reset, hide the pin and restore marker opacity
    function resetNavigationUI() {
      selectedDestination = null;
      selectedStart = null;
      renderSearchBar();
      hideDropdowns();
      attachSearchBarClick();
      if (window._navPinMarker && window._navPinMarker._icon) {
        window._navPinMarker._icon.classList.add('pin-faded');
        setTimeout(() => {
          if (window._navPinMarker) {
            map.removeLayer(window._navPinMarker);
            window._navPinMarker = null;
          }
        }, 300);
      }
      if (window._navFadedMarker && window._navFadedMarker._icon) {
        window._navFadedMarker._icon.classList.remove('marker-faded');
        window._navFadedMarker = null;
      }
    }



    // Remove the old navigation panel if present
    const navContainer = document.getElementById('navigation-container');
    navContainer.innerHTML = '';

    // REMOVE all createRoad(...) calls for paths on map load
    // REMOVE GeoJSON path rendering for LineStrings (paths)
    // Only add building markers on map load
    Object.entries(buildings).forEach(([name, data]) => {
        // Add building marker with popup
        L.marker(data.location, {
            icon: L.divIcon({
                className: 'academic-block-marker',
                html: '<div></div>',
                iconSize: [24, 24],
                iconAnchor: [12, 24]
            })
        })
        .bindPopup(name)
        .addTo(map);
    });

    // Update exits with new names
    const exits = {
        'MAIN GATE': [12.9746400, 77.5842158],
        'STONE BUILDING GATE': [12.9749864, 77.5848571],
        'KB SIDE EXIT': [12.9746448, 77.5822936],
        'NEW BUILDING ENTRY GATE': [12.9747934, 77.5819927]
    };

    // Update locationMap keys for exits
    locationMap['MAIN GATE'] = [12.9746400, 77.5842158];
    locationMap['STONE BUILDING GATE'] = [12.9749864, 77.5848571];
    // Remove old keys if present
    if (locationMap['Exit 3']) delete locationMap['Exit 3'];
    if (locationMap['Exit 4']) delete locationMap['Exit 4'];

    Object.entries(exits).forEach(([name, coord]) => {
        L.marker(coord, {
            icon: L.divIcon({
                className: 'exit-marker',
                html: '<div></div>',
                iconSize: [24, 24],
                iconAnchor: [12, 24]
            })
        })
        .bindPopup(name)
        .addTo(map);
    });

    // Update the path from KB SIDE EXIT to NEW BUILDING ENTRY GATE
    const kbExitToNewBuilding = [
        [12.9746448, 77.5822936],
        [12.9747934, 77.5819927]
    ];
    // Remove the old path if present and add the updated one
    allPaths.push(kbExitToNewBuilding);
    buildGraph();

    // Add new path from NEW BUILDING ENTRY GATE to [12.9750527, 77.5815617]
    const newBuildingToIntermediate = [
        [12.9747934, 77.5819927],
        [12.9750527, 77.5815617]
    ];
    allPaths.push(newBuildingToIntermediate);
    buildGraph();

    // Add new paths from [12.9750527, 77.5815617] to [12.9750988, 77.5814182] and [12.9748295, 77.5813958]
    const intersectionToFirst = [
        [12.9750527, 77.5815617],
        [12.9750988, 77.5814182]
    ];
    const intersectionToSecond = [
        [12.9750527, 77.5815617],
        [12.9748295, 77.5813958]
    ];
    allPaths.push(intersectionToFirst);
    allPaths.push(intersectionToSecond);
    buildGraph();

    // Add ACADEMIC BLOCK to buildings
    buildings['ACADEMIC BLOCK'] = {
        location: [12.9749467, 77.5812730],
        connectTo: [12.9750988, 77.5814182]
    };
    locationMap['ACADEMIC BLOCK'] = [12.9749467, 77.5812730];

    // Add path from [12.9750988, 77.5814182] to ACADEMIC BLOCK
    const toAcademicBlock = [
        [12.9750988, 77.5814182],
        [12.9749467, 77.5812730]
    ];
    allPaths.push(toAcademicBlock);
    buildGraph();

    // Add marker for ACADEMIC BLOCK
    L.marker([12.9749467, 77.5812730], {
        icon: L.divIcon({
            className: 'academic-block-marker',
            html: '<div></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        })
    })
    .bindPopup('ACADEMIC BLOCK')
    .addTo(map);

    // Add PK BLOCK to buildings
    buildings['PK BLOCK'] = {
        location: [12.9747751, 77.5813217],
        connectTo: [12.9748295, 77.5813958]
    };
    locationMap['PK BLOCK'] = [12.9747751, 77.5813217];

    // Add path from [12.9748295, 77.5813958] to PK BLOCK
    const toPkBlock = [
        [12.9748295, 77.5813958],
        [12.9747751, 77.5813217]
    ];
    allPaths.push(toPkBlock);
    buildGraph();

    // Add marker for PK BLOCK
    L.marker([12.9747751, 77.5813217], {
        icon: L.divIcon({
            className: 'academic-block-marker',
            html: '<div></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        })
    })
    .bindPopup('PK BLOCK')
    .addTo(map);

    // Add new paths to the intermediate point [12.9748494, 77.5812390]
    const firstToIntermediate = [
        [12.9750988, 77.5814182],
        [12.9748494, 77.5812390]
    ];
    const secondToIntermediate = [
        [12.9748295, 77.5813958],
        [12.9748494, 77.5812390]
    ];
    allPaths.push(firstToIntermediate);
    allPaths.push(secondToIntermediate);
    buildGraph();

    // Add new path from [12.9748494, 77.5812390] to [12.9750836, 77.5808480]
    const intermediateToNext = [
        [12.9748494, 77.5812390],
        [12.9750836, 77.5808480]
    ];
    allPaths.push(intermediateToNext);
    buildGraph();

    // Add SPORTS BLOCK to buildings
    buildings['SPORTS BLOCK'] = {
        location: [12.9749447, 77.5807470],
        connectTo: [12.9750836, 77.5808480]
    };
    locationMap['SPORTS BLOCK'] = [12.9749447, 77.5807470];

    // Add path from [12.9750836, 77.5808480] to SPORTS BLOCK
    const toSportsBlock = [
        [12.9750836, 77.5808480],
        [12.9749447, 77.5807470]
    ];
    allPaths.push(toSportsBlock);
    buildGraph();

    // Add marker for SPORTS BLOCK
    L.marker([12.9749447, 77.5807470], {
        icon: L.divIcon({
            className: 'academic-block-marker',
            html: '<div></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        })
    })
    .bindPopup('SPORTS BLOCK')
    .addTo(map);

    // Add new path segments for MBA BLOCK, LIBRARY, PHYSICS & KANNADA BLOCK towards KB SIDE EXIT via [12.9742630, 77.5827301]
    const mbaToLibrary = [
        buildings['MBA BLOCK'].location,
        buildings['LIBRARY'].location
    ];
    const libraryToPhysics = [
        buildings['LIBRARY'].location,
        buildings['PHYSICS & KANNADA BLOCK'].location
    ];
    const physicsToIntermediate = [
        buildings['PHYSICS & KANNADA BLOCK'].location,
        [12.9742630, 77.5827301]
    ];
    const intermediateToKbExit = [
        [12.9742630, 77.5827301],
        exits['KB SIDE EXIT']
    ];
    allPaths.push(mbaToLibrary);
    allPaths.push(libraryToPhysics);
    allPaths.push(physicsToIntermediate);
    allPaths.push(intermediateToKbExit);
    buildGraph();

    // Add FAD BLOCK to buildings
    buildings['FAD BLOCK'] = {
        location: [12.9741266, 77.5821118],
        connectTo: [12.9738984, 77.5822917]
    };
    locationMap['FAD BLOCK'] = [12.9741266, 77.5821118];

    // Add path from [12.9738984,77.5822917] to FAD BLOCK
    const toFadBlock = [
        [12.9738984, 77.5822917],
        [12.9741266, 77.5821118]
    ];
    allPaths.push(toFadBlock);
    buildGraph();

    // Add marker for FAD BLOCK
    L.marker([12.9741266, 77.5821118], {
        icon: L.divIcon({
            className: 'academic-block-marker',
            html: '<div></div>',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        })
    })
    .bindPopup('FAD BLOCK')
    .addTo(map);

    // REMOVE fitBounds for all paths, but you may want to fit to all building markers instead
    const buildingPoints = Object.values(buildings).map(b => b.location);
    const bounds = L.latLngBounds(buildingPoints);
    map.fitBounds(bounds);
    map.setZoom(22);

    // Colors for different path types
    const pathColors = {
        primary: '#0000FF',    // Blue for main path
        secondary: '#666666'   // Gray for connecting paths
    };

    // Colors for different point types
    const pointColors = {
        building: '#ff0000',   // Red for buildings
        entry: '#00ff00'       // Green for entries
    };

    // Function to style paths
    function stylePath(feature) {
        return {
            color: pathColors[feature.properties.pathType] || pathColors.primary,
            weight: 4,
            opacity: 1
        };
    }

    // Function to style points
    function stylePoint(feature) {
        return {
            radius: 8,
            fillColor: pointColors[feature.properties.type] || '#ff0000',
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        };
    }

    // Function to create popups
    function createPopup(feature, layer) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(`<h3>${feature.properties.name}</h3>`);
        }
    }

    // REMOVE fetch('campus-data.geojson') block for paths (keep for points if needed)

    // Add navigation controls
    // REMOVE map.addControl(new maplibregl.NavigationControl());

    // Add scale
    map.addControl(new L.Control.Scale());
});