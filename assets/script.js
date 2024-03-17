const container = $('#results-container'); // Use jQuery to select the container

// Function to create a card element
function createCardElement({ title, date, subject, description, button }) {
  const card = $('<div class="card">');
  // subject may be undefined
  console.log(button);
  const formattedSubject = subject && subject.join(', ');
  card.html(`
  <div class='card-body'>
      <h5 class='card=title'>${title ? title : 'Entry has no title'}</h5>
      <h6 class='card-subtitle mb-2 text-body-secondary'>Date: ${
        date ? date : 'Entry has no date'
      }</h6>
      <p>Subjects: ${subject ? formattedSubject : 'Entry has no subject'}</p>
      <p>Description: ${
        description ? description : 'Entry has no description'
      }</p>
      <a href="${button}" class="btn btn-success" role='button'>Read More</a>
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
