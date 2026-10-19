document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  function closeAllDropdowns() {
  document.querySelectorAll(".nav-item.has-children.open")
    .forEach(function (item) {
      item.classList.remove("open");

      var button = item.querySelector(".submenu-toggle");
      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });
}

  document.querySelectorAll(".nav-item.has-children").forEach(function (item) {
    var link = item.querySelector(":scope > a");

    item.addEventListener("mouseenter", function () {
      if (window.innerWidth > 640) {
        closeAllDropdowns(item);
        item.classList.add("open");
      }
    });

    item.addEventListener("mouseleave", function () {
      if (window.innerWidth > 640) item.classList.remove("open");
    });

    var submenuToggle = item.querySelector(".submenu-toggle");

if (submenuToggle) {
  submenuToggle.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var wasOpen = item.classList.contains("open");

    closeAllDropdowns();

    item.classList.toggle("open", !wasOpen);

    submenuToggle.setAttribute(
      "aria-expanded",
      String(!wasOpen)
    );
  });
}
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-item.has-children")) closeAllDropdowns();
  });

/* =====================================
   JUSTIFIED GALLERY LAYOUT
   ===================================== */

const gallery = document.querySelector(".justified-gallery");

if (gallery) {

  const items = Array.from(
    gallery.querySelectorAll(".justified-item")
  );

  function getTargetHeight() {
  const width = window.innerWidth;

  if (width <= 640) return 260;
  if (width <= 1000) return 350;

  return 450;
}

  function layoutGallery() {

    const galleryWidth = gallery.clientWidth;
    const gap = 4;
    const targetHeight = getTargetHeight();

    if (!galleryWidth) return;

    // Remove previous layout rows
    items.forEach(item => gallery.appendChild(item));

    gallery.querySelectorAll(".justified-row").forEach(
      row => row.remove()
    );

    let rowItems = [];
    let aspectRatioSum = 0;

    function createRow(row, isLastRow = false) {
  if (!row.length) return;

  const rowElement = document.createElement("div");
  rowElement.className = "justified-row";

  const totalGaps = gap * (row.length - 1);

  const rowRatioSum = row.reduce((sum, item) => {
    return sum + Number(item.dataset.width) / Number(item.dataset.height);
  }, 0);

  const rowHeight = isLastRow
    ? Math.min(targetHeight, (galleryWidth - totalGaps) / rowRatioSum)
    : (galleryWidth - totalGaps) / rowRatioSum;



      row.forEach(item => {

        const width = parseFloat(item.dataset.width);
        const height = parseFloat(item.dataset.height);
        const ratio = width / height;

        item.style.width = `${rowHeight * ratio}px`;
        item.style.height = `${rowHeight}px`;

        rowElement.appendChild(item);

      });

      gallery.appendChild(rowElement);
    }

    for (const item of items) {

      const width = parseFloat(item.dataset.width);
      const height = parseFloat(item.dataset.height);

      if (!width || !height) continue;

      const ratio = width / height;

      rowItems.push(item);
      aspectRatioSum += ratio;

      const totalGaps = gap * (rowItems.length - 1);

      const estimatedWidth =
        aspectRatioSum * targetHeight + totalGaps;

      if (estimatedWidth >= galleryWidth) {

        createRow(rowItems);

        rowItems = [];
        aspectRatioSum = 0;
      }
    }

    // Final incomplete row
    if (rowItems.length) {
      createRow(rowItems, true);
    }
  }

  // Initial layout
  layoutGallery();

  // Recalculate when window changes size
  let resizeFrame;

  window.addEventListener("resize", () => {
    cancelAnimationFrame(resizeFrame);

    resizeFrame = requestAnimationFrame(
      layoutGallery
    );
  });
}

  if (window.GLightbox) {
    GLightbox({ selector: ".glightbox", touchNavigation: true, loop: false });
  }
});
