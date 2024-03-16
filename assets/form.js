// get references needed for form logic
const formContainer = $('#form-container');

function generateDropdownList() {
  // init array of dropdown options
  // loop through later to create dropdown
  const dropdownOptions = [
    {
      value: 'audio',
      display: 'Audio Recordings',
    },
    {
      value: 'books',
      display: 'Books/PrintedMaterial',
    },
    {
      value: 'film-and-videos',
      display: 'Film, Videos',
    },
    {
      value: 'legislation',
      display: 'Legislation',
    },
    {
      value: 'manuscripts',
      display: 'Manuscripts/Mixed Material',
    },
    {
      value: 'maps',
      display: 'Maps',
    },
    {
      value: 'newspapers',
      display: 'Newspapers',
    },
    {
      value: 'photos',
      display: 'Photos, Print, Drawings',
    },
    {
      value: 'notated-music',
      display: 'Printed Music (such as sheet music)',
    },
    {
      value: 'web-archive',
      display: 'Web Archives',
    },
  ];

  // .map is a method that takes in an array, loops through the array, and returns a modified array
  // we return an array of <option> elements to append to <select> later
  // see bootstrap docs for element setup: https://getbootstrap.com/docs/5.3/forms/select/
  const dropdownEls = dropdownOptions.map(({ value, display }) => {
    // create - build - place
    const dropdownEl = $(`<option value="${value}">`);
    dropdownEl.text(display);

    // this return is for .map, otherwise mapped array will be undefined
    return dropdownEl;
  });
  // this return is for generateDropdownList function
  // we can apply this to select element's html directly when we create the form
  return dropdownEls;
}

// we create - build - place all of the elements necessary for the form
function createForm() {
  // create all elements
  const form = $('<form class="d-flex flex-column gap-2">');
  const headingEl = $('<h1>');
  const inputEl = $(
    '<input type="text" class="form-control" placeholder="Search!">'
  );
  const dropdownEl = $('<select class="form-select">');
  const submitEl = $('<button type="submit" class="btn btn-success">');

  // build elements
  headingEl.text('Library of Congress Search Engine');
  dropdownEl.html(generateDropdownList()); // we call the generateDropdownList function here. Since it returned an array of <option> elements, we can apply it to the html directly here
  submitEl.text('Click Me');

  //place all elements
  form.append(headingEl).append(inputEl).append(dropdownEl).append(submitEl);
  formContainer.append(form);

  // return element so we can use these in other functions
  // see object destructuring for this syntax: https://www.w3schools.com/react/react_es6_destructuring.asp
  return { form, inputEl, dropdownEl, submitEl };
}

async function fetchData({ inputEl, dropdownEl }) {
  // create url with form values
  const url = `https://www.loc.gov/${dropdownEl.val()}/?q=${inputEl.val()}&fo=json`;
  try {
    // fetch data
    const res = await fetch(url);
    const data = await res.json();
    // loop through array and create new array of necessary data
    const articlesArray = data.content.results.map((article) => {
      // return object to map with necessary data
      return {
        title: article.title,
        date: article.date,
        subject: article.subject,
        // description might be undefined, if undefined return 'no description...'
        description: article.description
          ? article.description
          : ['No description for this entry.'],
      };
    });
    // need title, date, subject, description
  } catch (error) {
    console.error(error);
  }
}
function handleSubmit(e, { inputEl, dropdownEl }) {
  // prevent auto refresh on form submit
  e.preventDefault();

  // we can get access to the elements here, as well as their value like so
  // console.log(inputEl, inputEl.val());
  // console.log(dropdownEl, dropdownEl.val());
  if (location.pathname === '/index.html') {
    location.assign(
      `./results.html?format=${dropdownEl.val()}&search?query=${inputEl.val()}`
    );
  } else {
    fetchData({ inputEl, dropdownEl });
  }
}

// this function runs when the document is ready for dom manipulation
$(document).ready(function () {
  // eg. formEls = { form: form, inputEl: inputEl, dropdownEl: drop...}
  const formEls = createForm();

  // on runs handleSubmit function when form is submitted
  formEls.form.on('submit', (e) => handleSubmit(e, formEls));
});
