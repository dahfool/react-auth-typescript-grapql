import React, {useState} from 'react'
import {useMutation, useQuery} from "@apollo/react-hooks";
import { useHistory } from 'react-router-dom'

import AuthForm, { User } from './AuthForm'
import Signup from '../mutations/Signup'
import CurrentUser from '../queries/CurrentUser'

const SignUpForm: React.FC = () => {
  const [errors, setErrors] = useState<[]>([])
  useQuery(CurrentUser)
  const [SignUpUser] = useMutation(Signup)
  const history = useHistory();

  const onSubmit = ({ email, password}: User) => {
    SignUpUser({
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
    <div>
      <h3>Sign up</h3>
      <AuthForm
        submit={onSubmit}
        errors={errors}
      />
    </div>
  )
}

export default SignUpForm
