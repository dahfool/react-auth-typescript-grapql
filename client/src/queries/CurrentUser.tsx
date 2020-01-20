import { gql } from 'apollo-boost'

export default gql`
    {
        user {
            email
            id
        }
    }
`
