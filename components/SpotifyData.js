import React, { useState, useEffect } from 'react'
import { Card, Grid, Col, Text, Row, Button } from "@nextui-org/react"

const SpotifyData = ({
  topTracks,
  topArtists,
  recentlyPlayed
}) => {
  useEffect(() => {
    console.log('tt', topTracks)
    console.log('ta', topArtists)
    console.log('rp', recentlyPlayed)
  })

  return (
    <div className='spotify-data-rendered'>
      <h1 className='notion-h notion-h1 notion-h-indent-0 spotify-header'>Spotify Data below!</h1>
      <hr className='notion-hr' />
      {/* {topTracks.items.map(track => <p>{track}</p>)} */}
    </div>
  )
}

export default SpotifyData