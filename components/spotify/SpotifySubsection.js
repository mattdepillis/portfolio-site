import React, { useState, Fragment } from 'react'
import { Card, Grid, Text, Row, Button, Spacer } from "@nextui-org/react"

const SpotifySubsection = ({
  title,
  topTracks
}) => {
  const [cardHover, setCardHover] = useState(-1)
  const [showMore, setShowMore] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(topTracks.items.slice(0, 3))

  const toggleCards = () => {
    setItemsToShow(showMore ? topTracks.items.slice(0, 3) : topTracks.items)
    setShowMore(!showMore)
  }

  // TODO: figure out right property to render depending on which collection

  return (
    <Fragment>
      <h1 className='notion-h notion-h1 notion-h-indent-0 spotify-header'>{title}</h1>
      <hr className='notion-hr' />
      <Grid.Container gap={2} justify="flex-start">
        {itemsToShow.map((item, i) => {
          return (
            <Fragment>
              <Grid xs={4}>
                <Card
                  className="spotify-card"
                  cover
                  hoverable
                  clickable
                  onClick={() => window.open(`${item.external_urls.spotify}`, '_blank')}
                  onMouseOver={() => setCardHover(i)}
                  onMouseLeave={() => setCardHover(-1)}
                  css={{ w: "100%" }}
                >
                  <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }} />
                  <Card.Body>
                    <Card.Image
                      src={item.album.images[1].url}
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
                            {item.name}
                          </Text>
                        </Row>
                        <Row>
                          <Text h5 className="card-text" size={12} weight="bold" color="white">
                            {item.artists.map(artist => artist.name).join(', ')}
                          </Text>
                        </Row>
                      </Grid>
                    </Card.Footer>
                  }
                </Card>
              </Grid>
            </Fragment>
          )})}
      </Grid.Container>
      <Spacer />
      <Button
        auto
        color="secondary"
        rounded
        flat
        onClick={toggleCards}
        css={{ margin: '0 auto', marginBottom: '20px' }}
      >
        {showMore ? 'Show Less' : 'Show More'}
      </Button>
    </Fragment>
  )
}

export default SpotifySubsection
