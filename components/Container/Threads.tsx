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
