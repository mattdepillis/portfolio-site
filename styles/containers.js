import styled from 'styled-components'

export const CenteredContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`

// * custom css for the portfolio site's home page
export const HomeContainer = styled.div`
  max-height: 70vh !important;

  .notion-title {
    margin: 0 auto !important;
    text-align: center;
    width: fit-content;
  }

  .notion-h1 {
    margin: 0 auto !important;
    text-align: center;
    width: fit-content;
  }

  .notion-row {
    display: none !important;
  }

  .notion-page-no-cover {
    margin-top: 0 auto !important;
    padding-top: 10px !important;
  }

  .notion-page-scroller {
    margin-top: 0 !important;
  }

  .notion-page {
    align-items: center !important;
    justify-content: center !important;
    width: 50%;
  }
`
