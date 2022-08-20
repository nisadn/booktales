import { Button, Flex, Text, Wrap } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../../redux/features/category/selectedCatSlice";
import { RootState } from "../../redux/store";

type Category = {
    id: string;
    name: string;
}

const Ads = () => {
    const router = useRouter();
    const categories = useSelector((state: RootState) => state.category.value);
    const dispatch = useDispatch();
    
    return (
        <Flex direction='column' mt='8' gap='10'>
            <Flex 
                direction='column' 
                pt='6' 
                px='8'
                pb='8'
                boxShadow='md' 
                borderRadius='md' 
                gap='4'
                bgGradient='linear(to-r, green.300, blue.500)'
            >
                <Text fontWeight='semibold' fontSize='2xl'>
                    Discover stories and thinking from other users on any topic within these categories.
                </Text>
                <Wrap spacingY='4' spacingX='4' pb='2'>
                    {categories && categories.map((c: Category) => (
                        <Button 
                            variant='outline' 
                            border='2px'
                            key={c.id} 
                            onClick={() => {
                                dispatch(select(c));
                                router.push(`/category/${c.id}`);
                            }}
                        >{c.name}</Button>        
                    ))}
                </Wrap>
            </Flex>
        </Flex>
    )
}

export default Ads;
