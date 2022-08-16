import { Box, Button, Flex, Icon, Text, Wrap } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsCircle } from 'react-icons/bs';
import { OutlineButton } from "../Button";

const Ads = () => {
    const router = useRouter();
    
    return (
        <Flex direction='column' mt='8' gap='10'>
            <Flex 
                direction='column' 
                pt='6' 
                px='8'
                pb='8'
                boxShadow='md' 
                borderRadius='md' 
                gap='4'
                bgGradient='linear(to-r, green.300, blue.500)'
            >
                <Text fontWeight='semibold' fontSize='2xl'>
                    Discover stories and thinking from other users on any topic within these categories.
                </Text>
                <Wrap spacingY='4' spacingX='4' pb='2'>
                    {categories.map((c: Category) => (
                        <Button 
                            variant='outline' 
                            border='2px'
                            key={c.id} 
                            onClick={() => router.push(`/category/${c.id}`)}
                        >{c.title}</Button>        
                    ))}
                </Wrap>
            </Flex>
        </Flex>
    )
}

export default Ads;

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