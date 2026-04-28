// Memastikan peta dan fitur pencarian terpisah dan modular,
// script ini menggunakan API Nominatim gratis dari OpenStreetMap untuk pencarian alamat

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResults = document.getElementById("search-results");

// Layer khusus untuk menyimpan hasil pencarian
let searchMarkerLayer = L.layerGroup().addTo(map);

// FUNGSI PENCARIAN
async function handleSearch() {
  const query = searchInput.value.trim();
  if (query.length < 3) {
    alert("Masukkan setidaknya 3 huruf untuk mencari lokasi!");
    return;
  }

  // Menggunakan Fetch API untuk mengambil data lokasi (Geocoding) dari Nominatim
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`;

  try {
    searchBtn.innerText = "Mencari...";
    searchBtn.disabled = true;

    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
      alert("Lokasi tidak ditemukan! Coba kata kunci yang lebih spesifik.");
    } else {
      displayResults(data);
    }
  } catch (error) {
    console.error("Error saat mencari lokasi:", error);
    alert("Terjadi kesalahan sistem, silakan coba lagi.");
  } finally {
    searchBtn.innerText = "Cari";
    searchBtn.disabled = false;
  }
}

// MENAMPILKAN DAFTAR HASIL
function displayResults(data) {
  searchResults.innerHTML = ""; // Bersihkan list sebelumnya
  searchResults.style.display = "block"; // Munculkan list dropdown

  data.forEach((item) => {
    // Membuat elemen HTML untuk setiap baris hasil pencarian
    const resultItem = document.createElement("div");
    resultItem.className = "search-item";
    resultItem.innerText = item.display_name;

    // Aksi ketika hasil diklik
    resultItem.addEventListener("click", () => {
      // Sembunyikan hasil
      searchResults.style.display = "none";
      searchInput.value = item.display_name; // Update input dengan nama lengkap

      // Bersihkan marker sebelumnya
      searchMarkerLayer.clearLayers();

      // Terbang (terarah) ke lokasi tujuan sesuai koordinat
      const lat = parseFloat(item.lat);
      const lon = parseFloat(item.lon);
      map.flyTo([lat, lon], 15, {
        animate: true,
        duration: 1.5, // Durasi animasi dalam detik
      });

      // Tambahkan marker baru yang menarik di lokasi hasil cari
      const resultMarker = L.marker([lat, lon])
        .bindPopup(`<b>Hasil Pencarian:</b><br>${item.display_name}`)
        .openPopup();
      
      searchMarkerLayer.addLayer(resultMarker);
    });

    searchResults.appendChild(resultItem);
  });
}

// EKSEKUSI EVENT LISTENER
searchBtn.addEventListener("click", handleSearch);

// Jika pengguna menekan tombol "Enter" di keyboard
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    handleSearch();
  }
});

// Tutup list pencarian jika pengguna mengklik area luar
document.addEventListener("click", function(e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = "none";
    }
});