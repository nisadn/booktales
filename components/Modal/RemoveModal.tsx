import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, UseMutationResult } from "react-query";
import { useSelector } from "react-redux";
import { postApi } from "../../config/service/postApi";
import { threadApi } from "../../config/service/threadApi";
import { RootState } from "../../redux/store";
import { OutlineButton, PrimaryButton } from "../Button";

interface IModal {
    isOpen: any;
    onClose: any;
    object: string;
    id: string;
}

type DeleteResp = {
    deletedCount: number;
}

const RemoveModal: React.FC<IModal> = (props) => {
    const { isOpen, onClose, object, id } = props;
    const toast = useToast();
    const router = useRouter();
    const cId = useSelector((state: RootState) => state.selectedCat.value.id);

    const deleteThread = async (id: string) => {
        const res = await threadApi.delete(id);
        return res.data;
    }
    const deletePost = async (id: string) => {
        const res = await postApi.delete(id);
        return res.data;
    }
    const mutation: UseMutationResult<DeleteResp, Error, string> = useMutation<DeleteResp, Error, string>(deleteThread, {
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
                title: `Successfully delete thread`,
                variant: 'left-accent',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        }
    });
    const mutationPost: UseMutationResult<DeleteResp, Error, string> = useMutation<DeleteResp, Error, string>(deletePost, {
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
                title: `Successfully delete post`,
                variant: 'left-accent',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        }
    });

    const handleDelete = () => {
        if (object === 'thread') {
            mutation.mutate(id);
        } else if (object === 'post') {
            mutationPost.mutate(id);
        }
    }

    if (mutation.isSuccess) {
        router.push(`/category/${cId}`);
    }

    if (mutationPost.isSuccess) {
        router.reload();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={['xs','md','md']}>
            <ModalOverlay />
            <ModalContent px='4' py='2' textAlign='center'>
            <ModalHeader fontSize='lg' pb='1'>
                Are you sure you want to delete this {object}?
            </ModalHeader>

            <ModalFooter justifyContent='center' gap='4'>
                <PrimaryButton px='10' onClick={handleDelete} isLoading={mutation.isLoading || mutationPost.isLoading}>Yes</PrimaryButton>
                <OutlineButton px='10' onClick={onClose}>No</OutlineButton>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default RemoveModal;