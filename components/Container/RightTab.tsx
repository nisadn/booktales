import { Box, Button, Divider, Flex, Text, useDisclosure, Wrap } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { select } from "../../redux/features/category/selectedCatSlice";
import { RootState } from "../../redux/store";
import { OutlineButton, PrimaryButton } from "../Button";
import { CategoryModal } from "../Modal";

type Category = {
  id: string;
  name: string;
}

const RightContent = () => {
  const router = useRouter();
  const categories = useSelector((state: RootState) => state.category.value);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const account = useSelector((state: RootState) => state.auth.account);

  return (
    <Flex direction='column' w='full' overflowY='auto' h={['screen','100vh','100vh']} py='6' px='8' gap='4' >
      { isLogin && <><Text as='span'
          bgGradient='linear(to-l, purple.600, blue.500)'
          bgClip='text'
          fontWeight='extrabold'
          fontSize='xl'
          w='fit-content'
      >@{account.username}
      </Text>
      <Divider /></>}
      <Flex direction='column' gap='2'>
        <Text fontWeight='semibold' mb='2'>Choose category to see threads</Text>
        <Box w='full' lineHeight={7} >
            {categories.map((val: Category) => (
                // <Badge colorScheme='facebook' px='4' mr='2' mb='2' key={val.id}>{val.title}</Badge>
                <Button mr='2' mb='2' size='sm' key={val.id} onClick={() => {
                  dispatch(select(val));
                  router.push(`/category/${val.id}`);
                }}>{val.name}</Button>
            ))}
        </Box>
        {isLogin && account.role === 'admin' && <><PrimaryButton onClick={onOpen} size={['sm', 'sm', 'md']} >Add Category</PrimaryButton>
        <OutlineButton onClick={() => router.push('/')} size={['sm', 'sm', 'md']}>
        <Text whiteSpace='normal'>
          Manage Category
        </Text>
        </OutlineButton></>}
        <CategoryModal isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Divider />
      {!isLogin && <Flex direction='column' gap='2'>
          <Text fontWeight='semibold' mb='2'>
              Login/register for more experience!
          </Text>
          <PrimaryButton onClick={() => router.push('/login')}>Login</PrimaryButton>
          <OutlineButton onClick={() => router.push('/register')}>Get Started</OutlineButton>
      </Flex>}
  </Flex>
  )
}

const RightTab = () => {

    return (
        <Flex w='25vw' boxShadow={'base'} position='fixed' right='0'
          display={['none','block','block']}
        >
            <RightContent />
        </Flex>
    )
}

export default RightTab;
export { RightContent };

// type Category = {
//     id: string,
//     title: string,
// }

// const categories: Category[] = [{
//     id: '1',
//     title: "Fiction",
//   },{
//     id: '2',
//     title: "Non-Fiction",
//   },{
//     id: '3',
//     title: "Biography",
//   },{
//     id: '4',
//     title: "Drama",
//   },{
//     id: '5',
//     title: "Romance",
//   },{
//     id: '6',
//     title: "Adventure",
//   },{
//     id: '7',
//     title: "Scifi",
//   },{
//     id: '8',
//     title: "Fantasy",
//   }
// ]