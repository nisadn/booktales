import { Badge, Box, Divider, Flex, Icon, Link, Text, useDisclosure } from "@chakra-ui/react";
import CustomIcon from "../Icon/CustomIcon";
import { RemoveModal } from "../Modal";
import { TbArrowBigUpLine, TbArrowBigDownLine } from 'react-icons/tb';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import React from "react";
import { PostModal } from "../Modal";
import { BsReply } from 'react-icons/bs';
import { OutlineButton } from "../Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

type Post = {
    id: string;
    content: string;
    downvote: number;
    upvote: number;
    replyId: string;
    owner: string;
    isStarter: boolean;
    edited: boolean;
}

type RPost = Post & {
    reply: RPost[],
}

const PostDetails = ({ post }: { post : RPost }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure();
    const { isOpen:isOpenReply, onOpen:onOpenReply, onClose:onCloseReply } = useDisclosure();
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const role = useSelector((state: RootState) => state.auth.account.role);
    const owner = useSelector((state: RootState) => state.auth.token.iss);

    return (
        <Flex direction='column' id={post.id} >
            {post.isStarter && 
                <Badge w='fit-content' fontWeight='semibold' fontSize='sm' colorScheme="green" mb='2'>
                    Starter Post
                </Badge>
            }
            <Text>{post.content}</Text>
            {post.edited && 
                <Text fontWeight='semibold' fontSize='sm' color='gray.400'>
                    (edited)
                </Text>
            }

            <Flex gap='1' align='center' justify='flex-end' fontSize='xs' fontWeight='medium' my='2' >
                <OutlineButton size='xs' pr='3' onClick={onOpenReply}>
                    <Icon as={BsReply} w='4' h='4' mr='1' />
                    Reply    
                </OutlineButton>
                <PostModal isOpen={isOpenReply} onClose={onCloseReply} isReply />
                <CustomIcon color='green.500' activeCol='green.700' as={TbArrowBigUpLine} />
                <Text color='green.700'>{post.upvote}</Text>
                <CustomIcon color='gray.400' activeCol='gray.500' as={TbArrowBigDownLine} ml='2' />
                <Text color='gray.500' mr='2'>{post.downvote}</Text>
                {owner == post.owner && <CustomIcon as={BiEditAlt} color='blue.500' activeCol="blue.700" onClick={onOpenEdit} />}
                <PostModal isOpen={isOpenEdit} onClose={onCloseEdit} isUpdate defaultContent={post.content} />
                {isLogin && role === 'admin' && !post.isStarter && <CustomIcon as={BiTrash} color='red.500' activeCol="red.700" onClick={onOpen} />}
                <RemoveModal isOpen={isOpen} onClose={onClose} />
            </Flex>
            
            {post.reply.map((val: RPost) => (
                <Flex direction='column' pl='8' key={val.id}>
                    <Box h='2px' bg='gray.200' mb='4' mt='2' />
                    <PostDetails post={val} />
                </Flex>
            ))}
        </Flex>
    )
}

export default PostDetails;