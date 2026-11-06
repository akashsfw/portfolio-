// 1. Automatically update copyright year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Simple Dark / Light Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

// Load saved theme from localStorage, or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

// Toggle theme on button click
themeBtn.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  html.setAttribute('data-theme', newTheme);
  themeBtn.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', newTheme);
});
