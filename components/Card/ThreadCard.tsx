import { Badge, Box, Flex, Icon, Link, Text, useDisclosure } from "@chakra-ui/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import CustomIcon from "../Icon/CustomIcon";
import { GoCommentDiscussion } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";
import { ThreadModal, RemoveModal } from "../Modal";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type Thread = {
    id: string;
    name: string;
}

const ThreadCard = ({thread}: {thread: Thread}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure();
    const router = useRouter();
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const role = useSelector((state: RootState) => state.auth.account.role);

    return (
        <Flex direction='column' p='6' boxShadow='md' borderRadius='md' gap='1' transition='0.3s'
            _hover={{
                bg: 'gray.100',
                transition: '0.3s',
            }}
        >
            {/* <Text fontWeight='semibold' fontSize='sm' color='green.500'>@{thread.author}</Text> */}
            {/* <Text fontWeight='semibold' fontSize='xl'>{thread.name}</Text> */}
            <Flex justify='space-between'>
                <Box>
                    {/* {thread.category.map((val: Category) => (
                        <Badge colorScheme='blue' mr='2' key={val.id}>{val.title}</Badge>
                    ))} */}
                    {/* <Badge colorScheme='blue' mr='2' >{thread.category.title}</Badge> */}
                    <Text fontWeight='semibold' fontSize='xl'>{thread.name}</Text>
                </Box>
                <Flex gap='1' align='center' justify='flex-end'>
                    {/* <Icon color='gray.500' as={TbArrowBigUpLine} w='5' h='5' />
                    <Text fontSize='sm'>100</Text>
                    <Icon color='gray.500' as={TbArrowBigDownLine} w='5' h='5' ml='2'/>
                    <Text fontSize='sm'>50</Text> */}
                    {/* <Icon color='gray.500' as={GoCommentDiscussion} w='5' h='5' ml='2'/> */}
                    {/* <Text fontSize='sm' ml='1'>{thread.total_post}</Text> */}
                    
                    {isLogin && role === 'admin' && <>
                    <CustomIcon as={BiEditAlt} color='blue.500' activeCol="blue.700" ml='2' onClick={onOpenEdit} />
                    <CustomIcon as={BiTrash} color='red.500' activeCol="red.700" onClick={onOpen} /></>}
                    <ThreadModal isOpen={isOpenEdit} onClose={onCloseEdit} isUpdate defaultTitle={thread.name} 
                        // defaultCategory={thread.category.id} 
                    />
                    <RemoveModal isOpen={isOpen} onClose={onClose} />
                </Flex>
            </Flex>
            
            <Link onClick={() => router.push(`/thread/${thread.id}`)} w='fit-content'>
            <Flex color='gray.500' fontSize='sm' w='fit-content' >
                See more
                <Icon as={IoIosArrowRoundForward} w='5' h='full'/>
            </Flex>
            </Link>
        </Flex>
    )
}

export default ThreadCard;