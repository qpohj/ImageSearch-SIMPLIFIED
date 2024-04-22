import { useAuth0 } from '@auth0/auth0-react';
import '../App.css';
import SearchForm from '../component/SearchForm';
import LoginButton from '../component/buttons/LoginButton';
import LogoutButton from '../component/buttons/LogoutButton';

const Root = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log("isAuth", isAuthenticated)
  console.log("user", user)

  console.log("isLoading", isLoading)




  // async function searchQuery() {
  //   try {
  //     const response = await axios.get('/user?ID=12345');
  //     console.log(response);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  if (isLoading) {
    <h3>Loading User...</h3>
  }

  return (!isAuthenticated ? (
    <div>
      <h1>We are in the root</h1>
      <p>Login please</p>
      <LoginButton />
    </div>
  ) : (
    <div>
      <h1>We are in the root</h1>
      <p>You are logged in</p>
      <LogoutButton />

      <div>
        <h2>UserData</h2>
        <p>Name: {user?.name}</p>
        <p>Nickname: {user?.nickname}</p>
        <img src={user?.picture} width={200} />
      </div>

      <div>
        <SearchForm />
      </div>
    </div>
  )
  )
}

export default Root
