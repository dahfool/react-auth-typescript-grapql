import { gql } from 'apollo-boost'

export default gql`
    mutation SignUp($email: String, $password: String) {
        signup(email: $email, password: $password) {
            email
        }
    }
`
