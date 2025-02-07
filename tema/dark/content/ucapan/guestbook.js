// Fungsi untuk mengambil konfigurasi dari file token.txt
async function fetchConfig() {
    const response = await fetch('../data-input/token.txt');
    const text = await response.text();
    const config = {};
    text.split('\n').forEach(line => {
        const [key, value] = line.split(': ');
        config[key] = value.trim();
    });
    return config;
}

document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Ambil konfigurasi dari file token.txt
        const config = await fetchConfig();
        const API_URL = config.url;
        const API_TOKEN = config.token;

        // Kode JavaScript untuk memasukkan kode HTML
        const ucapan = `
            <h3>RSVP</h3>
            <form id="guestbook-form">
                <input type="text" id="nama" placeholder="Nama" required>
                <select id="kehadiran" required>
                    <option value="" disabled selected>Pilih Kehadiran</option>
                    <option value="Hadir" class="status-biru">Hadir</option>
                    <option value="Belum Pasti" class="status-hijau">Belum Pasti</option>
                    <option value="Tidak Hadir" class="status-merah">Tidak Hadir</option>
                </select>
                <textarea id="pesan" placeholder="Ucapan" required></textarea>
                <button class="gbtn" type="submit"><h6>Kirim</h6></button>
            </form>
            <h4>Ucapan</h4>
            <div id="komentar-list"></div>
        `;

        document.getElementById('ucapan').innerHTML = ucapan;

        // Fungsi untuk menampilkan komentar
        function tampilkanKomentar() {
            fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Authorization': `token ${API_TOKEN}`
                }
            })
            .then(response => response.json())
            .then(data => {
                const komentarList = document.getElementById("komentar-list");
                komentarList.innerHTML = ""; // Hapus konten sebelumnya

                data.forEach(issue => {
                    const komentar = document.createElement("div");
                    komentar.classList.add("post");

                    const komentarData = JSON.parse(issue.body);

                    // Tampilkan timestamp dengan format "dd, NamaBulan yyyy"
                    const timestamp = formatTimestamp(komentarData.timestamp);

                    komentar.innerHTML = `
                        <section class="post-container">
                            <minidenticon-svg username="${komentarData.nama}"></minidenticon-svg>
                            <div class="post-wrap">
                                <div class="post-item">
                                    <h5 class="post-name item">${komentarData.nama}</h5>
                                    <h6 class="post-status item"><span class="${komentarData.kehadiran}">${komentarData.kehadiran}</span></h6>
                                </div>
                                <p class="post-comment">${komentarData.pesan}</p>
                                <h6 class="post-date">${timestamp}</h6>
                            </div>
                        </section>
                    `;

                    komentarList.appendChild(komentar);
                });
            });
        }

        // Panggil fungsi untuk menampilkan komentar saat halaman dimuat
        tampilkanKomentar();

        // Tambahkan event listener untuk mengirim data dan memperbarui komentar saat formulir disubmit
        const form = document.getElementById("guestbook-form");
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const nama = document.getElementById("nama").value;
            const pesan = document.getElementById("pesan").value;
            const kehadiran = document.getElementById("kehadiran").value;

            // Gabungkan nama dan timestamp untuk membuat kode unik
            const timestamp = new Date().toISOString();
            const uniqueCode = nama + "-" + timestamp;

            const data = {
                title: `Pesan dari ${nama} - ${timestamp}`,
                body: JSON.stringify({
                    nama: nama,
                    pesan: pesan,
                    kehadiran: kehadiran,
                    timestamp: timestamp,
                    uniqueCode: uniqueCode
                })
            };

            fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${API_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                alert("Pesan berhasil dikirim ke buku tamu!");
                document.getElementById("nama").value = "";
                document.getElementById("pesan").value = "";
                document.getElementById("kehadiran").value = ""; // Reset kehadiran ke default
                tampilkanKomentar();
            })
            .catch(error => {
                alert("Terjadi kesalahan. Silakan coba lagi.");
            });
        });

        // Fungsi untuk memformat timestamp ke "dd, NamaBulan yyyy" dalam bahasa Indonesia
        function formatTimestamp(timestamp) {
            const date = new Date(timestamp);
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            return date.toLocaleDateString('id-ID', options);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan dalam memuat konfigurasi');
    }
});