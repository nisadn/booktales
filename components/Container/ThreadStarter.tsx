import { Badge, Box, Flex, Icon, Text, useDisclosure, useToast } from "@chakra-ui/react";
import CustomIcon from "../Icon/CustomIcon";
import { PostModal, RemoveModal, ThreadModal } from "../Modal";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";
import { OutlineButton, PrimaryButton } from "../Button";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useRouter } from "next/router";

interface IThread {
    id: string;
    name: string;
    count: number;
}

const ThreadStarter: React.FC<IThread> = (props) => {
    const { id, name, count } = props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure();
    const { isOpen:isOpenPost, onOpen:onOpenPost, onClose:onClosePost } = useDisclosure();

    const selectedCat = useSelector((state: RootState) => state.selectedCat.value.name);
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const role = useSelector((state: RootState) => state.auth.account.role);
    const toast = useToast();
    const router = useRouter();

    return (
        <>
        <Flex direction='column' pt='2'>
            {/* <Text fontWeight='medium' color='blue.600'>@{thread.author}</Text> */}
            <Text as='span' fontSize='2xl' fontWeight='bold'>
                {name}
            </Text>
            </Flex>
            <Flex gap='4' direction='column' >
            
                <Flex justify='space-between'>
                    {selectedCat !== "" &&
                        <Box>
                            <Badge colorScheme='blue' mr='2' >
                                {selectedCat}
                            </Badge>
                        </Box>
                    }
                    <Flex gap='1' align='center' justify='flex-end'>
                        <Icon color='gray.500' as={GoCommentDiscussion} w='5' h='5' ml='2'/>
                        <Text fontSize='sm' ml='1'>{count}</Text>
                        {role === 'admin' && <CustomIcon as={BiEditAlt} color='blue.500' activeCol="blue.700" ml='2' onClick={onOpenEdit} />}
                        <ThreadModal 
                            isOpen={isOpenEdit} 
                            onClose={onCloseEdit} 
                            isUpdate 
                            defaultThread={{
                                id: `${id}`,
                                name: `${name}`
                            }} 
                        />
                        {isLogin && role === 'admin' && <CustomIcon as={BiTrash} color='red.500' activeCol="red.700" onClick={onOpen} />}
                        <RemoveModal isOpen={isOpen} onClose={onClose} object='thread' id={id} />
                    </Flex>
                </Flex>
                <Flex>
                    <PrimaryButton px='6' onClick={
                        isLogin ? onOpenPost : () => {
                            toast({
                                title: "You don't have permission for this feature",
                                status: "error",
                                variant: 'left-accent',
                                position: 'top',
                                duration: 3000,
                                isClosable: true,
                            });
                            router.push('/login');
                        }}>Write Post</PrimaryButton>
                    <PostModal isOpen={isOpenPost} onClose={onClosePost} tid={id}/>
                </Flex>
            </Flex>
        </>
    )
}

export default ThreadStarter;