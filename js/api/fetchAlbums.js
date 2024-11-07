async function fetchTrendingAlbums() {
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

        const playlistsResponse = await fetch('https://api.spotify.com/v1/browse/categories/toplists/playlists', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (!playlistsResponse.ok) throw new Error('Failed to fetch playlists');

        const playlistsData = await playlistsResponse.json();
        const trendingPlaylist = playlistsData.playlists.items[0]; 

        const albumsResponse = await fetch(`https://api.spotify.com/v1/playlists/${trendingPlaylist.id}/tracks`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (!albumsResponse.ok) throw new Error('Failed to fetch albums');

        const albumsData = await albumsResponse.json();
        const albums = albumsData.items.map(item => item.track.album);

        const albumsContainer = document.getElementById('albumsContainer');
        albumsContainer.innerHTML = ''; 
        albums.forEach(album => {
            const albumElement = document.createElement('div');
            albumElement.classList.add('album');
            albumElement.innerHTML = `
                <img src="${album.images[0].url}" alt="${album.name}" />
                <h3>${album.name}</h3>
                <p>By: ${album.artists.map(artist => artist.name).join(', ')}</p>
            `;
            albumElement.setAttribute('data-album-id', album.id); 

            albumElement.addEventListener('click', () => {
                loadAlbumDetails(album.id); 
            });

            albumsContainer.appendChild(albumElement);
        });
    } catch (error) {
        console.error('Error fetching trending albums:', error);
    }
}

fetchTrendingAlbums().then(albums => {
    if (albums) {
        const albumsContainer = document.getElementById('albumsContainer');
        albumsContainer.innerHTML = ''; 

        albums.forEach(album => {
            const albumElement = document.createElement('div');
            albumElement.classList.add('album');
            albumElement.innerHTML = `
                <img src="${album.images[0].url}" alt="${album.name}" />
                <h3>${album.name}</h3>
                <p>By: ${album.artists.map(artist => artist.name).join(', ')}</p>
            `;

            albumElement.setAttribute('data-album-id', album.id); 

            albumElement.addEventListener('click', () => {
                loadAlbumDetails(album.id); 
            });

            albumsContainer.appendChild(albumElement);
        });
    }
});

function cacheAlbums(albums) {
    const data = { albums, timestamp: Date.now() };
    localStorage.setItem('trendingAlbums', JSON.stringify(data));
}

albumElement.addEventListener('click', () => {
    loadAlbumDetails(album.id); 
});

