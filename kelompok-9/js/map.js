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

// --- Fitur Lokasi Saya (Geolocation) ---

const btnLocate = document.getElementById("btn-locate");
// Layer khusus untuk menyimpan marker lokasi pengguna
let userLocationLayer = L.layerGroup().addTo(map);

btnLocate.addEventListener("click", function () {
  // Minta browser mencari lokasi saat ini (akan muncul alert izin akses lokasi pada browser)
  map.locate({ setView: true, maxZoom: 16 });
});

// Jika lokasi berhasil ditemukan
map.on("locationfound", function (e) {
  // Hapus marker/layer lokasi sebelumnya (jika ada)
  userLocationLayer.clearLayers();

  const radius = e.accuracy / 2;

  // Buat marker di posisi user
  const userMarker = L.marker(e.latlng)
    .bindPopup("Anda berada di sekitar " + radius.toFixed(0) + " meter dari titik ini")
    .openPopup();
  
  // Buat lingkaran area akurasi
  const userCircle = L.circle(e.latlng, radius);

  // Tambahkan marker dan lingkaran ke dalam layer kita
  userLocationLayer.addLayer(userMarker);
  userLocationLayer.addLayer(userCircle);
});

// Jika gagal / pengguna menolak memberikan akses lokasi
map.on("locationerror", function (e) {
  alert("Tidak dapat menjangkau lokasi Anda. Pastikan izin GPS diperbolehkan.");
});
