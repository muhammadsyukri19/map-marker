// Inisialisasi peta dan tentukan koordinat tengah (Masjid Raya Baiturrahman) serta level zoom
const map = L.map("map").setView([5.5538, 95.3186], 16);

// Menambahkan tile layer dari OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Menambahkan marker di koordinat Masjid Raya Baiturrahman
const marker = L.marker([5.553221, 95.318375]).addTo(map);

// Menambahkan popup pada marker yang akan otomatis terbuka
marker
  .bindPopup("<b>Masjid Raya Baiturrahman</b><br>ikon pusat keagamaan, budaya, dan sejarah Aceh yang terletak di pusat Kota Banda Aceh.")
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
    .bindPopup(
      "Anda berada di sekitar " + radius.toFixed(0) + " meter dari titik ini",
    )
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

// Koordinat yang disesuaikan mengikuti bentuk area halaman Masjid
const komplekMasjidRayaCoords = [
  [5.553120, 95.316364], 
  [5.554356, 95.316975],
  [5.553876, 95.317895], 
  [5.553379, 95.319153], 
  [5.552445, 95.318850],  
];

// Membuat polygon dengan warna hijau
const areaMasjid = L.polygon(komplekMasjidRayaCoords, {
  color: "#2d5a27",      // Warna garis tepi
  fillColor: "#4CAF50",  // Warna isi
  fillOpacity: 0.4,      // Transparansi
  weight: 2
}).addTo(map);

areaMasjid.bindPopup("Batas Wilayah Komplek Masjid Raya Baiturrahman");

// Menambahkan koordinant saat ditekan pada peta dan ditampilkan di console 
map.on('click', function(e) {
    console.log("[" + e.latlng.lat.toFixed(6) + ", " + e.latlng.lng.toFixed(6) + "],");
});

// Daftar lokasi ikonik di sekitar Masjid Raya Baiturrahman
const lokasiIkonik = [
  {
    nama: "Lapangan Blang Padang",
    koordinat: [5.549960, 95.314068],
    keterangan: "ruang terbuka hijau dan ikon sejarah penting di pusat Kota Banda Aceh."
  },
  {
    nama: "Museum Tsunami Aceh",
    koordinat: [5.547771, 95.315119],
    keterangan: "museum di Banda Aceh untuk mengenang korban gempa dan tsunami 2004"
  },
  {
    nama: "Taman Sari Bustanussalatin",
    koordinat: [5.545655, 95.315859],
    keterangan: "Taman kota bersejarah yang menjadi tempat rekreasi warga."
  },
  {
    nama: "Museum Negeri Aceh",
    koordinat: [5.549041, 95.320945],
    keterangan: "Museum sejarah dan budaya Aceh yang terkenal dengan Rumoh Aceh-nya."
  },
  {
    nama: "Kherkof Peucut",
    koordinat: [5.546722, 95.314507],
    keterangan: "kompleks pemakaman militer Belanda terbesar kedua di dunia, berlokasi di pusat kota Banda Aceh."
  }
];

// Menambahkan marker untuk setiap lokasi di dalam array lokasiIkonik
lokasiIkonik.forEach(function(tempat) {
  L.marker(tempat.koordinat)
    .addTo(map)
    .bindPopup(`<b>${tempat.nama}</b><br>${tempat.keterangan}`);
});
