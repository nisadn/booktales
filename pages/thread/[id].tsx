import { Badge, Box, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { OutlineButton } from "../../components/Button";
import { Threads } from "../../components/Container";
import Layout from "../../components/Layout/Layout";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";
import CustomIcon from "../../components/Icon/CustomIcon";
import { RemoveModal, ThreadModal } from "../../components/Modal";
import ThreadStarter from "../../components/Container/ThreadStarter";
import Posts from "../../components/Container/Posts";
import { threadApi } from "../../config/service/threadApi";
import React, { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { axiosClient } from "../../config/apiClient";

type Post = {
    id: string;
    content: string;
    downvote: number;
    upvote: number;
    replyId: string;
    owner: string;
    isStarter: boolean;
    edited: boolean;
}

type RPost = Post & {
    reply: RPost[],
}

interface IPostPage {
    posts: RPost[];
    id: string;
    name: string;
}

type TParsePost = {
    id: string;
    post: Post;
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const res = await axiosClient.get(`/thread/${id}`);
  const data = res.data.data;
  const posts: { [id: string] : RPost; } = {};

  data.forEach((post: Post) => {
    if (post.replyId === '') {
        posts[post.id] = {...post, reply: []};
    } else {
        posts[post.replyId].reply.push({...post, reply: []});
    }
  })

  return {
    props: {
      posts: Object.values(posts),
      id: id,
      name: res.data.name,
    }
  }
};


const ThreadDetailPage: React.FC<IPostPage> = (props) => {
    const { posts, id, name } = props;
    const [ count, setCount ] = useState<number>(0);
    useEffect(() => {
        setCount(posts.length);
    }, [posts]);
    // const router = useRouter();
    // const id = router.query.id;

    // async function fetchApi() {
    //     await threadApi.get(id).then((res) => {
    //         console.log(res);
    //     })
    // }

//   const { status, error, data }: UseQueryResult<Array<Thread>> = useQuery<Array<Thread>>('threads', fetchApi(id));
    // const { data, isLoading }: UseQueryResult<Array<Thread>> = useQuery<Array<Thread>>('threads', fetchApi(id));

    return (
        <div>
            <Head>
                <title>Thread Details</title>
                <meta name="description" content="Thread Details" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout page='details'>
                <ThreadStarter id={id} name={name} count={count} />
                {/* <Posts /> */}
                <Posts posts={posts} />
            </Layout>

        </div>
    )
}

export default ThreadDetailPage;

type Category = {
    id: string;
    title: string;
}

type StarterPost = {
    id: string;
    content: string;
}

type StarterThread = {
    id: string;
    title: string;
    author: string;
    category: Category;
    starter_post: StarterPost;
}

const starter_thread: StarterThread = {
    id: "1",
    title: "Hello World!",
    author: "nis.adn",
    category: {
        id: "1",
        title: "Fiction",
    },
    starter_post: {
        id: "1",
        content: "Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
ipsum lorem ipsum sir Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
ipsum lorem ipsum sir Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
ipsum lorem ipsum sir Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
ipsum lorem ipsum sir Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
ipsum lorem ipsum sir Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet"
    }
}