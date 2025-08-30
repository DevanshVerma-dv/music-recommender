import { NextResponse } from 'next/server';

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch access token from Spotify.');
  }

  const data = await response.json();
  return data.access_token;
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Missing search query' }, { status: 400 });
  }

  try {
    const accessToken = await getAccessToken();

    const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10&market=US`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      console.error('Spotify Search API Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch search results from Spotify.' }, { status: searchResponse.status });
    }

    const searchData = await searchResponse.json();
    
    const results = searchData.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map(artist => ({ name: artist.name })),
      album: {
        images: track.album.images,
      },
      preview_url: track.preview_url,
      external_urls: track.external_urls,
    }));

    return NextResponse.json(results);

  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
}