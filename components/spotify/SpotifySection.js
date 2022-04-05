import React, { useState, useEffect, Fragment } from 'react'

import SpotifySubsection from './SpotifySubSection'

const SpotifySection = ({
  topTracks,
  topArtists,
  recentlyPlayed
}) => {
  useEffect(() => {
    console.log('ta', topArtists)
    console.log('rp', recentlyPlayed)
  }, [topArtists, recentlyPlayed])
  
  // TODO: make the grid responsive (1 col) for smaller screens

  return (
    <div className='spotify-data-rendered'>
      <SpotifySubsection
        title='My Current Top Tracks'
        section='topTracks'
        items={topTracks.items}
      />
      <br />
      <SpotifySubsection
        title='My Current Top Artists'
        section='topArtists'
        items={topArtists.items}
      />
    </div>
  )
}

export default SpotifySection