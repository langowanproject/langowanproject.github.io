// Fungsi untuk membaca file TXT dan memasukkan data ke dalam elemen HTML sesuai dengan class
function loadDataFromFile() {
    fetch('dark/data-input/data.txt')
        .then(response => response.text())
        .then(data => {
            const dataLines = data.split('\n'); // Memisahkan teks menjadi baris
            dataLines.forEach(line => {
                const [key, value] = line.split(': '); // Memisahkan data berdasarkan ":" sebagai pemisah
                const elements = document.getElementsByClassName(key.toLowerCase()); // Menyusun class dari teks kunci

                for (let i = 0; i < elements.length; i++) {
                    elements[i].textContent = value; // Memasukkan nilai ke elemen-elemen yang sesuai
                }
            });
        })
        .catch(error => console.error('Error:', error));
}

// Panggil fungsi loadDataFromFile() saat halaman dimuat
window.addEventListener('load', loadDataFromFile);
