import React, { useEffect } from 'react'
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
  const RequireAuth: React.FC<{}> = () => {

    let history = useHistory();

    const { loading, error, data } = useQuery(CurrentUser)

    if (loading) return <p>loading</p>;
    if (error) return <p>ERROR</p>;
    if (!data.user) { history.push('/login') }

    return (
      <>
        {(data.user) && <WrappedComponent />}
      </>
    )
  }
  return RequireAuth
}
