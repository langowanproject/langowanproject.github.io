// Membaca isi file data.txt
fetch('dark/data-input/data.txt')
  .then(response => response.text())
  .then(data => {
    // Membuat fungsi untuk mencari dan memasukkan nomor rekening
    function cariDanSetNomorRekening(tekstarget, inputId) {
      const startIndex = data.indexOf(tekstarget);
      if (startIndex !== -1) {
        const nomorRekening = data.substring(startIndex + tekstarget.length).trim();

        // Menggunakan regex untuk mengambil angka dari nomor rekening
        const angkaNomorRekening = nomorRekening.match(/\d+/);

        if (angkaNomorRekening) {
          document.getElementById(inputId).value = angkaNomorRekening[0];
        }
      }
    }

    // Memanggil fungsi untuk mencari dan memasukkan angka nomor rekening ke dalam input
    cariDanSetNomorRekening("rekening-1:", 'input-1');
    cariDanSetNomorRekening("rekening-2:", 'input-2');
    cariDanSetNomorRekening("rekening-3:", 'input-3');
    cariDanSetNomorRekening("rekening-4:", 'input-4');

  })
  .catch(error => {
    console.error(error);
  });
