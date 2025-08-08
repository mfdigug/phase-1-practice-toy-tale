let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  //Build Toy Card
  function renderOneToy(toy){
    let toyCard = document.createElement('div')
    toyCard.className = 'card'
    toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img class="toy-avatar" src= "${toy.image}" />
    <p> <span>${toy.likes}</span> Likes </p>
    <button class="like-btn" id="${toy.id}"> Like ❤️ </button>    
    `
    //Add animal card to DOM
    document.querySelector('#toy-collection').appendChild(toyCard)

    //Add event listener to like button and increase likes
    toyCard.querySelector(".like-btn").addEventListener('click', () => {
      toy.likes+= 1;
      toyCard.querySelector('span').textContent = toy.likes;
      updateLikes(toy)
    });    
  }

  //add toy via form
  //add event listener to form
  document.querySelector('.add-toy-form').addEventListener('submit', handleSubmit)

  //render new toy using form submission
  function handleSubmit(e){
    e.preventDefault()
    let newToy = {
      name:e.target.name.value,
      image:e.target.image.value,
      likes:0
    };
    console.log(newToy);
    renderOneToy(newToy);
    addNewToy(newToy);
  } 

  //Fetch Requests
  function getAllToys(){
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => toys.forEach((toy) => renderOneToy(toy)))
  }
  getAllToys()

  function addNewToy(newToy) {
   fetch('http://localhost:3000/toys',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify(newToy)
     })
    .then(res => res.json())
  }

  function updateLikes(toyObj){
    fetch(`http://localhost:3000/toys/${toyObj.id}`,{
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify(toyObj)
     })
    .then(res => res.json())
    .then(toy => console.log(toy))

  }

});
