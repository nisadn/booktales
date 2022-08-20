import { Flex, Text, useToast } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ManageCategory } from "../../components/Container";
import Layout from "../../components/Layout/Layout";
import { axiosClient } from "../../config/apiClient";
import { RootState } from "../../redux/store";
import { get } from '../..//redux/features/category/categorySlice';
import { useRouter } from "next/router";

type Category = {
    id: string;
    name: string;
}

export async function getServerSideProps() {
  const res = await axiosClient.get('/category');
  return {
    props: {
      categories: res.data
    }
  }
};

const ManageCategoryPage = (
        { categories }: { categories: Category[]}
    ) => {
        
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const role = useSelector((state: RootState) => state.auth.account.role);
    const toast = useToast();
    const router = useRouter();
    // const categories = useSelector((state: RootState) => state.category.value);

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(get(categories));
    }, [categories]);
    
    useEffect(() => {
        if (role !== 'admin' || !isLogin) {
            toast({
                title: "You don't have permission to access this page",
                status: 'error',
                variant: 'left-accent',
                position: 'top',
                duration: 3000,
                isClosable: true,
            });
            router.push('/');
        }
    }, []);

    return (
        <div>
            <Head>
                <title>Manage Category</title>
                <meta name="description" content="Admin settings for managing categories" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout page='manage_category'>
                <Flex direction='column'>
                <Text as='span' fontSize={['3xl','4xl','4xl']} fontWeight='bold'>
                    Manage Category
                </Text>
                </Flex>
                {/* <Threads threads={threads} /> */}
                <ManageCategory categories={categories} />
            </Layout>

        </div>
    )
}

export default ManageCategoryPage;