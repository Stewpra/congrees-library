// Function to create a card element
function createCardElement(article) {
  const card = $("<div>").addClass("card");
  card.html(`
      <h2>${article.title}</h2>
      <p>Date: ${article.date}</p>
      <p>Subject: ${article.subject}</p>
      <p>Description: ${article.description}</p>
      <button data-id="${article.button}">Read More</button>
    `);

  return card;
}
