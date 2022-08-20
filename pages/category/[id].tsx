import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Threads } from "../../components/Container";
import Layout from "../../components/Layout/Layout";
import { axiosClient } from "../../config/apiClient";

type Thread = {
    id: string;
    name: string;
}

interface IThreadPage {
    threads: Thread[];
    name: string;
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const res = await axiosClient.get(`/category/${id}`);
  return {
    props: {
      threads: res.data.data,
      name: res.data.name,
    }
  }
};

const ThreadsByCategoryPage: React.FC<IThreadPage> = (props) => {
    const { threads, name } = props;

    return (
        <div>
            <Head>
                <title>Booktales: {name} threads</title>
                <meta name="description" content={`Booktales: all threads in category ${name}`} />
            </Head>

            <Layout page='threads_by_category'>
                <Flex direction='column'>
                <Text as='span' fontSize={['3xl','4xl','4xl']} fontWeight='bold'>
                <Text as='span'
                    bgGradient='linear(to-r, green.300, blue.500)'
                    bgClip='text'
                > {name}
                </Text>
                {' '}Threads</Text>
                </Flex>
                <Threads threads={threads} />
            </Layout>

        </div>
    )
}

export default ThreadsByCategoryPage;