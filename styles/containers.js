import styled from 'styled-components'

export const CenteredContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`

export const HomeContainer = styled.div`
  max-height: 70vh !important;

  .notion-title {
    margin: 0 auto !important;
    width: fit-content;
  }

  .notion-h1 {
    margin: 0 auto !important;
    width: fit-content;
  }

  .notion-row {
    display: none !important;
  }

  .notion-page-no-cover {
    margin-top: 0 !important;
    padding-top: 10px !important;
    padding-bottom: 0;
  }

  .notion-page-scroller {
    margin-top: 0 !important;
  }

  .notion-page {
    align-items: center !important;
    justify-content: center !important;
    width: 50%;
    border: 3px solid red;
  }

  @media screen and (max-height: 1100px) {
    .notion-title {
      font-size: 4.5em;
    }

    .notion-h {
      font-size: 2em !important;
    }
  }
`
