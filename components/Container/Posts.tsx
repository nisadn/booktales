import { Flex } from "@chakra-ui/react";
import PostCard from "../Card/PostCard";

const Posts = ({ posts, tid }: { posts: RPost[], tid: string}) => {
    return (
        <Flex direction='column' mt='10' gap='10'>
            { posts.map((post: RPost, index: number) => (
                <PostCard post={post} key={index} tid={tid} />
            ))}
        </Flex>
    )
}

export default Posts;

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
