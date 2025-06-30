document.addEventListener('DOMContentLoaded', function () {
  const burgerBtn = document.getElementById('burger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  burgerBtn.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
  });
});
