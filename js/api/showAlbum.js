async function loadAlbumDetails(albumId) {
    const clientId = 'ffef2340666e4115a952d357632147cd';
    const clientSecret = '6e14a2e3133b4203a2b64fe94f742a3a';
    const authUrl = 'https://accounts.spotify.com/api/token';

    try {
        const tokenResponse = await fetch(authUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
            },
            body: 'grant_type=client_credentials'
        });

        if (!tokenResponse.ok) throw new Error('Failed to get access token');

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        const albumDetailsResponse = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!albumDetailsResponse.ok) throw new Error('Failed to fetch album details');
        
        const albumDetails = await albumDetailsResponse.json();
        console.log("Hello");
        console.log(albumDetails);
        console.log(albumDetails);
        console.log("Hello");
        displayAlbumDetails(albumDetails); 
    } catch (error) {
        console.error('Error fetching album details:', error);
    }
}


function displayAlbumDetails(album) {
    document.getElementById('albumImage').src = album.images[0].url;
    document.getElementById('albumTitle').textContent = album.name;
    document.getElementById('albumDescription').textContent = album.description || 'No description available';
    document.getElementById('releaseDate').textContent = album.release_date;
    document.getElementById('tracksList').textContent = album.total_tracks;

    document.getElementById('albumUri').textContent = album.uri;

    const tracksContainer = document.getElementById('tracksList');
    tracksContainer.innerHTML = ''; 
    album.tracks.items.forEach((track, index) => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('track-item');
        
        const trackInfo = `
            <p><strong>${index + 1}. ${track.name}</strong></p>
            <p>Artist: ${track.artists.map(artist => artist.name).join(', ')}</p>
            <p>Duration: ${formatDuration(track.duration_ms)}</p>
        `;

        trackElement.innerHTML = trackInfo;
        tracksContainer.appendChild(trackElement);
    });

    document.getElementById('home-section').style.display = 'none';
    document.getElementById('ratingsContainer').style.display = 'none';

    document.getElementById('albumDisplay').style.display = 'block';
}

function formatDuration(durationMs) {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
