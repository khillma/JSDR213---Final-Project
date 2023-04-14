// whiteboarding:
    // I want to create an app that takes your favorite book as an input using the google books API (this should be enough to complete the assignment)
    // But then I also want to output two book recommendations based on the genre of that favorite book
    // aka: if you like that book, then you might like this book
    // So we need to have a text box for somebody to input their favorite book title and output only one result
    // We need a button to press to run the query and call the google books API
    // Upon running that query, it should also output a recommended book based on the output data
    // is there another API that we can use to search genre? NOt sure that the books API allows you to search based on genre
    // can use subject: https://www.googleapis.com/books/v1/volumes?q=subject:fiction
    // Should also have a button that let's somebody say that it isn't their favorite book, so to move onto the next option in the array
    // would that be easier to hard code or use a higher order function?
    // essentially this is two parts. 
    // Part 1) search for and retrieve a book using a query and api call
    // Part 2) use the first query to run a second query and second api call
    // might need to use next terminology to run one after the other rather than at the same time. 
    // might also just happen naturally
// psuedocode
    // variables for api key, button, text input, and outputs
    // axios get call to googleapis
    // pull in data including title, author, image
    // second axios call to googleapis
    // pull in second set of data including title, author, image
    // button to look at next option in the array]
    // make sure there are areas in the html for all of this to go (or populate new Divs)
// Once the code works, then use styles to make it pretty
// if there's time, then maybe embed a preview at the bottom using the embedded viewer API

// Edits to make if there is time:
    // if/else statement for subtitle - not every  book has them
    // fix the favorite author piece. It hasn't happened except in that one instance // for example, when I type in "the lord of the rings"
    // cycle through books if the first option isn't what you want



console.log("working")
const apiKey = "AIzaSyAKfTN1i3K8XrREfjAEHmU6K2cFXjSTvHk"
// Favorite Book Variables
const imageDiv = document.querySelector("#image")
let booktitle1 = document.querySelector("#bookTitle")
let bookAuthor1 = document.querySelector("#author")
let bookDescription = document.querySelector("#description")
let button = document.querySelector("#searchButton")
// Recommendation 1 Variables
const rec1imageDiv = document.querySelector("#image2")
let rec1TitleH2 = document.querySelector("#rec1Title")
let rec1AuthorH2 = document.querySelector("#rec1author")
let rec1DescriptionP = document.querySelector("#rec1description")
// recommendation 2 variables
const rec2imageDiv = document.querySelector("#image3")
let rec2TitleH2 = document.querySelector("#rec2Title")
let rec2AuthorH2 = document.querySelector("#rec2author")
let rec2DescriptionP = document.querySelector("#rec2description")
// recommendation 3 variables
const rec3imageDiv = document.querySelector("#image4")
let rec3TitleH2 = document.querySelector("#rec3Title")
let rec3AuthorH2 = document.querySelector("#rec3author")
let rec3DescriptionP = document.querySelector("#rec3description")



button.addEventListener('click', async () => {
    let input = document.querySelector("#inputBar").value
    // gathering the data for favorite book
    let response = await axios.get(`https://www.googleapis.com/books/v1/volumes/?q=${input}&key=${apiKey}&maxResults=1`)
    let favoriteTitle = response.data.items[0].volumeInfo.title
    // let favoriteSubtitle = response.data.items[0].volumeInfo.subtitle
    let favoriteBAuthor = response.data.items[0].volumeInfo.authors[0]
    let tempImage = response.data.items[0].volumeInfo.imageLinks.thumbnail
    let favBDescription = response.data.items[0].volumeInfo.description
    // injecting the outputs fo title, subtitle, author, image
    booktitle1.innerHTML = `${favoriteTitle}`
    bookAuthor1.innerHTML = `By ${favoriteBAuthor}`
    imageDiv.innerHTML = `<image src = ${tempImage}>`
    bookDescription.innerHTML = `Description: ${favBDescription}`

    // gathering the data for book rec 1
    let favBookGenre = response.data.items[0].volumeInfo.categories[0]
    // let randomNumber = (Math.floor(Math.random() * 20))
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
      }
    let randomNumber = getRandomInt(0,5)
    console.log(randomNumber)
    let response2 = await axios.get(`https://www.googleapis.com/books/v1/volumes/?q=subject:${favBookGenre}&key=${apiKey}&maxResults=30`)
    let recTitle = response2.data.items[randomNumber].volumeInfo.title
    console.log(recTitle)
    let recSubtitle = response2.data.items[randomNumber].volumeInfo.subtitle
    let recAuthor = response2.data.items[randomNumber].volumeInfo.authors[0]
    let recImage = response2.data.items[randomNumber].volumeInfo.imageLinks.thumbnail
    let recDescription = response2.data.items[randomNumber].volumeInfo.description
    // outputs for book rec 1
    rec1TitleH2.innerHTML = `${recTitle}`
    rec1AuthorH2.innerHTML = `By ${recAuthor}`
    rec1imageDiv.innerHTML = `<image src = ${recImage}>`
    rec1DescriptionP.innerHTML = `Description: ${recDescription}`

    // book rec 2
    let randomNumber2 = getRandomInt(6,10)
    let rec2Title = response2.data.items[randomNumber2].volumeInfo.title
    let rec2Subtitle = response2.data.items[randomNumber2].volumeInfo.subtitle
    let rec2Author = response2.data.items[randomNumber2].volumeInfo.authors[0]
    let rec2Image = response2.data.items[randomNumber2].volumeInfo.imageLinks.thumbnail
    let rec2Description = response2.data.items[randomNumber2].volumeInfo.description
    // outputs for book rec 1
    rec2TitleH2.innerHTML = `${rec2Title}`
    rec2AuthorH2.innerHTML = `By ${rec2Author}`
    rec2imageDiv.innerHTML = `<image src = ${rec2Image}>`
    rec2DescriptionP.innerHTML = `Description: ${rec2Description}`
    console.log(rec2Description)

   // book rec 3
   let randomNumber3 = getRandomInt(11,15)
   let rec3Title = response2.data.items[randomNumber3].volumeInfo.title
   let rec3Subtitle = response2.data.items[randomNumber3].volumeInfo.subtitle
   let rec3Author = response2.data.items[randomNumber3].volumeInfo.authors[0]
   let rec3Image = response2.data.items[randomNumber3].volumeInfo.imageLinks.thumbnail
   let rec3Description = response2.data.items[randomNumber3].volumeInfo.description
   // outputs for book rec 1
   rec3TitleH2.innerHTML = `${rec3Title}`
   rec3AuthorH2.innerHTML = `By ${rec3Author}`
   rec3imageDiv.innerHTML = `<image src = ${rec3Image}>`
   rec3DescriptionP.innerHTML = `Description: ${rec3Description}`
   console.log(rec3Description)
})