import { Card, Grid, Row, Text } from '@nextui-org/react'

const SpotifyCard = ({
  i,
  obj,
  hovered,
  section,
  onMouseOver,
  onMouseLeave
}) =>
  <Card
    key={i}
    className="spotify-card"
    cover
    hoverable
    clickable
    onClick={() => window.open(`${obj.external_urls.spotify}`, '_blank')}
    onMouseOver={onMouseOver}
    onMouseLeave={onMouseLeave}
  >
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }} />
    <Card.Body>
      <Card.Image
        className='spotify-card-image'
        src={obj.album ? obj.album.images[1].url : obj.images[1].url}
      />
    </Card.Body>
    {hovered &&
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

export default SpotifyCard
