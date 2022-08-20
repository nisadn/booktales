import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';

const OutlineButton: React.FC<ButtonProps> = (props) => {
    const { children, ...rest } = props;
    return (
        <Button
            variant='outline'
            borderRadius='full'
            colorScheme='blue'
            {...rest}
        >
            {children}
        </Button>
    )
}

export default OutlineButton;