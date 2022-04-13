import React, { useState, useEffect, Fragment } from 'react'

import SpotifySubsection from './SpotifySubSection'

const SpotifySection = ({
  topTracks,
  topArtists,
  recentlyPlayed
}) => {
  // TODO: make the grid responsive (1 col) for smaller screens

  return (
    <div className='spotify-data-rendered'>
      <div className='spotify-subsection-wrapper'>
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
        <br />
        <SpotifySubsection
          title='My Recently Played Tracks'
          section='recentlyPlayed'
          items={recentlyPlayed.items}
        />
      </div>
    </div>
  )
}

export default SpotifySection
