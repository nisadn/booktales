import { Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Ads } from '../components/Container'
import Layout from '../components/Layout/Layout'
import { axiosClient } from '../config/apiClient'
import { get } from '../redux/features/category/categorySlice'

type Category = {
  id: string;
  name: string;
}

export async function getServerSideProps() {
  const res = await axiosClient.get('/category');
  return {
    props: {
      categories: res.data
    }
  }
};

const Home = ({ categories }: { categories: Category[]}) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get(categories));
  }, [categories]);

  return (
    <div>
      <Head>
        <title>Welcome to Booktales!</title>
        <meta name="description" content="Welcome to Booktales! - Where everyone can share anything about books." />
      </Head>

      <Layout page='home' >
        <Flex direction='column'>
          <Text as='span' fontSize={['3xl','4xl','4xl']} fontWeight='bold'>Welcome to
          <Text as='span'
            bgGradient='linear(to-r, green.300, blue.500)'
            bgClip='text'
          > Booktales
          </Text>
          !</Text>
          <Text fontSize='lg' fontWeight='medium'>Where everyone can share anything about books.</Text>
        </Flex>
        <Ads />
      </Layout>

    </div>
  )
}

export default Home;
