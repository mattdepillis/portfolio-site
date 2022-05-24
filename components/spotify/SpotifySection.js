import { spotifyCategories } from './SpotifyCategories'
import SpotifySubsection from './SpotifySubsection'

const SpotifySection = ({ data }) => (
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

export default SpotifySection
