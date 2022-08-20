import { Flex, Spinner } from "@chakra-ui/react"

const Loading = ({ text }: { text: string }) => {
    return (
        <Flex direction="column" align='center' gap={4} mt='10'>
            <Flex>
                <Spinner
                    thickness='6px'
                    speed='0.65s'
                    emptyColor='green.200'
                    color='blue.600'
                    size='xl'
                />
            </Flex>
            <Flex color='custom.400'>
                Loading {text}...
            </Flex>
        </Flex>
    )
}

export default Loading