import { Flex } from "@chakra-ui/react";
import PostCard from "../Card/PostCard";

const Posts = ({ posts }: { posts: RPost[]}) => {
    return (
        <Flex direction='column' mt='10' gap='10'>
            { posts.map((post: RPost, index: number) => (
                <PostCard post={post} key={index}/>
            ))}
            {/* <PostCard post={post2}/> */}
            {/* <PostCard post={post}/> */}
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

// const content = "Penguins are flightless seabirds that live almost exclusively below the equator. Some island-dwellers can be found in warmer climates, but most—including emperor, adélie, chinstrap, and gentoo penguins—reside in and around icy Antarctica. Penguins are flightless seabirds that live almost exclusively below the equator."

// const post: Post = {
//     id: "1",
//     content: content,
//     upvote: 17,
//     downvote: 2,
//     replyId: "",
//     owner: "string",
//     isStarter: true,
//     edited: false,
// }

// const post2: Post = {
//     id: "2",
//     content: "ini reply",
//     upvote: 17,
//     downvote: 2,
//     replyId: "1",
//     owner: "string",
//     isStarter: false,
//     edited: false,
// }

// const post2: Post = {
//     id: "3",
//     author: "nis.adn",
//     content: content,
//     reply: [{
//         id: "4",
//         author:"adiandiann",
//         content: content,
//         reply: [{
//             id: "5",
//             author:"annisadian",
//             content: content,
//             reply: [],
//             upvote: 10,
//             downvote: 1
//         }],
//         upvote: 10,
//         downvote: 1
//     },{
//         id: "6",
//         author:"dummyuser",
//         content: content,
//         reply: [],
//         upvote: 10,
//         downvote: 1
//     }],
//     upvote: 17,
//     downvote: 2
// }