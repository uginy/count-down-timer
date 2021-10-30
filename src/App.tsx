import React from 'react';
import {Provider} from 'react-redux'
import {Layout} from 'antd';
import {store} from './store';

import "./styles/index.scss";

import CountDownControls from './components/CountDownControls';
import CountDownTimerLaps from './components/CountDownTimerLaps';
import BeforeUnloadComponent from './components/generic/BeforeUnload';
import MainWrapper from './components/generic/MainWrapper';

const App = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <BeforeUnloadComponent/>
      <Layout className='layout'>
        <Layout.Header>
          <CountDownControls/>
        </Layout.Header>
        <Layout.Content className='content'>
          <MainWrapper>
            <CountDownTimerLaps/>
          </MainWrapper>
        </Layout.Content>
      </Layout>
    </Provider>
  );
}

export default App;
