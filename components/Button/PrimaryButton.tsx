import { Button, ButtonProps } from "@chakra-ui/react"
import React from "react";

const PrimaryButton: React.FC<ButtonProps> = (props) => {
    const { children, background, color, ...rest } = props;
    return (
        <Button
            bgGradient='linear(to-l, green.300, blue.500)'
            color='white'
            borderRadius='full'
            _hover={{
                bgGradient:'linear(to-l, green.400, blue.600)',
                transition:'0.3s'
            }}
            _active={{
                bgGradient:'linear(to-l, green.500, blue.500)',
                transition:'0.3s'
            }}
            transition='0.3s'
            {...rest}
        >
            {children}
        </Button>
    )
}

export default PrimaryButton;