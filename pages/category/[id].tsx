import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { Loading, Threads } from "../../components/Container";
import Layout from "../../components/Layout/Layout";
import { categoryApi } from "../../config/service/categoryApi";

type Thread = {
    id: string;
    name: string;
}

type ThreadResp = {
    data: Thread[];
    name: string;
}

const ThreadsByCategoryPage = () => {
    const router = useRouter();
    const id = router.query.id as string;

    const getThreads = async () => {
        const res = await categoryApi.get(id);
        return res.data;
    }

    const { status, data, error }: UseQueryResult<ThreadResp, Error> = useQuery<ThreadResp, Error>('threads', getThreads);    
    
    return (
        <div>
            <Head>
                <title>Booktales: {data ? data.name : 'Detail'} threads</title>
                <meta name="description" content={`Booktales: all threads in category ${data ? data.name : 'Detail'}`} />
            </Head>

            <Layout page='threads_by_category'>
                <Flex direction='column'>
                <Text as='span' fontSize={['3xl','4xl','4xl']} fontWeight='bold'>
                <Text as='span'
                    bgGradient='linear(to-r, green.300, blue.500)'
                    bgClip='text'
                > {data ? data.name : 'Detail'}
                </Text>
                {' '}Threads</Text>
                </Flex>
                {status === 'success' ? 
                    <Threads threads={data.data} />
                :
                    <Loading text='threads' />
                }
            </Layout>

        </div>
    )
}

export default ThreadsByCategoryPage;