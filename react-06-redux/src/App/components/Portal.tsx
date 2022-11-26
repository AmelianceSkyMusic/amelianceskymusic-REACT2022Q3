import { Component } from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('root');
interface IPortalProps {
  children: React.ReactElement;
}

export class Portal extends Component<IPortalProps> {
  container = document.createElement('div');

  componentDidMount() {
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.container);
  }
}
