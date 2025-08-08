import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// --- Load Model Data ---
// This function now only needs to load the artist list.
// The similarity vectors will be loaded on-demand.
const loadModelData = () => {
  try {
    console.log("Attempting to load artist list...");
    const artistsPath = path.join(process.cwd(), "public", "artist_list.json");

    if (!fs.existsSync(artistsPath)) {
      throw new Error(`Artist list not found at path: ${artistsPath}`);
    }

    const artists = JSON.parse(fs.readFileSync(artistsPath, "utf-8"));
    const artistIndexMap = new Map(artists.map((name, index) => [name, index]));

    console.log(`Artist list loaded successfully with ${artists.length} artists.`);
    return { artists, artistIndexMap };
  } catch (error) {
    console.error("CRITICAL: Failed to load artist list.", error.message);
    return { artists: null, artistIndexMap: null };
  }
};

const { artists, artistIndexMap } = loadModelData();

// --- Recommendation Logic (Updated for Chunking) ---
const getSimilarArtists = (inputArtists, topN = 6) => {
  if (!artists || !artistIndexMap) {
    return []; // Return empty if model data isn't loaded
  }

  const artistScores = new Map();
  const vectorsDir = path.join(process.cwd(), "public", "similarity_vectors");

  for (const artistName of inputArtists) {
    const idx = artistIndexMap.get(artistName);
    
    if (idx !== undefined) {
      try {
        // Construct the path to the specific vector file for this artist
        const vectorPath = path.join(vectorsDir, `${idx}.json`);
        
        // Read only the small file for this one artist
        const simScores = JSON.parse(fs.readFileSync(vectorPath, "utf-8"));
        
        // Aggregate scores (same logic as before)
        simScores.forEach((score, otherArtistIndex) => {
          const otherArtistName = artists[otherArtistIndex];
          const currentScore = artistScores.get(otherArtistName) || 0;
          artistScores.set(otherArtistName, currentScore + score);
        });
      } catch (e) {
        // This might happen if a vector file is missing
        console.warn(`Could not load similarity vector for artist: ${artistName} (index: ${idx})`);
      }
    }
  }

  inputArtists.forEach(name => artistScores.delete(name));
  
  const sortedArtists = [...artistScores.entries()].sort((a, b) => b[1] - a[1]);
  
  return sortedArtists.slice(0, topN).map(entry => entry[0]);
};

// --- API Handler (No changes needed here) ---
export async function POST(req) {
  if (!artists) {
    return NextResponse.json(
      { error: "Recommendation model is not available. Check server logs." },
      { status: 500 }
    );
  }

  try {
    const { recentlyPlayedArtists } = await req.json();

    if (!recentlyPlayedArtists) {
      return NextResponse.json({ error: "Missing 'recentlyPlayedArtists' in request body." }, { status: 400 });
    }

    if (recentlyPlayedArtists.length === 0) {
      return NextResponse.json(
        { recommendations: ["Daft Punk", "The Beatles", "Queen", "Led Zeppelin", "Michael Jackson", "Taylor Swift"] }
      );
    }
    
    const recommendedArtists = getSimilarArtists(recentlyPlayedArtists);
    
    return NextResponse.json({ recommendations: recommendedArtists });

  } catch (error) {
    console.error("Recommendation API error:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching recommendations." },
      { status: 500 }
    );
  }
}
