import React, {useState} from 'react'
import {useMutation, useQuery} from "@apollo/react-hooks";
import { useHistory } from 'react-router-dom'

import AuthForm, { User } from './AuthForm'
import Signup from '../mutations/Signup'
import CurrentUser from '../queries/CurrentUser'

const SignUpForm: React.FC<{}> = () => {
  const [errors, setErrors] = useState<[]>([])
  const { loading, error, data } = useQuery(CurrentUser)
  const [SignUpUser] = useMutation(Signup, {
    refetchQueries: [{query: CurrentUser}]
  })

  const history = useHistory();

  const onSubmit = ({ email, password}: User) => {
    SignUpUser({
      variables: {
        email,
        password
      }
    }).catch((data) => {
      const errors = data.graphQLErrors.map((error: { message: string }) => error.message)
      setErrors(errors)
    })
  }

  if (data && data.user) {
    history.push('/dashboard')
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
