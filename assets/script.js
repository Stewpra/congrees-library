// Function to create a card element
function createCardElement({ title, date, subject, description, button }) {
  const card = $('<div>').addClass('card');
  card.html(`
  <h2>${title}</h2>
  <p>Date: ${date}</p>
  <p>Subject: ${subject}</p>
  <p>Description: ${description}</p>
  <button data-id="${button}">Read More</button>
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
