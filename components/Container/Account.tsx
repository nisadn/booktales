import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Link, Radio, RadioGroup, Stack, Text, useToast } from "@chakra-ui/react"
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, UseMutationResult } from "react-query";
import { useDispatch } from "react-redux";
import { authApi } from "../../config/service/authApi";
import { PrimaryButton } from "../Button";
import { StyledLogo } from "../StyledComponents/Styled";
import { login } from '../../redux/features/auth/authSlice';

interface AccountProps {
    isRegister?: boolean;
}

const Account: React.FC<AccountProps> = (props) => {
    const { isRegister } = props;
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const dispatch = useDispatch();
    const toast = useToast();
    
    const postLogin = async (data: AccountReq) => {
        let res: any;
        if (isRegister) {
            res = await authApi.register(data);
        } else {
            res = await authApi.login(data)
        }
        return res;
    }

    const mutation: UseMutationResult<LoginResp, Error, AccountReq> = useMutation<LoginResp, Error, AccountReq>(postLogin, {
        onError: () => {
            toast({
                title: `${isRegister ? 'Username already exists' : 'Wrong username or password'}`,
                status: 'error',
                variant: 'left-accent',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        },
        onSuccess: () => {
            toast({
                title: `${isRegister ? 'Registration' : 'Login'} success`,
                variant: 'left-accent',
                status: 'success',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
        }
    });
    
    const onSubmit = (data: any) => {
        mutation.mutate(data);
    }
    
    if (mutation.isSuccess) {
        if (isRegister) {
            router.push('/login');
        } else {
            dispatch(login(mutation.data));
            router.push('/');
        }
    } 

    return (
        <>
        <Head>
            <title>{isRegister ? 'Register' : 'Login'} to Booktales</title>
            <meta name="description" content="Booktales Account" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Flex w='screen' direction='column' textAlign='center' gap='6' p='14' align='center'>
            <Flex align='center' w='full' justify='center' gap={[4,6,6]}>
                <Flex w={['60px','80px','80px']} h={['60px','80px','80px']} pt='2' >
                    <StyledLogo />
                </Flex>
                <Text as='span'
                    bgGradient='linear(to-r, green.300, blue.500)'
                    bgClip='text'
                    fontSize={['4xl','5xl','5xl']}
                    fontWeight='bold'
                    w='fit-content'
                    align='center'
                > Booktales
                </Text>
            </Flex>
            
            <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction='column' w='fit-content' px={[6,10,10]} py='8' 
                boxShadow='md' 
                borderRadius='lg' 
                bg='gray.100'
            >
            <Text as='span' fontSize='xl' fontWeight='bold'>{isRegister ? 'Register' : 'Login'}</Text>
            <FormControl isInvalid={errors.username !== undefined} mt='4'>
                <FormLabel fontWeight={'semibold'}>Username</FormLabel>
                    <Input 
                        bg='white'
                        placeholder='Enter username' 
                        {...register("username", {
                            required: true, 
                            maxLength: 100
                        })} 
                    />
                    <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>

                <FormControl mt={4} 
                    isInvalid={errors.password !== undefined}
                >
                    <FormLabel fontWeight={'semibold'}>Password</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            bg='white'
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                            {...register("password", {required: true})} 
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>

                {isRegister && <FormControl mt={4} 
                    isInvalid={errors.role !== undefined}
                >
                    <FormLabel fontWeight={'semibold'}>Role</FormLabel>
                    <Controller name='role' control={control} rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <RadioGroup 
                                onChange={onChange} 
                                value={value} 
                            >
                            <Stack direction='row' gap='3'>
                                <Radio value='user' borderColor='gray.400'>User</Radio>
                                <Radio value='admin' borderColor='gray.400'>Admin</Radio>
                            </Stack>
                            </RadioGroup>
                            )}
                    />
                    <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>}

            <PrimaryButton px='10' type='submit' isLoading={mutation.isLoading} mt='6' >
                {isRegister ? 'Register' : 'Login'}
            </PrimaryButton>

            <Text fontSize='sm' mt='4' >
                {isRegister ? "Already have an account? " : "Don't have an account yet? "}
                <Link onClick={() => router.push(isRegister ? '/login' : '/register')}>
                    <Text color='blue.600' fontWeight='semibold' >
                        {isRegister ? 'Login': 'Register'} here!
                    </Text>
                </Link>
            </Text>

            </Flex>
            </form>
        </Flex>
        </>
    )
}

export default Account;

type AccountReq = {
    username: string;
    password: string;
}

type AccountResp = {
    username: string;
    role: string;
}

type LoginResp = AccountResp & {
    token: string;
}

type RegisterReq = AccountReq & {
    role: string;
}

type RegisterResp = AccountResp & {
    id: string;
}