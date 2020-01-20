import React from 'react';
import { useQuery } from '@apollo/react-hooks'

import CurrentUser from '../queries/CurrentUser'

const GetUser: React.FC<{}> = () => {

  const { loading, error, data } = useQuery(CurrentUser);

  if (error) return <p>error</p>;
  if (loading || !data) return <p>Fetching</p>;

  return (
    <div>
      { data.user ?  data.user.email : 'out'}
    </div>
  );
};

export default GetUser;
