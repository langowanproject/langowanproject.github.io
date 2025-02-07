document.addEventListener("DOMContentLoaded", function () {
    // Kode JavaScript untuk memasukkan kode HTML
    const profil = `
    <h3>Bride & Groom</h3>
    <div class="card-container">
        <div class="card-wrap">
            <div class="card bottom">
                <h4>One Love United in Christ</h4>
                <p>"Sebab itu seorang laki-laki akan meninggalkan ayahnya dan ibunya dan bersatu dengan istrinya, sehingga keduanya menjadi satu daging."</p>
                <h5>Kejadian 2 : 24</h5>
            </div>
        </div>
        <div class="card-wrap">
            <div class="card left">
                <div class="box bride-image"></div>
                <h4 class="bride"></h4>
                <p class="biodata-bride"></p>
                <div class="item-acara">
                    <span><h5 class="icon">c</h5></span>
                    <h5 class="alamat-bride"></h5>
                </div>
            </div>
            <div class="card right">
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
            <div class="card bottom">
                <p>"Have a good and godly marriage that shows the world Christ's love through how you sacrificially love and serve one another."</p>
                <h5>—John Stange</h5>
            </div>
        </div>
    </div>
        `;
    
document.getElementById('profil').innerHTML = profil;
})
