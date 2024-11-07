function getYourRatings() {
    const jwt = localStorage.getItem('jwt'); 
    const userId = localStorage.getItem('userId');
  
    if (!jwt) {
        alert('You need to log in to view your ratings.');
        return;
    }
  
    fetch(`http://musicboxd-aiven-env.eba-bbjzqugv.eu-north-1.elasticbeanstalk.com/api/auth/review/user/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); 
        displayRatings(data); 
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }
  
  function displayRatings(ratings) {
    document.getElementById('home-section').style.display = 'none'; 
    document.getElementById('ratingsContainer').style.display = 'block'; 
    const ratingsContainer = document.getElementById('ratingsContainer');
    ratingsContainer.innerHTML = ''; 
  
    if (ratings.length === 0) {
        ratingsContainer.innerHTML = '<p>No ratings available.</p>';
        return;
    }
  
    ratings.forEach(rating => {
        const ratingElement = document.createElement('div');
        ratingElement.classList.add('rating');
  
        ratingElement.innerHTML = `
            <h3>${rating.reviewTitle}</h3>
            <p>${rating.reviewText}</p>
            <p>Rating: ${rating.rating}</p>
            <p>URI: ${rating.uris}</p>
            <hr>
        `;
  
        ratingsContainer.appendChild(ratingElement);
    });
  }