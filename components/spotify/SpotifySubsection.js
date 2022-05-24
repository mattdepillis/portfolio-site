import { Fragment, useState } from 'react'
import { Button, Grid, Spacer } from "@nextui-org/react"
import SpotifyCard from './SpotifyCard'

/*
  TODO: reengineer the grid section to take a width variable.
  * if less than 600px for example, structure rows in pairs, not triples.
  * could even be singles under something like 450px.
  * at smaller widths, can trim the list to not show more than top 5-10 items.
*/
const SpotifySubsection = ({
  title,
  section,
  items
}) => {
  const screenWidth = window.innerWidth

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
              <Grid xs={6}>
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
