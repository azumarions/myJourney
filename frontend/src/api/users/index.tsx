export const getAllUsers = async () => {
    const res = await fetch(
        new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/profile-list`)
    )
    const users = await res.json()
    return users
}