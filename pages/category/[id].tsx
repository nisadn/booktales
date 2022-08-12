import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Threads } from "../../components/Container";
import Layout from "../../components/Layout/Layout";

const ThreadsByCategoryPage = () => {
    const router = useRouter();
    const id = router.query.id;

    return (
        <div>
            <Head>
                <title>Category Threads</title>
                <meta name="description" content="Category Threads" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout page='threads_by_category'>
                <Flex direction='column'>
                <Text as='span' fontSize={['3xl','4xl','4xl']} fontWeight='bold'>
                <Text as='span'
                    bgGradient='linear(to-r, green.300, blue.500)'
                    bgClip='text'
                > Category {id}
                </Text>
                {' '}Threads</Text>
                {/* <Text fontSize='lg' fontWeight='medium'>Where everyone can share anything about books.</Text> */}
                </Flex>
                <Threads />
            </Layout>

        </div>
    )
}

export default ThreadsByCategoryPage;