document.addEventListener("DOMContentLoaded", function () {
    // Memasukkan kode HTML untuk acara
    const acara = `
        <div class="card-wrap">
            <div class="card left">
                <p class="icon-acara">a</p>
                <h4>Pemberkatan Nikah</h4>
                <p class="tanggal-pemberkatan"></p>
                <p class="waktu-pemberkatan"></p>
                <div class="item-acara">
                    <h5 class="icon">c</h5>
                    <h5 class="tempat-pemberkatan"></h5>
                </div>
                <button type="button" id="button-pemberkatan"><h5>Detail Lokasi</h5></button>
            </div>
            <div class="card right">
                <p class="icon-acara">b</p>
                <h4>Resepsi Pernikahan</h4>
                <p class="tanggal-resepsi"></p>
                <p class="waktu-resepsi"></p>
                <div class="item-acara">
                    <h5 class="icon">c</h5>
                    <h5 class="tempat-resepsi"></h5>
                </div>
                <button type="button" id="button-resepsi"><h5>Detail Lokasi</h5></button>
            </div>
        </div>
    `;

    const inputAcara = document.getElementById('input-acara');
    if (inputAcara) {
        inputAcara.innerHTML = acara;
    } else {
        console.error("Element dengan ID 'input-acara' tidak ditemukan.");
    }

    // Memasukkan kode HTML untuk tombol countdown
    const countdownBtn = `
        <button type="button" id="button-kalender"><h5>Lihat Kalender</h5></button>
    `;

    const countdownBtnContainer = document.getElementById('countdown-btn');
    if (countdownBtnContainer) {
        countdownBtnContainer.innerHTML = countdownBtn;
    } else {
        console.error("Element dengan ID 'countdown-btn' tidak ditemukan.");
    }

    // Memuat data dari file data.txt
    fetch('/data-input/data.txt')
        .then((response) => response.text())
        .then((data) => {
            const lines = data.split('\n');
            const urls = lines.filter(line => line.startsWith("url-")).map(line => line.split(": ")[1].trim());

            // Memasukkan URL ke tombol pemberkatan
            if (urls.length > 0) {
                const urlToOpen = urls[0];
                const buttonPemberkatan = document.getElementById('button-pemberkatan');
                if (buttonPemberkatan) {
                    buttonPemberkatan.addEventListener("click", function () {
                        window.open(urlToOpen, "_blank");
                    });
                } else {
                    console.error("Tombol pemberkatan tidak ditemukan.");
                }
            } else {
                console.error("URL pemberkatan tidak ditemukan.");
            }

            // Memasukkan URL ke tombol resepsi
            if (urls.length > 1) {
                const urlToOpen = urls[1];
                const buttonResepsi = document.getElementById('button-resepsi');
                if (buttonResepsi) {
                    buttonResepsi.addEventListener("click", function () {
                        window.open(urlToOpen, "_blank");
                    });
                } else {
                    console.error("Tombol resepsi tidak ditemukan.");
                }
            } else {
                console.error("URL resepsi tidak ditemukan.");
            }

            // Memasukkan URL ke tombol kalender
            if (urls.length > 2) {
                const urlToOpen = urls[2];
                const buttonKalender = document.getElementById('button-kalender');
                if (buttonKalender) {
                    buttonKalender.addEventListener("click", function () {
                        window.open(urlToOpen, "_blank");
                    });
                } else {
                    console.error("Tombol kalender tidak ditemukan.");
                }
            } else {
                console.error("URL kalender tidak ditemukan.");
            }
        })
        .catch((error) => {
            console.error("Gagal memuat data: " + error);
        });
});


