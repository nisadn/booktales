import { Flex } from "@chakra-ui/react"
import ThreadCard from "../Card/ThreadCard"

type Thread = {
    id: string;
    name: string;
}

const Threads = ({threads}: {threads: Thread[]}) => {
    return (
        <Flex direction='column' mt='8' gap='10'>
            {threads ? 
                threads.map((val: Thread) => (
                    <ThreadCard thread={val} key={val.id} />
                )) 
            : <div>This category has no threads yet.</div>
            }
        </Flex>
    )
}

export default Threads;

// const threads: Thread[] = [{
//   id: "1",
//   author: "nis.adn",
//   title: "abc",
//   category: {
//     id: "1",
//     title: "fiction"
//   },
//   total_post: 797,
//   starter_post_id: "1",
// },{
//   id: "1",
//   author: "nis.adn",
//   title: "def lorem ipsum",
//   category: {
//     id: "1",
//     title: "fiction"
//   },
//   total_post: 342,
//   starter_post_id: "1",
// },{
//   id: "1",
//   author: "adiandiann",
//   title: "Sir Dolor Amet",
//   category: {
//     id: "1",
//     title: "fiction"
//   },
//   total_post: 120,
//   starter_post_id: "1",
// },{
//   id: "1",
//   author: "ngrhn",
//   title: "Dummy thread",
//   category: {
//     id: "5",
//     title: "romance"
//   },
//   total_post: 40,
//   starter_post_id: "1",
// },{
//   id: "1",
//   author: "annisadian",
//   title: "First thread",
//   category: {
//     id: "5",
//     title: "romance"
//   },
//   total_post: 255,
//   starter_post_id: "1",
// },{
//   id: "1",
//   author: "nis.adn",
//   title: "This is title",
//   category: {
//     id: "1",
//     title: "fiction"
//   },
//   total_post: 300,
//   starter_post_id: "1",
// },{
//   id: "1",
//   author: "nisadn",
//   title: "Hello World",
//   category: {
//     id: "5",
//     title: "romance"
//   },
//   total_post: 400,
//   starter_post_id: "1",
// }]