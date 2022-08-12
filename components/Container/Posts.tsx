import { Flex } from "@chakra-ui/react";
import PostCard from "../Card/PostCard";

const Posts = () => {
    return (
        <Flex direction='column' mt='10' gap='10'>
            <PostCard post={post}/>
            <PostCard post={post2}/>
            <PostCard post={post}/>
        </Flex>
    )
}

export default Posts;

type Post = {
    id: string;
    author: string;
    content: string;
    reply: Post[];
    upvote: number;
    downvote: number;
}

const content = "Penguins are flightless seabirds that live almost exclusively below the equator. Some island-dwellers can be found in warmer climates, but most—including emperor, adélie, chinstrap, and gentoo penguins—reside in and around icy Antarctica. Penguins are flightless seabirds that live almost exclusively below the equator."

const post: Post = {
    id: "1",
    author: "nis.adn",
    content: content,
    reply: [{
        id: "2",
        author:"adiandiann",
        content: content,
        reply: [],
        upvote: 10,
        downvote: 1
    }],
    upvote: 17,
    downvote: 2
}

const post2: Post = {
    id: "3",
    author: "nis.adn",
    content: content,
    reply: [{
        id: "4",
        author:"adiandiann",
        content: content,
        reply: [{
            id: "5",
            author:"annisadian",
            content: content,
            reply: [],
            upvote: 10,
            downvote: 1
        }],
        upvote: 10,
        downvote: 1
    },{
        id: "6",
        author:"dummyuser",
        content: content,
        reply: [],
        upvote: 10,
        downvote: 1
    }],
    upvote: 17,
    downvote: 2
}