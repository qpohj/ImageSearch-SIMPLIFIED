interface UserProps {
    user: any;
}
const UserData = (props: UserProps) => {
    const { user } = props;


    return (
        <>
            <img src={user.picture} alt={user.name + user.email}
            />
        </>
    )
}

export default UserData