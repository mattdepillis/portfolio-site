import React, { useState, useEffect } from 'react'
import { Card, Grid, Col, Text, Row, Button } from "@nextui-org/react"

const SpotifyData = ({
  topTracks,
  topArtists,
  recentlyPlayed
}) => {
  const [cardHover, setCardHover] = useState(-1)

  useEffect(() => {
    console.log('tt', topTracks)
    console.log('ta', topArtists)
    console.log('rp', recentlyPlayed)
  })

  return (
    <div className='spotify-data-rendered'>
      <h1 className='notion-h notion-h1 notion-h-indent-0 spotify-header'>My Current Top Tracks</h1>
      <hr className='notion-hr' />
      <Grid.Container gap={2} justify="flex-start">
        {topTracks.items.map((track, i) => {
          return (
            <Grid xs={4}>
              <Card
                className="spotify-card"
                cover
                hoverable
                clickable
                onClick={() => window.open(`${track.external_urls.spotify}`, '_blank')}
                onMouseOver={() => setCardHover(i)}
                onMouseLeave={() => setCardHover(-1)}
                css={{ w: "100%" }}
              >
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }} />
                <Card.Body>
                  <Card.Image
                    src={track.album.images[1].url}
                    objectFit='scale-down'
                  />
                </Card.Body>
                {cardHover === i &&
                  <Card.Footer
                    blur
                    justify="flex-start"
                    className='spotify-card-footer'
                    css={{
                      position: "absolute",
                      bgBlur: "#0f1114",
                      borderTop: "$borderWeights$light solid $gray700",
                      bottom: 0,
                      zIndex: 1,
                      padding: '6px !important'
                    }}
                  >
                    <Grid>
                      <Row>
                        <Text className="card-text" size={15} weight="bold" color="white">
                          {track.name}
                        </Text>
                      </Row>
                      <Row>
                        <Text h5 className="card-text" size={12} weight="bold" color="white">
                          {track.artists.map(artist => artist.name).join(', ')}
                        </Text>
                      </Row>
                    </Grid>
                  </Card.Footer>
                }
              </Card>
            </Grid>
          )})}
      </Grid.Container>
    </div>
  )
}

export default SpotifyData