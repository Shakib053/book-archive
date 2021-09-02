

//search for the books by name
const searchBook = () => {
  const seachField = document.getElementById('input-field');
  const searchText = seachField.value;
  const searchArea = document.getElementById('search-container');
  const TotalSearchNumber = document.getElementById('total-result');
  TotalSearchNumber.textContent = '';
  searchArea.textContent = '';
  seachField.value = '';
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then(res => res.json())
    .then(data => loadSearchResult(data));
};


//load the search result and show it into the container
const loadSearchResult = (data) => {
  const searchArea = document.getElementById('search-container');
  const TotalSearchNumber = document.getElementById('total-result');
  const totalBooks = data.numFound;
  const books = data.docs;

  //if no such book is found then show error message
  let div = document.createElement('div');
  if (totalBooks === 0) {
    div.innerHTML = `
    <h1  class="text-center text-capitalize py-5"> No Results Found</h1> 
    `;
    TotalSearchNumber.appendChild(div);
  }
  //if books are found then show
  else {

    div.innerHTML = ` 
      <h1  class="text-center text-capitalize py-5"> Showing ${data.docs.length} out of ${totalBooks}</h1> 
      `;
    TotalSearchNumber.appendChild(div);

    books.forEach(book => {
      console.log(book);
      const div = document.createElement('div');
      div.classList.add('card-group');
      let url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
      let title = book.title;
      let author = book.author_name;
      let firstPublishYear = book.first_publish_year;
      let publishDate = book.publish_date;
      let publisher = book.publisher;

      //if result in undefined show unknown message
      if (title === undefined)
        title = 'unknown';
      if (author === undefined)
        author = 'unknown';
      if (book.cover_i === undefined) {
        url = 'images/no_cover.jpg';
        if (firstPublishYear === undefined)
          firstPublishYear = 'unknown';
        if (publishDate === undefined)
          publishDate = 'unknown';
        if (publisher === undefined)
          publisher = 'unknown';
      }
      div.innerHTML = `
        <div class="card">
        <img src="${url}" class="card-img-top" alt="...">
        <div class="card-body pt-4">
          <h5 class="card-title">Title : <b>${title}</b></h5>
          <h5 class="card-title">Author : <b>${author}</b></h5>
          <h6 class="card-title">First Publish Year : <b>${firstPublishYear}</b></h6>
          <h6 class="card-title">Publish Dates :  <b>${publishDate}</b></h6>
          <h6 class="card-title">Publisher : <b> <i>${publisher}</b><i></h6>
        </div>
      </div>
        `;
      searchArea.appendChild(div);
    });
  }
}


