import { Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useMutation, UseMutationResult } from "react-query";
import { useSelector } from "react-redux";
import { categoryApi } from "../../config/service/categoryApi";
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

    const deleteObject = async (id: string) => {
        let res: any;
        if (object === 'thread') {
            res = await threadApi.delete(id);
        } else if (object === 'post') {
            res = await postApi.delete(id);
        } else {
            res = await categoryApi.delete(id);
        }
        return res.data;
    }

    const mutation: UseMutationResult<DeleteResp, Error, string> = useMutation<DeleteResp, Error, string>(deleteObject, {
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
                title: `Successfully delete ${object}`,
                variant: 'left-accent',
                status: 'success',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        }
    });

    const handleDelete = () => {
        mutation.mutate(id);
    }

    if (mutation.isSuccess) {
        if (object === 'thread') {
            router.push(`/category/${cId}`);
        } else {
            router.reload();
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={['xs','md','md']}>
            <ModalOverlay />
            <ModalContent px='4' py='2' textAlign='center'>
            <ModalHeader fontSize='lg' pb='1'>
                Are you sure you want to delete this {object}?
            </ModalHeader>

            <ModalFooter justifyContent='center' gap='4'>
                <PrimaryButton px='10' onClick={handleDelete} isLoading={mutation.isLoading}>Yes</PrimaryButton>
                <OutlineButton px='10' onClick={onClose}>No</OutlineButton>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default RemoveModal;