import Link from "next/link";
import { GetStaticProps, GetStaticPaths } from "next";
import { POST } from "../../types";
import { getAllPostsId, getPost } from "../../api/post";
import Layout from "../../components/Layout";
import Image from "next/image";

const PostDetail: React.FC<POST> = ({ id, title, img, description }) => {
    return (
        <Layout title={title}>
            <p>
                {id}
            </p>
            <Image  src={img} width={64} height={64} alt={title} />
            <p>
                {title}
            </p>
            <p>
                {description}
            </p>
        </Layout>
    )
}

export default PostDetail

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllPostsId()
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const post = await getPost(ctx.params.id as string)
    return {
        props: {
            ...post,
        },
    }
}