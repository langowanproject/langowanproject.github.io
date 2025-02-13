document.addEventListener("DOMContentLoaded", function () {
    // Kode JavaScript untuk memasukkan kode HTML
    const home = `
        <div class="home-container">
        <div class="home-background"></div>
        <div class="home-wrap">
            <div class="home-content">
                <p>The Wedding Of</p>
                <div class="home-content-1">
                    <h1 class="groom"></h1>
                    <h1 class="h1">dan</h1>
                    <h1 class="bride"></h1>
                </div>
                <div class="home-content-2">
                    <div class="line"></div>
                    <h5 class="tanggal-acara1 text-shadow"></h3>
                    <div class="line"></div>
                </div>
            </div>
                <!-- Daun di sudut kiri atas -->
                <div class="floral kiri-atas gerakkiri2">
                    <img class="" src="assets/floral1.webp" alt="Daun Kiri Atas" width="170">
                </div>
    
                <!-- Daun di sudut kanan bawah -->
                <div class="floral kanan-bawah gerakkanan1">
                    <img class="" src="assets/floral2.webp" alt="Daun Kanan Bawah" width="200">
                </div>
        </div>
        </div>
        `;
    
document.getElementById('home').innerHTML = home;
})
