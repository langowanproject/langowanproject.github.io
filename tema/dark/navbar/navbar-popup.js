document.addEventListener("DOMContentLoaded", function () {
    fetch("../data-input/data.txt")
        .then(response => response.text())
        .then(data => {
            const parsedData = parseDataFile(data);

            if (parsedData['url-video']) {
                insertVideo(parsedData['url-video']);
            } else {
                console.warn("URL video tidak ditemukan dalam data.txt");
            }

            insertNavbarAndMusic();
        })
        .catch(error => console.error("Gagal memuat data:", error));
});

// Fungsi untuk parsing data.txt
function parseDataFile(data) {
    const lines = data.split('\n');
    const result = {};

    for (const line of lines) {
        const trimmedLine = line.trim();

        if (!trimmedLine || trimmedLine.startsWith("==========")) continue;

        const separatorIndex = trimmedLine.indexOf(':');
        if (separatorIndex !== -1) {
            const key = trimmedLine.substring(0, separatorIndex).trim();
            const value = trimmedLine.substring(separatorIndex + 1).trim();
            result[key] = value;
        }
    }

    return result;
}

// Variabel global untuk musik
let track = new Audio("../navbar/music.mp3");
let wasMusicPlaying = false; // Untuk menyimpan status musik sebelum video diputar

// Fungsi untuk menghentikan musik saat video diputar
function pauseMusic() {
    if (!track.paused) {
        wasMusicPlaying = true; // Simpan status musik
        track.pause();
        updateMusicIcon();
    } else {
        wasMusicPlaying = false; // Musik belum diputar sebelumnya
    }
}

// Fungsi untuk melanjutkan musik saat video dijeda (hanya jika sebelumnya diputar)
function resumeMusic() {
    if (wasMusicPlaying) {
        track.play();
        updateMusicIcon();
    }
}

// Fungsi untuk memperbarui ikon play/pause
function updateMusicIcon() {
    const controlBtn = document.getElementById('play-pause');
    if (controlBtn) {
        controlBtn.className = track.paused ? "play" : "pause";
    }
}

// Fungsi untuk memasukkan video
function insertVideo(videoURL) {
    if (!videoURL) {
        console.error("Video URL tidak valid");
        return;
    }

    const videoHTML = `
        <video width="90%" height="auto" controls controlsList="nodownload" id="mainVideo">
            <source src="${videoURL}" type="video/mp4">
            Browser Anda tidak mendukung tag video.
        </video>
    `;

    const inputVideo = document.getElementById('video');
    if (inputVideo) {
        inputVideo.innerHTML = videoHTML;

        // Ambil elemen video setelah dimasukkan ke dalam DOM
        const videoElement = document.getElementById("mainVideo");
        if (videoElement) {
            videoElement.addEventListener("play", pauseMusic);
            videoElement.addEventListener("pause", resumeMusic);
        }
    } else {
        console.error("Elemen dengan ID 'video' tidak ditemukan.");
    }
}

// Fungsi untuk memasukkan navbar dan musik
function insertNavbarAndMusic() {
    const navbarHTML = `
        <nav>
            <ul>
                <li>
                    <a class="nav-icon active" href="#home">1</a>
                    <a class="nav-icon" href="#profil">2</a>
                    <a class="nav-icon" href="#acara">3</a>
                    <a class="nav-icon" href="#galeri">4</a>
                    <a class="nav-icon" href="#cerita">5</a>
                    <a class="nav-icon" href="#gift">6</a>
                    <a class="nav-icon" href="#ucapan">7</a>
                    <span id="play-pause" class="pause"></span>
                </li>
            </ul>
        </nav>
    `;

    const navbarElement = document.getElementById('navbar');
    if (navbarElement) {
        navbarElement.innerHTML = navbarHTML;
    } else {
        console.error("Element dengan ID 'navbar' tidak ditemukan.");
    }

    // Kode untuk navbar scroll
    const articles = document.querySelectorAll("article");
    const navLinks = document.querySelectorAll("li a");

    window.onscroll = () => {
        const top = window.scrollY;
        articles.forEach((article) => {
            const offset = article.offsetTop - 150;
            const height = article.offsetHeight;
            const id = article.getAttribute("id");

            if (top >= offset && top < offset + height) {
                navLinks.forEach((link) => link.classList.remove("active"));
                const activeLink = document.querySelector(`li a[href*="${id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    };

    // Musik
    const controlBtn = document.getElementById('play-pause');

    function togglePlayPause() {
        if (track.paused) {
            track.play();
            wasMusicPlaying = true; // Tandai bahwa musik sedang berjalan
        } else {
            track.pause();
            wasMusicPlaying = false;
        }
        updateMusicIcon();
    }

    if (controlBtn) {
        controlBtn.addEventListener("click", togglePlayPause);
    }

    track.addEventListener("ended", () => {
        updateMusicIcon();
    });

    // Kode untuk close popup
    const closeButton = document.querySelector(".close");
    if (closeButton) {
        closeButton.addEventListener("click", () => {
            const popup = document.querySelector(".popup");
            if (popup) {
                popup.style.display = "none";
                track.play();
                wasMusicPlaying = true; // Pastikan status musik diperbarui
                updateMusicIcon();
                document.body.scrollIntoView();
            }
        });
    }
}