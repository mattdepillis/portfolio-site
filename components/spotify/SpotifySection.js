import React, { useState, useEffect, Fragment } from 'react'
import { Card, Grid, Col, Text, Row, Button, Spacer } from "@nextui-org/react"

import SpotifySubsection from './SpotifySubSection'

const SpotifySection = ({
  topTracks,
  topArtists,
  recentlyPlayed
}) => {
  useEffect(() => {
    console.log('ta', topArtists)
    console.log('rp', recentlyPlayed)
  })
  
  // TODO: make the grid responsive (1 col) for smaller screens

  return (
    <div className='spotify-data-rendered'>
      <SpotifySubsection
        title='My Current Top Tracks'
        topTracks={topTracks}
      />
    </div>
  )
}

export default SpotifySection