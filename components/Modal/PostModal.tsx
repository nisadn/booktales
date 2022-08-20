import { FormControl, FormErrorMessage, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { OutlineButton, PrimaryButton } from "../Button";
import { useForm } from 'react-hook-form';
import { useMutation, UseMutationResult } from "react-query";
import { postApi } from "../../config/service/postApi";
import { useRouter } from "next/router";

interface IPostModal {
    isOpen: any;
    onClose: any;
    defaultContent?: string;
    isUpdate?: boolean;
    isReply?: boolean;
    pid?: string;
    tid?: string;
}

type PostReq = {
    threadId: string;
    content: string;
    replyId?: string;
}

type EditReq = {
    id: string;
    content: string;
}

const PostModal: React.FC<IPostModal> = (props) => {
    const { isOpen, onClose, defaultContent, isUpdate, isReply, pid, tid } = props;

    const { register, handleSubmit, formState: { errors } } = useForm();
    const toast = useToast();
    const router = useRouter();

    const postPost = async (data: PostReq | EditReq) => {
        let res: any;
        if (isUpdate) {
            res = await postApi.edit(data); 
        } else {
            res = await postApi.create(data);
        }
        return res.data;
    }
    const mutation: UseMutationResult<any, Error, PostReq | EditReq> = useMutation<any, Error, PostReq | EditReq>(postPost, {
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
        onSuccess: () => {
            toast({
                title: `Successfully ${isReply ? 'reply' : isUpdate ? 'update' : 'create' } post`,
                variant: 'left-accent',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        }
    })

    const onSubmit = (data: any) => {
        if (isReply) {
            data.threadId = tid;
            data.replyId = pid;
        } else if (isUpdate) {
            data.id = pid;
        } else {
            data.threadId = tid;
        }
        mutation.mutate(data);
    };

    if (mutation.isSuccess) {
        router.reload();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={['xs','lg','xl']}>
            <ModalOverlay />
            <ModalContent px='4' py='2' textAlign='center'>
            <ModalHeader fontSize='lg' pb='1'>
                {isUpdate ? 'Update' : isReply ? 'Reply' : 'Add'} Post
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pt='4'>
            <FormControl isInvalid={errors.content !== undefined}>
                <Textarea
                    defaultValue={defaultContent}
                    placeholder='Write here'
                    minHeight={['300px','200px','150px']}
                    {...register("content", {required: true})}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
            </ModalBody>

            <ModalFooter justifyContent='center' gap='4'>
                <PrimaryButton px='10' type='submit' isLoading={mutation.isLoading} >{isUpdate ? 'Save' : 'Post'}</PrimaryButton>
                <OutlineButton px='10' onClick={onClose}>Cancel</OutlineButton>
            </ModalFooter>
            </form>
            </ModalContent>
        </Modal>
    )
}

export default PostModal;