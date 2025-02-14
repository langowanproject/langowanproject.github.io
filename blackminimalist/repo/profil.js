document.addEventListener("DOMContentLoaded", function () {
    // Kode JavaScript untuk memasukkan kode HTML
    const profil = `
    <div class="card-container">
        <h3>Bride & Groom</h3>
        <div class="card-wrap">
            <div class="card1 top">
                <h4 class="judul-quotes1"></h4>
                <p class="quotes1"></p>
                <h5 class="sumber-quotes1"></h5>
            </div>
        </div>
        <div class="card-wrap">
            <div class="card4 left">
                <div class="box bride-image"></div>
                <h4 class="bride"></h4>
                <p class="biodata-bride"></p>
                <div class="item-acara">
                    <span><h5 class="icon">c</h5></span>
                    <h5 class="alamat-bride"></h5>
                </div>
            </div>
            <div class="card5 right">
                <div class="box groom-image"></div>
                <h4 class="groom"></h4>
                <p class="biodata-groom"></p>
                <div class="item-acara">
                    <span><h5 class="icon">c</h5></span>
                    <h5 class="alamat-groom"></h5>
                </div>
            </div>
        </div>
        <div class="card-wrap">
            <div class="card2 bottom">
                <h4 class="judul-quotes2"></h4>
                <p class="quotes2"></p>
                <h5 class="sumber-quotes2"></h5>
            </div>
        </div>
    </div>
        `;
    
document.getElementById('profil').innerHTML = profil;
})
