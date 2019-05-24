import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';
const particlesOptions={
      "particles": {
          "number": {
              "value": 80
          },
          "size": {
              "value": 3
          }
      },
      "interactivity": {
          "events": {
              "onhover": {
                  "enable": true,
                  "mode": "repulse"
              }
          }
      }
  };

class App extends Component{
  render(){
    return (
      <div className="App">
      <Particles className='particles'
      params={particlesOptions}
      />

      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*<FaceRecogition />
      */}
      </div>
      );
  }
}
export default App;
