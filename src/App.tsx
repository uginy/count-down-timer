import React from 'react';
import "./index.scss";
import {Provider} from 'react-redux'
import {store} from './store';
import CountDownControls from './components/CountDownControls';
import {Layout} from 'antd';
import CountDownTimerLaps from './components/CountDownTimerLaps';
import BeforeUnload from './components/generic/BeforeUnload';

const App = (): React.ReactElement => {
  return (
    <Provider store={store}>
      <BeforeUnload/>
      <Layout className='layout'>
        <Layout.Header>
          <CountDownControls/>
        </Layout.Header>
        <Layout.Content className='content'>
          <main>
            <CountDownTimerLaps/>
          </main>
        </Layout.Content>
      </Layout>
    </Provider>
  );
}

export default App;
