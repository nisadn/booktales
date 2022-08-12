import { Icon, IconButton, Tooltip } from "@chakra-ui/react"
import React from "react";

interface IMenuIcon {
    icon: any;
    label: string;
    color?: string;
    isActive?: boolean;
    onClick?: any;
}

const MenuIcon: React.FC<IMenuIcon> = (props) => {
    const { icon, label, color, isActive, onClick } = props;

    return (
        <Tooltip hasArrow label={label} placement='right' display={['none','block','block']}>
            <IconButton 
                aria-label={label} 
                icon={<Icon as={icon} w='6' h='6' />} 
                variant='ghost'
                _hover={{
                    color:'black',
                    transition:'0.3s'
                }}
                bg={isActive ? 'blue.600' : 'none'}
                color={isActive ? 'white' : color ? color : 'gray.500'}
                borderRadius='full'
                transition='0.3s'
                onClick={onClick}
            />
        </Tooltip>
    )
}

export default MenuIcon;