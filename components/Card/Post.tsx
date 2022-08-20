import { Badge, Box, Divider, Flex, Icon, Link, Text, useDisclosure, useToast } from "@chakra-ui/react";
import CustomIcon from "../Icon/CustomIcon";
import { RemoveModal } from "../Modal";
import { TbArrowBigUpLine, TbArrowBigDownLine } from 'react-icons/tb';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import React, { useState } from "react";
import { PostModal } from "../Modal";
import { BsReply } from 'react-icons/bs';
import { OutlineButton } from "../Button";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useMutation, UseMutationResult } from "react-query";
import { postApi } from "../../config/service/postApi";
import { useRouter } from "next/router";

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

type VoteResp = {
    modifiedCount: number;
    upvote: number;
    downvote: number;
}

type VoteReq = {
    postId: string;
    voteType: string;
}

const PostDetails = ({ post, tid }: { post : RPost, tid: string }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen:isOpenEdit, onOpen:onOpenEdit, onClose:onCloseEdit } = useDisclosure();
    const { isOpen:isOpenReply, onOpen:onOpenReply, onClose:onCloseReply } = useDisclosure();
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const role = useSelector((state: RootState) => state.auth.account.role);
    const owner = useSelector((state: RootState) => state.auth.token.iss);
    const toast = useToast();
    const router = useRouter();
    const [upvote, setUpvote] = useState(post.upvote);
    const [downvote, setDownvote] = useState(post.downvote);

    const postVote = async (data: VoteReq) => {
        const res = await postApi.vote(data);
        return res.data;
    }

    const mutation: UseMutationResult<VoteResp, Error, VoteReq> = useMutation<VoteResp, Error, VoteReq>(postVote, {
        onError: () => {
            toast({
                title: 'Something went wrong',
                status: 'error',
                variant: 'left-accent',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        },
        onSuccess: (res) => {
            setUpvote(res.upvote);
            setDownvote(res.downvote);
        }
    });

    const handleUpvote = () => {
        if (!isLogin) {
            toast({
                title: "Please login to vote this post",
                status: 'error',
                variant: 'left-accent',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
            router.push('/login');
        } else {
            mutation.mutate({
                postId: `${post.id}`,
                voteType: 'upvote',
            });
        }
    }

    const handleDownvote = () => {        
        if (!isLogin) {
            toast({
                title: "Please login to vote this post",
                status: 'error',
                variant: 'left-accent',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
            router.push('/login');
        } else {
            mutation.mutate({
                postId: `${post.id}`,
                voteType: 'downvote',
            });
        }
    }

    // if (mutation.isSuccess) {
    // }

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
                <PostModal isOpen={isOpenReply} onClose={onCloseReply} isReply pid={post.id} tid={tid} />
                {owner !== post.owner && <>
                    <CustomIcon color='green.500' activeCol='green.700' as={TbArrowBigUpLine} onClick={handleUpvote} />
                    <Text color='green.700'>{upvote}</Text>
                    <CustomIcon color='gray.400' activeCol='gray.500' as={TbArrowBigDownLine} ml='2' onClick={handleDownvote} />
                    <Text color='gray.500' mr='2'>{downvote}</Text>
                </>}
                {owner == post.owner && <CustomIcon as={BiEditAlt} color='blue.500' activeCol="blue.700" onClick={onOpenEdit} />}
                <PostModal isOpen={isOpenEdit} onClose={onCloseEdit} isUpdate defaultContent={post.content} pid={post.id} />
                {isLogin && role === 'admin' && !post.isStarter && <CustomIcon as={BiTrash} color='red.500' activeCol="red.700" onClick={onOpen} />}
                <RemoveModal isOpen={isOpen} onClose={onClose} object='post' id={post.id} />
            </Flex>
            
            {post.reply.map((val: RPost) => (
                <Flex direction='column' pl='8' key={val.id}>
                    <Box h='2px' bg='gray.200' mb='4' mt='2' />
                    <PostDetails post={val} tid={tid} />
                </Flex>
            ))}
        </Flex>
    )
}

export default PostDetails;