import { Fragment, useState } from 'react'
import { Button, Grid, Spacer } from "@nextui-org/react"

// card component for spotify data
import SpotifyCard from './SpotifyCard'

// determines viewport width every time screen resize occurs
import { useViewportWidth } from '../../lib/useViewportWidth'

// renders each spotify section
const SpotifySubsection = ({
  title,
  section,
  items
}) => {
  // sets the grid to 1, 2, or 3 cols based on screen width
  const setGridXs = (screenWidth) =>
    screenWidth > 650 ?
      4 : screenWidth > 450 ?
        6 : 12

  const width = useViewportWidth()

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

          const hovered = cardHover === i

          return (
            <Fragment>
              <Grid xs={setGridXs(width)}>
                <SpotifyCard
                  i={i}
                  obj={obj}
                  hovered={hovered}
                  section={section}
                  onMouseOver={() => setCardHover(i)}
                  onMouseLeave={() => setCardHover(-1)}
                />
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
