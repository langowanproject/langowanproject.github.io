document.addEventListener("DOMContentLoaded", function () {

  const thumbnails = document.getElementById('thumbnails');
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.getElementById("closeBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const imageArray = [
      "dark/assets/gallery/001.webp",
      "dark/assets/gallery/002.webp",
      "dark/assets/gallery/003.webp",
      "dark/assets/gallery/004.webp",
      "dark/assets/gallery/005.webp",
      "dark/assets/gallery/006.webp",
      "dark/assets/gallery/007.webp",
      "dark/assets/gallery/008.webp",
      // Tambahkan gambar lainnya di sini
  ];

  const totalImages = imageArray.length; // Hitung jumlah gambar secara otomatis

  let currentImageIndex = 0;

  imageArray.forEach((imageUrl, index) => {
      const img = document.createElement("img");
      img.classList.add("bottom");
      img.src = imageUrl;
      img.onclick = () => openModal(imageUrl, index);
      thumbnails.appendChild(img);
  });

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
});
