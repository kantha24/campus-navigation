# Campus Map Navigation

This project provides an interactive campus map with navigation features, allowing users to find the shortest path between various buildings and points of interest. The map is built using Leaflet.js and integrates with Esri satellite imagery for a detailed view of the campus.

## Features

*   **Interactive Map**: Pan and zoom across the campus using a Leaflet.js map.
*   **Satellite Imagery**: Detailed campus view powered by Esri satellite tiles.
*   **Building and Exit Markers**: Clearly marked locations for all major buildings and campus exits.
*   **Shortest Path Navigation**: Find the optimal route between any two selected locations on campus using Dijkstra's algorithm.
*   **Current Location Tracking**: Utilize browser geolocation to display your current position on the map and navigate from there.
*   **Dynamic Path Highlighting**: Visual representation of the calculated shortest path on the map.
*   **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

*   **Leaflet.js**: An open-source JavaScript library for mobile-friendly interactive maps.
*   **Leaflet.curve**: A Leaflet plugin for drawing smooth polylines.
*   **HTML5**: Structure of the web application.
*   **CSS3**: Styling and responsive design.
*   **JavaScript (ES6+)**: Core logic for map interaction, navigation, and UI.
*   **Esri World Imagery**: Satellite tile layer for map background.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need a modern web browser to run this application. No specific server-side setup is required as it's a client-side application.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd CampusMapNavigation/MultipleFiles
    ```
3.  **Open `index.html`**:
    Simply open the `index.html` file in your web browser.

    ```bash
    open index.html
    ```
    (or `start index.html` on Windows, or just double-click the file in your file explorer)

The map should load in your browser, displaying the campus layout and markers.

## Usage

1.  **Select Destination**: Click on the "Where to?" search bar at the top of the map. A dropdown will appear listing all available buildings and exits. Select your desired destination.
2.  **Select Start Point**: After selecting a destination, a "FROM" dropdown will appear. You can choose to start navigation from your "Current Location" (requires geolocation permission) or from any other building/exit on the campus.
3.  **View Path**: Once both start and destination are selected, the shortest path will be highlighted on the map.
4.  **Reset Navigation**: Click the back button (arrow icon) on the top-left to clear the current navigation and select new points.

## Project Structure

*   `index.html`: The main HTML file that structures the web page and includes CSS and JavaScript.
*   `styles.css`: Contains all the CSS rules for styling the map, markers, navigation panel, and other UI elements.
*   `script.js`: The core JavaScript file containing the Leaflet map initialization, path data, graph algorithms (Dijkstra's), and UI interaction logic.
*   `campus-data.geojson`: (Binary File) Likely contains geographical data for campus features.
*   `campus.geojson`: (Binary File) Likely contains geographical data for campus features.

## Code Overview

### `script.js`

*   **Map Initialization**:
    The map is initialized using `L.map('map')` and set to a specific view.
    ```javascript
    const map = L.map('map', {
        maxZoom: 19,
        zoom: 19,
        zoomControl: false
    }).setView([12.9744003, 77.5829786], 19);
    ```
*   **Tile Layer**: Esri satellite imagery is used as the base map.
    ```javascript
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles © Esri'
    }).addTo(map);
    ```
*   **Path Data**: Various predefined paths (e.g., `mainPoints`, `mbaToLibraryPoints`) are stored as arrays of `[latitude, longitude]` coordinates.
*   **`locationMap`**: An object mapping human-readable location names to their geographical coordinates.
*   **`buildings` and `exits`**: Objects defining campus buildings and exit points, including their locations and connection points to the path network.
*   **Graph Representation**: The campus path network is represented as a graph where nodes are coordinates and edges are connections between them with associated distances.
    *   `addEdge(point1, point2)`: Adds a connection between two points to the graph.
    *   `buildGraph()`: Populates the graph from all defined paths.
*   **Dijkstra's Algorithm**:
    `findShortestPath(start, end)`: Implements Dijkstra's algorithm to find the shortest path between two points in the graph.
*   **Path Highlighting**:
    `highlightPath(path)`: Renders the calculated shortest path on the map with a distinct style and animation.
*   **Geolocation**:
    Functions like `updateLocation`, `handleLocationError`, `startLocationTracking` manage the user's current location on the map.
*   **UI Logic**:
    The `DOMContentLoaded` event listener contains the main logic for the search bar, dropdowns, and handling user selections for navigation. It dynamically renders the destination and start point dropdowns and manages the visibility of UI elements.
    The `runNavigation` function orchestrates the pathfinding process based on user input, including handling "Current Location" as a start point.

### `styles.css`

This file defines the visual appearance of the map elements:

*   **Map Container**: `#map` styles for full-screen map.
*   **Road Styles**: `.road-path`, `.road-outer`, `.road-inner`, `.road-center` define the appearance of paths.
*   **Marker Styles**: `.academic-block-marker`, `.exit-marker`, `.current-location-marker` define the appearance of different types of markers.
*   **Navigation UI**: Styles for `#top-search-bar`, `#destination-dropdown`, `#start-dropdown`, `.dropdown-option`, and `#nav-back-btn`.
*   **Animations**: `@keyframes pulse-blue` for the current location marker and `@keyframes pulse` for the highlighted path.
*   **Responsive Adjustments**: `@media (max-width: 600px)` queries for mobile optimization.

## Future Enhancements

*   **Search Functionality**: Implement a search input within the dropdowns to filter locations.
*   **Turn-by-Turn Directions**: Display textual directions along with the highlighted path.
*   **Accessibility Improvements**: Enhance keyboard navigation and screen reader support.
*   **More Detailed Campus Data**: Integrate more granular data for internal building layouts or specific rooms.
*   **Offline Support**: Implement service workers for offline map access.
*   **Custom Icons**: Use more distinct and visually appealing icons for different types of locations.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is open-source and available under the [MIT License](LICENSE).
