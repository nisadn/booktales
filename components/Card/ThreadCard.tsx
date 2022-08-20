import { Box, Flex, Icon, Link, Text, useDisclosure } from "@chakra-ui/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import CustomIcon from "../Icon/CustomIcon";
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
            <Flex justify='space-between'>
                <Box>
                    <Text fontWeight='semibold' fontSize='xl'>{thread.name}</Text>
                </Box>
                <Flex gap='1' align='center' justify='flex-end'>
                    {isLogin && role === 'admin' && <>
                    <CustomIcon as={BiEditAlt} color='blue.500' activeCol="blue.700" ml='2' onClick={onOpenEdit} />
                    <CustomIcon as={BiTrash} color='red.500' activeCol="red.700" onClick={onOpen} /></>}
                    <ThreadModal isOpen={isOpenEdit} onClose={onCloseEdit} isUpdate defaultThread={thread} />
                    <RemoveModal isOpen={isOpen} onClose={onClose} object='thread' id={thread.id} />
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