import { spotifyCategories } from './SpotifyCategories'
import SpotifySubsection from './SpotifySubSection'

const SpotifySection = ({ data }) => {
  // TODO: make the grid responsive (1 col) for smaller screens

  return (
    <div className='spotify-data-rendered'>
      <div className='spotify-subsection-wrapper'>
        {spotifyCategories.map(category => (
          <SpotifySubsection
            title={category.title}
            section={category.section}
            items={data[`${category.section}`].items}
          />
        ))}
      </div>
    </div>
  )
}

export default SpotifySection
