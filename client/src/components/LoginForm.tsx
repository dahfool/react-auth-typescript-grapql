import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import AuthForm, { User } from './AuthForm'
import Login from '../mutations/Login'
import CurrentUser from '../queries/CurrentUser'

const LoginForm: React.FC<{}> = () => {
  const [errors, setErrors] = useState<[]>([])
  const { loading, error, data } = useQuery(CurrentUser)
  const [LoginUser, { loading: mutationLoading}] = useMutation(Login, {
    refetchQueries: [{query: CurrentUser}]
  })
  const history = useHistory();

  const onSubmit = ({ email, password}: User) => {
    LoginUser({
      variables: {
        email,
        password
      }
    })
      .catch((data) => {
        const errors = data.graphQLErrors.map((error: { message: string }) => error.message)
        setErrors(errors)
      })
  }

  if (data && data.user) {
    history.push('/dashboard')
  }

  return (
    <div>
      <h3>Login</h3>
      <AuthForm
        submit={onSubmit}
        errors={errors}
      />
    </div>
  )
}

export default LoginForm
