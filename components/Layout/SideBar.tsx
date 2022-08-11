import { Divider, Flex, Icon, IconButton, Tooltip } from '@chakra-ui/react';
import styled from 'styled-components';
import { AiOutlineHome } from 'react-icons/ai';
import { BiEdit, BiLogInCircle } from 'react-icons/bi';

interface ImageProps {
    img: string;
}

const SideBar = () => {
    return (
        <Flex w='80px' direction='column' py='6' px='4' h='100vh' boxShadow={'base'} position='fixed' zIndex={3} bg='white'>
            <Flex w='full' h='10vh'>
                <StyledLogo />
            </Flex>
            <Flex gap='5' direction='column' h='full' mt='10'>
            <Flex justify={'center'}>
            <Tooltip hasArrow label='Home' placement='right'>
                    <IconButton aria-label='home' icon={<Icon as={AiOutlineHome} w='6' h='6' />} />
            </Tooltip>
            </Flex>
            <Divider />
            <Flex justify={'center'}>
            <Tooltip hasArrow label='Add Thread' placement='right'>
                    <IconButton aria-label='add thread' icon={<Icon as={BiEdit} w='6' h='6' />} />
            </Tooltip>
            </Flex>
            </Flex>
            <Flex w='full' h='10vh' justify='center'>
            <Tooltip hasArrow label='Login' placement='right'>
                    <IconButton aria-label='login' icon={<Icon as={BiLogInCircle} w='6' h='6' />} />
            </Tooltip>
            </Flex>
        </Flex>
    )
}

export default SideBar;

const StyledLogo = styled.div`
    background-image: url('/logo.png');
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    width: 100%;
    height: 100%;
`