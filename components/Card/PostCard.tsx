import { Box, Divider, Flex } from "@chakra-ui/react";
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

const PostCard = ({ post }: { post: RPost }) => {
    return (
        <Flex direction='column' py='2' px='4' boxShadow='md' borderRadius='md' gap='1'>
            <PostDetails post={post} />
        </Flex>
    )
}

export default PostCard;