// app/components/TrackCard.js
"use client";

import Image from 'next/image';

const TrackCard = ({ track, onTrackClick }) => {
    const imageURL = track.album?.images?.[0]?.url || '/default.avif';
    const trackName = track.name || track.Track || 'Unknown';
    const artistName = track.artists?.map?.(artist => artist.name).join(', ') || track.Artist || 'Unknown Artist';

    const handleClick = () => {
      // Add to Recently Played
      const recentlyPlayed = JSON.parse(localStorage.getItem('recentlyPlayed') || '[]');
      const newRecentlyPlayed = [track, ...recentlyPlayed.filter(t => t.id !== track.id)].slice(0, 5);
      localStorage.setItem('recentlyPlayed', JSON.stringify(newRecentlyPlayed));
      
      // Open Spotify link
      const spotifyUrl = track.external_urls?.spotify;
      if (spotifyUrl) {
        window.open(spotifyUrl, '_blank');
      }
      
      // Trigger new recommendations
      if (onTrackClick) {
        onTrackClick(track.id || `${track.Artist}-${track.Track}`);
      }
    };

    return (
        <div 
          className="bg-[#181c2b]/80 p-4 rounded-xl shadow-lg hover:bg-[#23243a]/70 transition-all duration-200 cursor-pointer group"
          onClick={handleClick}
        >
            <div className='relative mb-4'>
                <Image
                    src={imageURL}
                    alt={`Album art for ${trackName}`}
                    width={200}
                    height={200}
                    className='w-full aspect-square rounded-md object-cover'
                />
            </div>
            <h3 className='text-md font-bold text-white truncate'>{trackName}</h3>
            <p className='text-sm text-gray-400 truncate'>{artistName}</p>
        </div>
    );
};

export default TrackCard;