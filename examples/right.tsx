/* eslint-disable no-console */
/* tslint:disable:no-console */
import '../assets/index.less';
import Swipeout from '../src/';
import React from 'react';
import ReactDOM from 'react-dom';

class Demo extends React.Component {

  state = {
    open: true,
  };

  onClick = () => {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <div style={{ marginBottom: 12 }}>
        <a onClick={this.onClick}>swipe</a>
      <Swipeout
      style={{ backgroundColor: 'white' }}
      open={this.state.open}
      right={[
        { text: 'more',
          onPress: () => {
            this.setState({open: false});
          },
          style: { backgroundColor: 'orange', color: 'white' },
        },
        { text: 'delete',
          onPress: () => console.log('delete'),
          style: { backgroundColor: 'red', color: 'white' },
        },
      ]}
      onOpen={() => console.log('open')}
      onClose={() => console.log('close')}
    >
      <div onClick={() => {
        console.log('emit an event on children element!');
      }} style={{
        height: 44,
        backgroundColor: 'white',
        lineHeight: '44px',
        borderTop: '1px solid #dedede',
        borderBottom: '1px solid #dedede',
      }}
      >swipe out simple demo</div>
    </Swipeout>
    </div>
    );
  }

}

ReactDOM.render(
  <Demo />,
  document.getElementById('__react-content'),
);
