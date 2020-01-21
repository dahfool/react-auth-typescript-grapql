import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

import AuthForm, { User } from './AuthForm'
import Login from '../mutations/Login'
import CurrentUser from '../queries/CurrentUser'

const LoginForm: React.FC = () => {
  const [errors, setErrors] = useState<[]>([])
  const [LoginUser] = useMutation(Login)
  useQuery(CurrentUser)
  const history = useHistory();

  const onSubmit = ({ email, password}: User) => {
    LoginUser({
      variables: {
        email,
        password
      },
      awaitRefetchQueries: true,
      refetchQueries:  [{query: CurrentUser}]
    }).then(() => { history.replace('/dashboard') })
      .catch((data) => {
        const errors = data.graphQLErrors.map((error: { message: string }) => error.message)
        setErrors(errors)
      })
  }

  return (
    <>
      <h3>Login</h3>
      <AuthForm
        submit={onSubmit}
        errors={errors}
      />
    </>
  )
}

export default LoginForm
