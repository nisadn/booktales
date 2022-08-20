import { Flex } from "@chakra-ui/react";
import PostDetails from "./Post";

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

const PostCard = ({ post, tid }: { post: RPost, tid: string }) => {
    return (
        <Flex direction='column' py='2' px='6' boxShadow='md' borderRadius='md' gap='1'>
            <PostDetails post={post} tid={tid} />
        </Flex>
    )
}

export default PostCard;