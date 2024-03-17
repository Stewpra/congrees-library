const container = $('#results-container'); // Use jQuery to select the container

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
