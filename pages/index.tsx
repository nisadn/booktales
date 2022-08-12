import { Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'
import ThreadCard from '../components/Card/ThreadCard'
import Layout from '../components/Layout/Layout'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Booktales</title>
        <meta name="description" content="Welcome to Booktales!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout page='home'>
        <Flex direction='column'>
          <Text as='span' fontSize='4xl' fontWeight='bold'>Welcome to
          <Text as='span'
            bgGradient='linear(to-r, green.300, blue.500)'
            bgClip='text'
          > Booktales
          </Text>
          !</Text>
          <Text fontSize='lg' fontWeight='medium'>Where everyone can share anything about books.</Text>
        </Flex>
        <Flex direction='column' mt='10' gap='10'>
          <ThreadCard />
          <ThreadCard />
          <ThreadCard />
          <ThreadCard />
          <ThreadCard />
          <ThreadCard />
          <ThreadCard />
          <ThreadCard />
          <ThreadCard />
        </Flex>
      </Layout>

    </div>
  )
}

export default Home
