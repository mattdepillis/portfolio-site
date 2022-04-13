import React, { useState, useEffect, Fragment } from 'react'

import SpotifySubsection from './SpotifySubSection'

const SpotifySection = ({
  topTracks,
  topArtists,
  recentlyPlayed
}) => {
  // TODO: make the grid responsive (1 col) for smaller screens

  // TODO: should more dynamically render this (e.g. via .map)
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
      <br />
      <SpotifySubsection
        title='My Recently Played Tracks'
        section='recentlyPlayed'
        items={recentlyPlayed.items}
      />
    </div>
  )
}

export default SpotifySection
