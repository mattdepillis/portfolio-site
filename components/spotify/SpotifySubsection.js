import { useState, Fragment } from 'react'
import { Card, Grid, Text, Row, Button, Spacer } from "@nextui-org/react"

const SpotifySubsection = ({
  title,
  section,
  items
}) => {
  const [cardHover, setCardHover] = useState(-1)
  const [showMore, setShowMore] = useState(false)
  const [itemsToShow, setItemsToShow] = useState(items.slice(0, 3))

  const toggleCards = () => {
    setItemsToShow(showMore ? items.slice(0, 3) : items)
    setShowMore(!showMore)
  }

  return (
    <Fragment>
      <h3 className='notion-h notion-h1 notion-h-indent-0 spotify-header'>{title}</h3>
      <hr className='notion-hr' />
      <Grid.Container gap={2} justify="flex-start">
        {itemsToShow.map((item, i) => {
          // because track is nested for recentlyPlayed, get it here
          const obj = section === 'recentlyPlayed' ? item.track : item

          return (
            <Fragment>
              <Grid xs={4}>
                <Card
                  key={i}
                  className="spotify-card"
                  cover
                  hoverable
                  clickable
                  onClick={() => window.open(`${obj.external_urls.spotify}`, '_blank')}
                  onMouseOver={() => setCardHover(i)}
                  onMouseLeave={() => setCardHover(-1)}
                >
                  <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }} />
                  <Card.Body>
                    <Card.Image
                      className='spotify-card-image'
                      src={obj.album ? obj.album.images[1].url : obj.images[1].url}
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
                            {obj.name}
                          </Text>
                        </Row>
                        {section !== 'topArtists' &&
                          <Row>
                            <Text h5 className="card-text" size={12} weight="bold" color="white">
                              {obj.artists.map(artist => artist.name).join(', ')}
                            </Text>
                          </Row>
                        }
                      </Grid>
                    </Card.Footer>
                  }
                </Card>
              </Grid>
            </Fragment>
          )})}
      </Grid.Container>
      <Spacer />
      <div>
        <Button
          auto
          color="primary"
          rounded
          flat
          onClick={() => toggleCards()}
          css={{ margin: '0 auto', marginBottom: '20px', zIndex: '0' }}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </Button>
      </div>
    </Fragment>
  )
}

export default SpotifySubsection
