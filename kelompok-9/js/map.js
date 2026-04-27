// Inisialisasi peta dan tentukan koordinat tengah (Masjid Raya Baiturrahman) serta level zoom
const map = L.map("map").setView([5.5538, 95.3186], 16);

// Menambahkan tile layer dari OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Menambahkan marker di koordinat Masjid Raya Baiturrahman
const marker = L.marker([5.5538, 95.3186]).addTo(map);

// Menambahkan popup pada marker yang akan otomatis terbuka
marker
  .bindPopup("<b>Masjid Raya Baiturrahman</b><br>Banda Aceh, Aceh.")
  .openPopup();
