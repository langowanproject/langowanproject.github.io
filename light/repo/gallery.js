document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.getElementById('thumbnails');
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.getElementById("closeBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let imageArray = [];
  let totalImages = 0;
  let currentImageIndex = 0;

  // Fungsi untuk membaca dan memproses data.txt
  function loadData() {
    fetch('data-input/data.txt')
      .then(response => response.text())
      .then(data => {
        const lines = data.split('\n');
        let isGallerySection = false;

        lines.forEach(line => {
          if (line.includes("========== \"GALLERY\" ==========")) {
            isGallerySection = true;
          } else if (isGallerySection && line.includes("gambar:")) {
            imageArray = line.split("gambar:")[1].trim().split(", ");
            totalImages = imageArray.length;
            renderThumbnails();
          }
        });
      })
      .catch(error => console.error('Error loading data:', error));
  }

  // Fungsi untuk merender thumbnail gambar
  function renderThumbnails() {
    imageArray.forEach((imageUrl, index) => {
      const img = document.createElement("img");
      img.classList.add("bottom");
      img.src = imageUrl;
      img.onclick = () => openModal(imageUrl, index);
      thumbnails.appendChild(img);
    });
  }

  function openModal(imageUrl, index) {
    modal.style.display = "block";
    modalImg.src = imageUrl;
    currentImageIndex = index;
    document.body.style.overflow = "hidden";
  }

  closeBtn.onclick = function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  prevBtn.onclick = function () {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    modalImg.src = imageArray[currentImageIndex];
  }

  nextBtn.onclick = function () {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    modalImg.src = imageArray[currentImageIndex];
  }

  // Fungsi slide mobile
  let touchStartX = 0;
  let touchEndX = 0;

  modalImg.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
  });

  modalImg.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
      nextBtn.click();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      prevBtn.click();
    }
  }

  // Memuat data saat halaman dimuat
  loadData();
});