import { GetStaticProps, GetStaticPaths } from "next";
import { USER } from "../../types";
import Layout from "../../components/Layout";
import { getAllUsersId, getUser } from "../../api/users";
import { Avatar } from "@mui/material";

const UserDetail: React.FC<USER> = ({ id, name, img, statusMessage, description, }) => {
    return (
        <Layout title={name}>
            <Avatar sx={{ width: 350, height: 350 }} 
              src={img}
              alt={name} />
            <p>
                {name}
            </p>
            <p>
                {description}
            </p>
        </Layout>
    )
}

export default UserDetail

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllUsersId()
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const user = await getUser(ctx.params.id as string)
    return {
        props: {
            ...user,
        },
    }
}