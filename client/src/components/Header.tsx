import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import CurrentUser from '../queries/CurrentUser'
import Logout from '../mutations/Logout'
import { Link } from 'react-router-dom'

const Header: React.FC<{}> = () => {

  const { loading, error, data, refetch } = useQuery(CurrentUser);
  const [logoutUser, { loading: mutationLoading}] = useMutation(Logout, {
    refetchQueries: [{query: CurrentUser}]
  });

  return (
    <nav>
      <div className='nav-wrapper'>
        <ul className='right'>
          { loading
            ? <p>loading</p> :
            data.user ?
              <li><a onClick={ () => { logoutUser() }}>Logout</a> </li> :
              <div>
                <li><Link to='/signup'>Signup</Link></li>
                <li><Link to='/login'>Login</Link></li>
              </div>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Header;
