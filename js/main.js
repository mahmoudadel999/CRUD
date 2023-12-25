var inputName = document.getElementById('inputName'),
  inputUrl = document.getElementById('inputUrl'),
  btnSubmit = document.getElementById('btnSubmit'),
  alertText = document.getElementById('alertText'),
  closeAlert = document.getElementById('closeAlert'),
  tableData = document.getElementById('tableData');

var regexSiteName = /\w{3,}/;
var regexInputUrl =
  /^(https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

var listOfWebsites = [];

if (localStorage.getItem('WebSite') != null) {
  listOfWebsites = JSON.parse(localStorage.getItem('WebSite'));
  displayWebsites();
}

// ! ====> Add Website
function addWebsite() {
  var website = {
    name: inputName.value,
    url: inputUrl.value,
  };

  if (
    regexSiteName.test(inputName.value) &&
    regexInputUrl.test(inputUrl.value)
  ) {
    listOfWebsites.push(website);
    localStorage.setItem('WebSite', JSON.stringify(listOfWebsites));
  } else {
    alertText.classList.add('d-block');
  }

  displayWebsites();

  clearInputs();
}

// * ====> Validation
function validationWebsite() {
  var matchInputName = inputName.value;
  var matchInputUrl = inputUrl.value;

  // ^ ======>  Input Site Name
  if (regexSiteName.test(matchInputName)) {
    inputName.classList.add('is-valid');
    inputName.classList.remove('is-invalid');
    inputName.classList.add('valid');
    inputName.classList.remove('not-valid');
  } else {
    inputName.classList.remove('is-valid');
    inputName.classList.add('is-invalid');
    inputName.classList.remove('valid');
    inputName.classList.add('not-valid');
  }

  // ^ ======>  Input Site URL
  if (regexInputUrl.test(matchInputUrl)) {
    inputUrl.classList.add('is-valid');
    inputUrl.classList.remove('is-invalid');
    inputUrl.classList.add('valid');
    inputUrl.classList.remove('not-valid');
  } else {
    inputUrl.classList.remove('is-valid');
    inputUrl.classList.add('is-invalid');
    inputUrl.classList.remove('valid');
    inputUrl.classList.add('not-valid');
  }
}

closeAlert.onclick = function () {
  alertText.classList.remove('d-block');
};

// ^ ====> Display
function displayWebsites() {
  var container = '';

  for (var i = 0; i < listOfWebsites.length; i++) {
    container += `<tr class="align-middle">
    <td>${i + 1}</td>
    <td>${listOfWebsites[i].name}</td>
    <td>
      <a href="${listOfWebsites[i].url}" target="_blank">
        <button class="btn btn-success text-capitalize border-0">
          <i class="me-1 fa-solid fa-eye text-white"></i>
          visit
        </button>
      </a>
    </td>
    <td class="d-flex justify-content-center align-content-center">
      <button class="btn btn-danger text-capitalize border-0" onclick="deleteItem(${i})">
        <i class="me-1 fa-solid fa-trash-can text-white"></i>
        delete
      </button>
    </td>
  </tr>`;
  }

  tableData.innerHTML = container;
}

// & ====> Delete Item
function deleteItem(index) {
  listOfWebsites.splice(index, 1);
  localStorage.setItem('WebSite', JSON.stringify(listOfWebsites));
  displayWebsites();
}

// ~ ====> Clear Inputs
function clearInputs() {
  inputName.value = '';
  inputUrl.value = '';
}
