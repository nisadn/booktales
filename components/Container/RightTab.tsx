import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { OutlineButton, PrimaryButton } from "../Button";

const RightTab = () => {
  const router = useRouter();

    return (
        <Flex w='25vw' boxShadow={'base'} position='fixed' right='0'>
            <Flex direction='column' w='full' overflowY='auto' h='100vh' py='6' px='8' gap='4' >
                <Text as='span'
                    bgGradient='linear(to-l, purple.600, blue.500)'
                    bgClip='text'
                    fontWeight='extrabold'
                    fontSize='xl'
                    w='fit-content'
                >@nis.adn
                </Text>
                <Divider />
                <Text fontWeight='semibold'>See Threads Based on Category</Text>
                <Box w='full' lineHeight={7} >
                    {categories.map((val: Category) => (
                        // <Badge colorScheme='facebook' px='4' mr='2' mb='2' key={val.id}>{val.title}</Badge>
                        <Button mr='2' mb='2' size='sm' key={val.id} onClick={() => router.push(`/category/${val.id}`)}>{val.title}</Button>
                    ))}
                </Box>
                <Divider />
                <Flex direction='column' gap='2'>
                    <Text fontWeight='semibold' mb='2'>
                        Login/register for more experience!
                    </Text>
                    <PrimaryButton>Login</PrimaryButton>
                    <OutlineButton>Get Started</OutlineButton>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default RightTab;

type Category = {
    id: string,
    title: string,
}

const categories: Category[] = [{
    id: '1',
    title: "Fiction",
  },{
    id: '2',
    title: "Non-Fiction",
  },{
    id: '3',
    title: "Biography",
  },{
    id: '4',
    title: "Drama",
  },{
    id: '5',
    title: "Romance",
  },{
    id: '6',
    title: "Adventure",
  },{
    id: '7',
    title: "Scifi",
  },{
    id: '8',
    title: "Fantasy",
  }
]