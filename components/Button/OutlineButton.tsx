import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

const OutlineButton: React.FC<ButtonProps> = (props) => {
    const { children, ...rest } = props;
    return (
        <Button
            variant='outline'
            borderRadius='full'
            // border='2px'
            // borderColor='green.300'
            colorScheme='blue'
            // color='blue.500'
            {...rest}
        >
            {children}
        </Button>
    )
}

export default OutlineButton;