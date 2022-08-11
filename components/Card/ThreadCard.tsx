import { Badge, Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { TbArrowBigUpLine, TbArrowBigDownLine } from "react-icons/tb";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import CustomIcon from "../Icon/CustomIcon";
import { GoCommentDiscussion } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";

const ThreadCard = () => {
    return (
        <Flex direction='column' p='6' boxShadow='md' borderRadius='md' gap='1'>
            <Text fontWeight='semibold' fontSize='sm' color='green.500'>@nis.adn</Text>
            <Text fontWeight='semibold' fontSize='xl'>Judul</Text>
            <Link>
            <Flex color='gray.500' fontSize='sm' >
                See more
                <Icon as={IoIosArrowRoundForward} w='5' h='full'/>
            </Flex>
            </Link>
            <Flex mt='3' justify='space-between'>
                <Box>
                    <Badge colorScheme='blue' mr='2'>Fiction</Badge>
                    <Badge colorScheme='blue' mr='2'>Biography</Badge>
                    <Badge colorScheme='blue' mr='2'>Romance</Badge>
                    <Badge colorScheme='blue' mr='2'>Scifi</Badge>
                </Box>
                <Flex gap='1' align='center' justify='flex-end'>
                    <Icon color='gray.500' as={TbArrowBigUpLine} w='5' h='5' />
                    <Text fontSize='sm'>100</Text>
                    <Icon color='gray.500' as={TbArrowBigDownLine} w='5' h='5' ml='2'/>
                    <Text fontSize='sm'>50</Text>
                    <Icon color='gray.500' as={GoCommentDiscussion} w='5' h='5' ml='2'/>
                    <Text fontSize='sm' ml='1'>400</Text>
                    <CustomIcon as={BiEditAlt} color='blue.500' activeCol="blue.700" ml='2' />
                    <CustomIcon as={BiTrash} color='red.500' activeCol="red.700" />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ThreadCard;