import React from 'react';
import { Spin } from 'antd';

const Loader = ({ loadingMessage = 'Loading...' }) => {
  return (
    <div className="loader">
      <Spin tip={loadingMessage} />
    </div>
  )
}

export default Loader;
