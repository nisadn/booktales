import { Badge, Box, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { OutlineButton } from "../../components/Button";
import { Threads } from "../../components/Container";
import Layout from "../../components/Layout/Layout";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { IoIosArrowRoundForward } from "react-icons/io";
import CustomIcon from "../../components/Icon/CustomIcon";
import { RemoveModal, ThreadModal } from "../../components/Modal";
import ThreadStarter from "../../components/Container/ThreadStarter";
import Posts from "../../components/Container/Posts";

const ThreadDetailPage = () => {
    const router = useRouter();
    const id = router.query.id;

    return (
        <div>
            <Head>
                <title>Thread Details</title>
                <meta name="description" content="Thread Details" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout page='details'>
                <ThreadStarter thread={starter_thread} />
                <Posts />
            </Layout>

        </div>
    )
}

export default ThreadDetailPage;

type Category = {
    id: string;
    title: string;
}

type StarterPost = {
    id: string;
    content: string;
}

type StarterThread = {
    id: string;
    title: string;
    author: string;
    category: Category;
    starter_post: StarterPost;
}

const starter_thread: StarterThread = {
    id: "1",
    title: "Hello World!",
    author: "nis.adn",
    category: {
        id: "1",
        title: "Fiction",
    },
    starter_post: {
        id: "1",
        content: "Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
ipsum lorem ipsum sir Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
ipsum lorem ipsum sir Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
ipsum lorem ipsum sir Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
ipsum lorem ipsum sir Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet \
ipsum lorem ipsum sir Lorem ipsum sir dolor amet Lorem ipsum sir dolor amet"
    }
}