// Fungsi untuk mengambil konfigurasi dari file token.txt
async function fetchConfig() {
    try {
        const response = await fetch('dark/data-input/token.txt');
        if (!response.ok) {
            throw new Error('Gagal mengambil konfigurasi');
        }
        const text = await response.text();
        const config = {};
        text.split('\n').forEach(line => {
            const [key, value] = line.split(': ');
            if (key && value) {
                config[key.trim()] = value.trim();
            }
        });
        return config;
    } catch (error) {
        console.error('Error fetching config:', error);
        throw error;
    }
}

// Fungsi untuk memformat timestamp ke "dd, NamaBulan yyyy" dalam bahasa Indonesia
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
}

// Fungsi untuk menampilkan komentar
async function tampilkanKomentar(API_URL, API_TOKEN) {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `token ${API_TOKEN}`
            }
        });
        if (!response.ok) {
            throw new Error('Gagal mengambil komentar');
        }
        const data = await response.json();
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
    } catch (error) {
        console.error('Error displaying comments:', error);
        alert('Terjadi kesalahan saat menampilkan komentar');
    }
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

        // Panggil fungsi untuk menampilkan komentar saat halaman dimuat
        tampilkanKomentar(API_URL, API_TOKEN);

        // Tambahkan event listener untuk mengirim data dan memperbarui komentar saat formulir disubmit
        const form = document.getElementById("guestbook-form");
        form.addEventListener("submit", async function(event) {
            event.preventDefault();

            const nama = document.getElementById("nama").value.trim();
            const pesan = document.getElementById("pesan").value.trim();
            const kehadiran = document.getElementById("kehadiran").value;

            if (!nama || !pesan || !kehadiran) {
                alert('Harap isi semua field');
                return;
            }

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

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': `token ${API_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (!response.ok) {
                    throw new Error('Gagal mengirim pesan');
                }
                alert("Pesan berhasil dikirim ke buku tamu!");
                document.getElementById("nama").value = "";
                document.getElementById("pesan").value = "";
                document.getElementById("kehadiran").value = ""; // Reset kehadiran ke default
                tampilkanKomentar(API_URL, API_TOKEN);
            } catch (error) {
                console.error('Error submitting form:', error);
                alert("Terjadi kesalahan. Silakan coba lagi.");
            }
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan dalam memuat konfigurasi');
    }
});