// get references needed for form logic
const formContainer = $('#form-container');

function generateDropdownList() {
  const dropdownOptions = [
    {
      value: 'audio',
      display: 'AudioRecordings',
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

  const dropdownEls = dropdownOptions.map(({ value, display }) => {
    const dropdownEl = $(`<option value="${value}">`);
    dropdownEl.text(display);
    return dropdownEl;
  });
  return dropdownEls;
}
function createForm() {
  // create all elements
  const form = $('<form>');
  const headingEl = $('<h1>');
  const input = $(
    '<input type="text" class="form-control" placeholder="Search!">'
  );
  const dropdown = $('<select class="form-select">');
  const submit = $('<button type="submit" class="btn btn-primary">');

  // build elements
  headingEl.text('Library of Congress Search Engine');
  dropdown.html(generateDropdownList());
  submit.text('Click Me');

  //place all elements
  form.append(headingEl).append(input).append(dropdown).append(submit);

  formContainer.append(form);
}

createForm();
