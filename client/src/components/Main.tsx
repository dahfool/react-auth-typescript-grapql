import React from 'react'
import Header from './Header'

interface Props {
  children: React.ReactElement
}

const Main: React.FC<{}> = () => {
  return (
    <div className='container'>
      <Header/>
    </div>
  );
};

export default Main;
