import React from 'react'
import Header from './Header'

interface Props {
  children: React.ReactElement
}

const Main: React.FC<Props> = ({children}) => {
  return (
    <div className='container'>
      <Header/>
      {children}
    </div>
  );
};

export default Main;
