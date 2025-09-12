// Smooth scroll for navbar
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Scroll down arrow
document.querySelector('.down-arrow').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('#events').scrollIntoView({ behavior: 'smooth' });
});

// Redirect to Streamlit dashboard
function goToDashboard() {
  window.location.href = "https://buildathon2025-ktf7ybysdjeyyrlabge8az.streamlit.app/";
}
