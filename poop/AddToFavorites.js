
const addToFavoritesButtons = document.querySelectorAll('.add-to-favorites');


function addToFavorites(event) {
  
  const item = prompt('Enter the item you want to add to favorites:');

  if (item) {
    // Save the item to favorites 
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push(item);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    
    alert(`"${item}" added to favorites!`);
  } else {
    alert('Invalid input. Please try again.');
  }
}


addToFavoritesButtons.forEach(button => {
  button.addEventListener('click', addToFavorites);
});

