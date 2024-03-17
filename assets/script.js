const container = $('#results-container'); // Use jQuery to select the container

function initFetch() {
  const currentUrl = location.search;
  const searchParams = new URLSearchParams(currentUrl);
  const format = searchParams.get('format');
  const search = searchParams.get('search?query');
  return { format, search };
}

async function fetchData({ format, search }) {
  // create url with form values
  const url = `https://www.loc.gov/${format}/?q=${search}&fo=json`;
  try {
    // fetch data
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
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
        button: article.id,
      };
    });

    container.empty(); // Clear the container before appending new cards
    return articlesArray;
    // need title, date, subject, description
  } catch (error) {
    resultsHeading.text('Error');
    console.error(error);
  }
}

// Function to create a card element
function createCardElement({ title, date, subject, description, button }) {
  const card = $('<div class="card">');
  // subject may be undefined
  console.log(button);
  const formattedSubject = subject && subject.join(', ');
  card.html(`
  <div class='card-body d-flex flex-column gap-2'>
  <div>
      <h4 class='card=title'>${title ? title : 'Entry has no title'}</h4>
      <h5 class='card-subtitle mb-2 text-body-secondary'>Date: ${
        date ? date : 'Entry has no date'
      }</h5>
      </div>
      <div>
      <p class='card-text m-0 fw-semibold border-bottom'>Subjects</p>
      <p class='card-text m-0'>${
        subject ? formattedSubject : 'Entry has no subject'
      }</p></div>
      <div>
      <p class='card-text m-0 fw-semibold border-bottom'>Description</p>
      <p class='card-text m-0'>${
        description ? description : 'Entry has no description'
      }</p>
      </div>
      <a href="${button}" class="btn btn-success w-25 align-self-end" role='button'>Read More</a>
      </div>
    `);

  return card;
}

async function createCards(data) {
  try {
    const articlesData = await data;
    articlesData.forEach((article) => {
      const card = createCardElement(article);
      container.append(card); // Use jQuery to append the card element to the container
    });
  } catch (err) {
    console.error(err);
  }
}

function titleCaseString(str) {
  const words = str.split(' ');
  const capWords = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  return capWords;
}

function handleSubmit(e, { inputEl, dropdownEl }) {
  // prevent auto refresh on form submit
  e.preventDefault();

  location.assign(
    `./results.html?format=${dropdownEl.val()}&search?query=${inputEl.val()}`
  );
}

// this function runs when the document is ready for dom manipulation
$(document).ready(function () {
  // eg. formEls = { form: form, inputEl: inputEl, dropdownEl: drop...}
  const formEls = createForm();

  // on runs handleSubmit function when form is submitted
  formEls.form.on('submit', (e) => handleSubmit(e, formEls));
  const params = initFetch();

  // prevent fetching and creation of cards if no url parameters, notably on the home screen
  if (!params.format || !params.search) {
    return;
  }

  // get data from fetch request
  const data = fetchData(params);

  // change the heading to the search parameter in the url
  resultsHeading.text(titleCaseString(params.search));

  // create cards function
  createCards(data);
});
