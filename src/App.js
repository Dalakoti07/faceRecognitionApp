import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import './App.css';
import 'tachyons';

class App extends Component{
  render(){
    return (
      <div className="App">
      <Navigation />
      <Logo />
      {/*<ImagelinkForm />
      <FaceRecogition />
      */}
      </div>
      );
  }
}
export default App;
