import { FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Textarea, useToast } from "@chakra-ui/react";
import React from "react";
import { OutlineButton, PrimaryButton } from "../Button";
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useMutation, UseMutationResult } from "react-query";
import { threadApi } from "../../config/service/threadApi";
import { useRouter } from "next/router";

type Category = {
    id: string;
    name: string;
}

interface IThreadModal {
    isOpen: any;
    onClose: any;
    isUpdate?: boolean;
    defaultThread?: Thread;
}

type Thread = {
    id: string;
    name: string;
}

type ThreadReq = {
    name: string;
    categoryId: string;
    firstPost: {
        content: string;
    }
}

type ThreadResp = {
    id: string;
    name: string;
    firstPost: any;
}

const ThreadModal: React.FC<IThreadModal> = (props) => {
    const { isOpen, onClose, isUpdate, defaultThread } = props;

    const { register, handleSubmit, formState: { errors } } = useForm();
    const categories = useSelector((state: RootState) => state.category.value);
    const formData = new FormData() as any;
    const router = useRouter();
    const toast = useToast();

    const postThread = async (data: ThreadReq | Thread) => {
        let res: any;
        if (isUpdate) {
            res = await threadApi.edit(data);
        } else {
            res = await threadApi.create(data);
        }
        return res.data;
    }

    const mutation: UseMutationResult<ThreadResp, Error, ThreadReq | Thread> = useMutation<ThreadResp, Error, ThreadReq | Thread>(postThread, {
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
                title: `Successfully ${isUpdate ? 'update' : 'create'} thread`,
                variant: 'left-accent',
                status: 'success',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        }
    })

    const onSubmit = (data: any) => {
        if (isUpdate) {
            formData.append('name', data.name);
            const param = {
                id: `${defaultThread?.id}`,
                name: `${data.name}`
            }
            mutation.mutate(param);
        } else {
            data.firstPost = {
                content: data.firstPost
            }
            mutation.mutate(data);
        }
    };

    if (mutation.isSuccess) {
        router.reload();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={['xs','lg','xl']}>
            <ModalOverlay />
            <ModalContent px='4' py='2' textAlign='center'>
            <ModalHeader fontSize='lg' pb='1'>
                {isUpdate ? 'Update ' : 'Create '} Thread
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pt='0'>
            <FormControl isInvalid={errors.name !== undefined}>
                <FormLabel fontWeight={'semibold'}>Title</FormLabel>
                    <Input 
                        defaultValue={defaultThread?.name} 
                        placeholder='Insert title here' 
                        {...register("name", {
                            required: true, 
                            maxLength: 100
                        })} 
                    />
                    <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>

                {!isUpdate && <FormControl mt={4} 
                    isInvalid={errors.categoryId !== undefined}
                >
                    <FormLabel fontWeight={'semibold'}>Category</FormLabel>
                    <Select
                        placeholder={isUpdate ? '' : 'Select category'}
                        {...register("categoryId", {required: true})}
                    >
                        {categories && categories.map((val: Category) => (
                            <option value={val.id} key={val.id}>{val.name}</option>
                        ))}
                    </Select>
                    <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>}

                {!isUpdate && 
                    <FormControl mt={4} isInvalid={errors.firstPost !== undefined}>
                        <FormLabel fontWeight={'semibold'}>Starter Post</FormLabel>
                        <Textarea
                            placeholder='Write post here'
                            minHeight={['200px','200px','150px']}
                            {...register("firstPost", {required: true})}
                        />
                        <FormErrorMessage>This field is required</FormErrorMessage>
                    </FormControl>
                }
            </ModalBody>

            <ModalFooter justifyContent='center' gap='4'>
                <PrimaryButton px='10' type='submit' isLoading={mutation.isLoading} >{isUpdate ? 'Save' : 'Add'}</PrimaryButton>
                <OutlineButton px='10' onClick={onClose}>Cancel</OutlineButton>
            </ModalFooter>
            </form>
            </ModalContent>
        </Modal>
    )
}

export default ThreadModal;