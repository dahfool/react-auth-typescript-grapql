import React, { useState} from 'react'

export interface User {
  email: string
  password: string
}

interface Props {
  submit: (data: User) => void
  errors: []
}

const AuthForm: React.FC<Props> = ({ submit, errors }) => {

  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit({
      email,
      password
    })
  }

  return (
    <div className='row'>
      <form onSubmit={onSubmit} className='col s4'>
        <div className='input-field'>
          <input
            placeholder='email'
            type='email'
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              e.preventDefault()
              setEmail(e.target.value)
            }}
          />
        </div>
        <div className='input-field'>
          <input
            placeholder='password'
            type='password'
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              e.preventDefault()
              setPassword(e.target.value)
            }}
          />
        </div>
        <div className='errors'>
          {errors.map(error => (
            <div key={error}>{error}</div>
          ))}
        </div>
        <button type='submit' className='btn'>Submit</button>
      </form>
    </div>
  );
};

export default AuthForm;
