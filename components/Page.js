import React, { Fragment } from 'react'
import Head from 'next/head'
import {
  NotionRenderer, Code, Collection, CollectionRow
} from 'react-notion-x'
import TweetEmbed from 'react-tweet-embed'

import Sidebar from './Sidebar'

const Page = ({ headTitle, recordMap }) => {
  console.log('r', recordMap)
  // TODO: if a block is a tweet, we want to render that with static-tweets methods
  return (
    <Fragment>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        components={{
          code: Code,
          tweet: ({ id }) => (
            <TweetEmbed tweetId={id} />
          ),
          collection: Collection,
          collectionRow: CollectionRow
        }}
      />
    </Fragment>
  )
}

export default Page
