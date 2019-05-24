import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Clarifai from 'clarifai';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
 apiKey: 'APIKEY'
});

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
  constructor()
  {
    super();
    this.state={
      input:'',
    }
  }

  onInputChange=(event)=>{
    console.log(event.target.value);
  }

  onButtonSubmit=()=>{
    console.log('button clicked');
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg")
    .then(
    function(response) {
      // do something with response
      console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
  }

  render(){
    return (
      <div className="App">
      <Particles className='particles'
      params={particlesOptions}
      />

      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}/>
      {/*<FaceRecogition />
      */}
      </div>
      );
  }
}
export default App;
