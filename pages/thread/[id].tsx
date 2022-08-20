import { Badge, Box, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import Layout from "../../components/Layout/Layout";
import ThreadStarter from "../../components/Container/ThreadStarter";
import Posts from "../../components/Container/Posts";
import React from "react";
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
    count: number;
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const res = await axiosClient.get(`/thread/${id}`);
  const data = res.data.data;
  const posts: { [id: string] : RPost; } = {};
  const postsByIdx: { [id: string] : RPost; } = {};
  const idxReply: { [id: string] : Array<string>; } = {};
  data.forEach((post: Post) => {
    idxReply[post.id] = [];
    if (post.replyId !== '') {
        idxReply[post.replyId].push(post.id);
    }
  });

  data.forEach((post: Post) => {
    if (post.replyId === '') {
        postsByIdx[post.id] = {...post, reply: []};
    } else {
        if (postsByIdx[post.id]) {
            postsByIdx[post.id].reply.push({...post, reply: []});
        } else {
            postsByIdx[post.id] = {...post, reply: []};
        }
        postsByIdx[post.replyId].reply.push({...post, reply: []});
    }
  })

  Object.keys(idxReply).forEach((idx: string) => {
    if (postsByIdx[idx].replyId === '') {
        posts[idx] = postsByIdx[idx];
        posts[idx].reply = [];
        idxReply[idx].forEach((i: string)=> {
            posts[idx].reply.push(postsByIdx[i]);
        })
    } 
  })

  return {
    props: {
      posts: Object.values(posts),
      id: id,
      name: res.data.name,
      count: data.length,
    }
  }
};


const ThreadDetailPage: React.FC<IPostPage> = (props) => {
    const { posts, id, name, count } = props;

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
                <Posts posts={posts} tid={id} />
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