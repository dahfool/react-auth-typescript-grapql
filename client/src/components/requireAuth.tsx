import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import CurrentUser from '../queries/CurrentUser'

interface Props {
  data: {
    loading: [],
    user: {}
  }
}

export default (WrappedComponent: React.ComponentType) => {
  const RequireAuth: React.FC = () => {

    const { loading, error, data } = useQuery(CurrentUser, {
      onCompleted: ({user}) => {
        if (!user) {
          history.push('/login')
        }
      }
    })
    const history = useHistory();

    if (loading) return <p>loading</p>;
    if (error) return <p>ERROR</p>;

    return (
      <>
        {(data.user) && <WrappedComponent />}
      </>
    )
  }
  return RequireAuth
}
