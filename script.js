let button = document.querySelector("#button")
let container = document.querySelector("#container")
let max = 40

button.addEventListener("click", e => {
  search()
})

window.addEventListener("keypress", e => {
  if (e.keyCode == 13) {
    search()
  }
})

const search = () => {
  let query = document.querySelector("#input").value
  getCheapBooks(query)
}

async function getCheapBooks(query) {
  if (container.style.visibility == "hidden") {
    container.style.visibility = "visible"
  }
  container.innerHTML = "Loading..."
  let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${max}&key=AIzaSyCI4ZK774sY9aOofAIPkfo2FnAcE-NMuE0`)
  let books = await response.json()
  let cheapBooks = []
  for (let i = 0; i < max; i++) {
    let book = books.items[i]
    if (book.saleInfo.saleability == "FOR_SALE" && (book.saleInfo.listPrice.amount < 10 || book.saleInfo.retailPrice.amount < 10) ) {
      cheapBooks.push(book)
    }
  }
  postBooks(cheapBooks)
}

const postBooks = (books) => {
  container.innerHTML = ""
  if (books.length > 0) {
    for (let i = 0; i < books.length; i++) {
      let str = ""
      str += `<div>`
      str += `<h2>${books[i].volumeInfo.title}</h2>`
      str += `<h3>$${books[i].saleInfo.listPrice.amount} list price</h3>`
      str += `<h3>$${books[i].saleInfo.retailPrice.amount} retail price</h3>`
      str += `<p><a href="${books[i].volumeInfo.previewLink}" target="_blank">Preview</a></p>`
      str += `</div>`
      container.innerHTML += str
      console.log(books[i])
    }
  } else {
    container.innerHTML = "Sorry, no books were found. Please try again with a new query."
  }
  
}
