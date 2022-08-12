import { Badge, Box, Flex, Icon, Link, Text, useDisclosure } from "@chakra-ui/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import CustomIcon from "../Icon/CustomIcon";
import { GoCommentDiscussion } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";
import { ThreadModal, RemoveModal } from "../Modal";

type Category = {
    id: string,
    title: string,
}

type Thread = {
    id: string;
    author: string;
    title: string;
    category: Category;
    total_post: number;
    starter_post_id: string;
}

const ThreadCard = ({thread}: {thread: Thread}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure();

    return (
        <Flex direction='column' p='6' boxShadow='md' borderRadius='md' gap='1'>
            <Text fontWeight='semibold' fontSize='sm' color='green.500'>@{thread.author}</Text>
            <Text fontWeight='semibold' fontSize='xl'>{thread.title}</Text>
            <Link>
            <Flex color='gray.500' fontSize='sm' >
                See more
                <Icon as={IoIosArrowRoundForward} w='5' h='full'/>
            </Flex>
            </Link>
            <Flex mt='3' justify='space-between'>
                <Box>
                    {/* {thread.category.map((val: Category) => (
                        <Badge colorScheme='blue' mr='2' key={val.id}>{val.title}</Badge>
                    ))} */}
                    <Badge colorScheme='blue' mr='2' >{thread.category.title}</Badge>
                </Box>
                <Flex gap='1' align='center' justify='flex-end'>
                    {/* <Icon color='gray.500' as={TbArrowBigUpLine} w='5' h='5' />
                    <Text fontSize='sm'>100</Text>
                    <Icon color='gray.500' as={TbArrowBigDownLine} w='5' h='5' ml='2'/>
                    <Text fontSize='sm'>50</Text> */}
                    <Icon color='gray.500' as={GoCommentDiscussion} w='5' h='5' ml='2'/>
                    <Text fontSize='sm' ml='1'>{thread.total_post}</Text>
                    <CustomIcon as={BiEditAlt} color='blue.500' activeCol="blue.700" ml='2' onClick={onOpenEdit} />
                    <ThreadModal isOpen={isOpenEdit} onClose={onCloseEdit} isUpdate defaultTitle={thread.title} defaultCategory={thread.category.id} />
                    <CustomIcon as={BiTrash} color='red.500' activeCol="red.700" onClick={onOpen} />
                    <RemoveModal isOpen={isOpen} onClose={onClose} />
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ThreadCard;