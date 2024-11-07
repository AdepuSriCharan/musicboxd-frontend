function hideAllSections() {
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('ratingsContainer').style.display = 'none';
    document.getElementById('albumDisplay').style.display = 'none';
}


function showHomePage() {
    hideAllSections(); 
    document.getElementById('home-section').style.display = 'block';
    fetchTrendingAlbums(); 
}

function showReviewForm() {
    document.getElementById('reviewOverlay').style.display = 'block';
}

function hideReviewForm() {
    document.getElementById('reviewOverlay').style.display = 'none';
}


function showAlbumDetails(albumId) {
    hideAllSections(); 
    document.getElementById('albumDisplay').style.display = 'block';
    fetchAlbumDetails(albumId);
}

function getYourRatings() {
    hideAllSections(); 
    document.getElementById('ratingsContainer').style.display = 'block';
    fetchUserRatings();
}


