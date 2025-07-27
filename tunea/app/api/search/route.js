import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");    // default to empty string if no query is provided
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    if (!query) {
        return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    const res = await fetch(
        "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=9&q=" +
        encodeURIComponent(query) +     // encode the query to handle special characters
        "&key=" + YOUTUBE_API_KEY,
    );

    if (!res.ok) {
        const errmsg = await res.text();
        console.error("YouTube API error:", res.status, errmsg);
        return NextResponse.json({ error: "YouTube API request failed" }, { status: 500 });
    }

    const data = await res.json();

    const results = data.items.map(item => ({
        id : item.id.videoId,
        title : item.snippet.title,
        thumbnail : item.snippet.thumbnails.default.url,
        channel : item.snippet.channelTitle,
        published : item.snippet.publishedAt,
    }));

    return NextResponse.json(results);  // automatically returns 200 status
}