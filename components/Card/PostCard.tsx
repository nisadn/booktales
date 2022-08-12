import { Box, Divider, Flex } from "@chakra-ui/react";
import PostDetails from "./Post";

type Post = {
    id: string;
    author: string;
    content: string;
    reply: Post[];
    upvote: number;
    downvote: number;
}

const PostCard = ({ post }: { post: Post }) => {
    return (
        <Flex direction='column' py='2' px='4' boxShadow='md' borderRadius='md' gap='1'>
            <PostDetails post={post} />
        </Flex>
    )
}

export default PostCard;