// Function to create a card element
function createCardElement({ title, date, subject, description, button }) {
  const card = $("<div>").addClass("card col-12 p-2");
  const formattedSubject = subject.join(", ");
  card.html(`
      <h2>${title}</h2>
      <p>Date: ${date}</p>
      <p>Subjects: ${formattedSubject}</p>
      <p>Description: ${description}</p>
      <a href="${button}" class="btn btn-primary" data-id="${button}">Read More</a>
    `);

  card.addClass("card mb-3");
  card.find("h2").addClass("card-title");
  card.find("p").addClass("card-text");
  card.find("a").addClass("btn btn-primary col-3");

  return card;
}
