const apiBaseUrl = 'https://my-maintenance-tracker.herokuapp.com/api/v1';
const btnMenu = document.getElementById('menu');
const btnCreateRequest = document.getElementById('btn-add-request');
const btnCloseCreateRequest = document.getElementById('btn-close-add-request');
const btnCloseUpdateRequest = document.getElementById('btn-close-update-request');
const btnCloseViewRequest = document.getElementById('btn-close-view-request');
const btnLogOut = document.getElementById('logout');
const indexPage = document.getElementById('index-page');

/**
 * Toggles Modals
 *
 * @param {string} id - The id of the Modal to be toggled
 */
const toggleModal = (id) => {
  if (document.getElementById('modal').style.display === 'block') {
    document.getElementById('modal').style.display = 'none';
    document.getElementById(id).style.display = 'none';
  } else {
    document.getElementById('modal').style.display = 'block';
    document.getElementById(id).style.display = 'block';
  }
};

/**
 * Displays a custom message
 *
 * @param {string} message - The message to be displayed on the alert
 */
const displayAlert = (message) => {
  document.getElementById('display').style.display = 'block';
  document.getElementById('alert').innerHTML = message;
  setTimeout(() => {
    document.getElementById('display').style = 'none';
  }, 4000);
};

const userLoggedIn = () => {
  fetch(`${apiBaseUrl}/requests`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.token}` },
  }).then(response => response.json()).then((response) => {
    const indexNav = document.getElementById('nav');
    switch (response.code) {
      case 200:
        indexNav.innerHTML = '<li><a href="admin.html"><button class="ch-btn-round"> Dashboard </button></a></li><li><button class="ch-btn-round" id="logout"> Logout </button></li>';
        break;
      case 403:
        indexNav.innerHTML = '<li><a href="admin.html"><button class="ch-btn-round"> Dashboard </button></a></li><li><button class="ch-btn-round" id="logout"> Logout </button></li>';
        break;
      default:
        indexNav.innerHTML = '<li><a href="signin.html"><button class="ch-btn-round"> Login </button></a></li><li><a href="signup.html"><button class="ch-btn-round"> Signup </button></a></li>';
        break;
    }
  }).catch(() => {
    displayAlert('Error connecting to our servers');
  });
};

if (btnMenu) {
  /**
 * Toggles the navigation bar on small devices
 */
  btnMenu.addEventListener('click', () => {
    if (document.getElementById('nav').style.display === 'none') {
      document.getElementById('nav').style.display = 'block';
    } else {
      document.getElementById('nav').style.display = 'none';
    }
  });
}

if (btnCreateRequest) {
  btnCreateRequest.addEventListener('click', () => toggleModal('add-request'));
}

if (btnCloseCreateRequest) {
  btnCloseCreateRequest.addEventListener('click', () => toggleModal('add-request'));
}

if (btnCloseUpdateRequest) {
  btnCloseUpdateRequest.addEventListener('click', () => toggleModal('update-request'));
}

if (btnCloseViewRequest) {
  btnCloseViewRequest.addEventListener('click', () => toggleModal('view-request'));
}

if (btnLogOut) {
  btnLogOut.addEventListener('click', () => {
    localStorage.token = 'empty';
    document.location.replace('index.html');
  });
}

if (indexPage) {
  indexPage.addEventListener('load', () => userLoggedIn());
}
