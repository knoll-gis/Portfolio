// script.js
// Basic behavior for Johnathan Knoll GIS portfolio

document.addEventListener("DOMContentLoaded", () => {
    // 1. Smooth scrolling for in-page nav links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            event.preventDefault();
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    // 2. Footer year
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Initialize Leaflet map demo (if Leaflet is loaded and #map1 exists)
    initializeLeafletDemoMap();

    // 4. Set ArcGIS Online embed URL (fill this in with your own AGOL app URL)
    setAgolEmbedUrl();
});

/**
 * Initializes a simple Leaflet map in the div with id "map1".
 * Requires Leaflet JS & CSS to be included in index.html, for example:
 *
 * <link
 *   rel="stylesheet"
 *   href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
 *   integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
 *   crossorigin=""
 * >
 * <script
 *   src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
 *   integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
 *   crossorigin="">
 * </script>
 */
function initializeLeafletDemoMap() {
    const mapDiv = document.getElementById("map1");

    // If there's no map container or Leaflet isn't loaded, bail quietly
    if (!mapDiv || typeof L === "undefined") {
        return;
    }

    // Center roughly over Appalachia / VA-NC region
    const center = [37.3, -80.0];
    const zoom = 7;

    const map = L.map(mapDiv).setView(center, zoom);

    // Basic OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // Simple marker & popup
    L.marker(center)
        .addTo(map)
        .bindPopup("Example Leaflet map – replace this with your own data.")
        .openPopup();
}

/**
 * Sets the src of the ArcGIS Online embedded map iframe.
 * Replace the placeholder URL with your own AGOL web app / map viewer link.
 */
function setAgolEmbedUrl() {
    const iframe = document.getElementById("agol-embed");
    if (!iframe) return;

    // TODO: Replace this with your real ArcGIS Online app URL
    const agolUrl = ""; // e.g. "https://www.arcgis.com/apps/mapviewer/index.html?webmap=YOUR_WEBMAP_ID"

    if (agolUrl) {
        iframe.src = agolUrl;
    } else {
        // If you haven't set an AGOL URL yet, you can optionally show a placeholder message
        iframe.title = "ArcGIS Online map embed (URL not configured yet)";
    }
}
