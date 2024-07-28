interface UserProps {
    user: any;
}
const UserData = (props: UserProps) => {
    const { user } = props;


    return (
        <>
            <img style={{
                    width: "200px",
                    margin: "10px",
                }}
            src={user.picture} alt={user.name + "" + user.email}
            />
            <div>
                <p>{user.nickname}</p>
            </div>
        </>
    )
}

export default UserData