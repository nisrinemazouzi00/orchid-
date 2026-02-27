// Dynamic API URL - works for both local and production
// For GitHub Pages (static), use empty string - login/register will show demo message
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3001'
  : '';

// Function to log in for an existing user

async function login() {
  // Check if API is available
  if (!API_URL) {
    alert('Demo Mode: Login functionality requires backend deployment.\n\nTo enable full features, deploy backend to Render.com');
    return;
  }

//1.Retrieving Input Values
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
//2. Sending Login Request
  const response = await fetch(`${API_URL}/login`, {
   method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
//3. Processing Response
   const data = await response.json();
  if (response.ok) {
    const token = data.token;
    localStorage.setItem('token', token); 

    window.location.href = 'home.html';
  } else {
    alert(data.message); 
  }
}

// Function to register a new user

async function register() {
  // Check if API is available
  if (!API_URL) {
    alert('Demo Mode: Registration functionality requires backend deployment.\n\nTo enable full features, deploy backend to Render.com');
    return;
  }

  //1. Retrieving Input Values:
  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  //2. Sending Registration Request:
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    //// Converts data to JSON string 
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  alert(data.message);
}


// Document ready event listener
document.addEventListener("DOMContentLoaded", () => {
  const basketItems = document.getElementById('basket-items');
  const basketTotal = document.getElementById('basket-total');
  let total = 0;

  document.querySelectorAll('.add-to-basket').forEach(button => {
    button.addEventListener('click', () => {
      const price = parseFloat(button.getAttribute('data-price'));
      const teaName = button.closest('.tea-content').querySelector('.tea-name').innerText;
      addItemToBasket(teaName, price);
      updateTotal(price);
    });
  });

  function addItemToBasket(name, price) {
    const li = document.createElement('li');
    li.textContent = `${name} - $${price.toFixed(2)}`;
    basketItems.appendChild(li);
  }

  function updateTotal(price) {
    total += price;
    basketTotal.textContent = `$${total.toFixed(2)}`;
  }
});

// Display tea items in a catalog based on the button clicked by the user
const catalogueBtns = document.querySelectorAll('.catalogue-btn');
const teaItems = document.querySelectorAll('.tea-item');
let activeBtn = "featured";

showTeaCatalogue(activeBtn);

catalogueBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    resetActiveBtn();
    showTeaCatalogue(btn.id);
    btn.classList.add('active-btn');
  });
});

function resetActiveBtn() {
  catalogueBtns.forEach((btn) => {
    btn.classList.remove('active-btn');
  });
}

function showTeaCatalogue(newCatalogueBtn) {
  activeBtn = newCatalogueBtn;
  teaItems.forEach((item) => {
    if (item.classList.contains(activeBtn)) {
      item.style.display = "grid";
    } else {
      item.style.display = "none";
    }
  });
}

// More About Us Button
const moreAboutBtn = document.getElementById('moreAboutBtn');
const moreAboutInfo = document.getElementById('moreAboutInfo');

moreAboutBtn.addEventListener('click', function(event) {
  event.preventDefault();

  // Toggle the display of additional information
  if (moreAboutInfo.style.display === 'none' || moreAboutInfo.style.display === '') {
    // Display the additional information if it is hidden
    moreAboutInfo.style.display = 'block';
  } else {
    // Hide the additional information if it's visible
    moreAboutInfo.style.display = 'none';
  }
});
