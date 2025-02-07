 document.addEventListener("DOMContentLoaded", function () {
    // Memasukkan kode HTML untuk video
    const video = `
        <video width="90%" max-width="500px" height="auto" controls controlsList="nodownload" id="mainVideo">
            <source src="https://ia601408.us.archive.org/10/items/video_20250205/video.mp4" type="video/mp4">
            Browser Anda tidak mendukung tag video.
        </video>
    `;

    const inputVideo = document.getElementById('video');
    if (inputVideo) {
        inputVideo.innerHTML = video;
    } else {
        console.error("Element dengan ID 'video' tidak ditemukan.");
    }
 });