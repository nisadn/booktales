import { Flex, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { useQuery, UseQueryResult } from 'react-query'
import { useDispatch } from 'react-redux'
import { Threads } from '../components/Container'
import Ads from '../components/Container/Ads'
import Layout from '../components/Layout/Layout'
import { axiosClient } from '../config/apiClient'
import { categoryApi } from '../config/service/categoryApi'
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
  // const { status, error, data }: UseQueryResult<Array<Category>> = useQuery<Array<Category>>('categories', getCategories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get(categories));
  }, [categories]);

  return (
    <div>
      <Head>
        <title>Booktales</title>
        <meta name="description" content="Welcome to Booktales!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout page='home' 
        // categories={categories}
      >
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
        <Ads 
          // categories={categories} 
        />
      </Layout>

    </div>
  )
}

export default Home;

// type Category = {
//     id: string,
//     title: string,
// }

// const categories: Category[] = [{
//     id: '1',
//     name: "Fiction",
//   },{
//     id: '2',
//     name: "Non-Fiction",
//   },{
//     id: '3',
//     name: "Biography",
//   },{
//     id: '4',
//     name: "Drama",
//   },{
//     id: '5',
//     name: "Romance",
//   },{
//     id: '6',
//     name: "Adventure",
//   },{
//     id: '7',
//     name: "Scifi",
//   },{
//     id: '8',
//     name: "Fantasy",
//   }
// ]
