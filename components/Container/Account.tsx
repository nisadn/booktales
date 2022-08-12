import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Link, Text } from "@chakra-ui/react"
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../Button";
import { StyledLogo } from "../StyledComponents/Styled";

interface AccountProps {
    isRegister?: boolean;
}

const Account: React.FC<AccountProps> = (props) => {
    const { isRegister } = props;
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [ loadSubmit, setLoadSubmit ] = useState(false);
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    const onSubmit = (data: any) => {
        // setLoadSubmit(true);
        console.log(data);
        if (!isRegister) {
            router.push('/');
        }
    };

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
            <Flex direction='column' w='fit-content' px='10' py='8' 
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

            <PrimaryButton px='10' type='submit' isLoading={loadSubmit} mt='6' >
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