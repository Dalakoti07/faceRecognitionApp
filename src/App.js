import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Signin from './components/Signin/Signin'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Clarifai from 'clarifai';
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';

const app = new Clarifai.App({
 apiKey: '019eb72382594c56929de5fe4b3fba43'
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
      imageUrl:'',
      box:{},
      route:'signin'
    }
  }

  calculateFaceLocation=(data)=>{
    const ClarifaiFace =data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputImage');
    const width=Number(image.width);
    const height=Number(image.height);
    console.log(width,height);
    return {
      leftCol: ClarifaiFace.left_col * width,
      topRow: ClarifaiFace.top_row * height,
      rightCol: width - (ClarifaiFace.right_col * width),
      bottomRow: height - (ClarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox=(box)=>{
    this.setState({box:box});
    console.log(box);
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }
  //  console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
  onButtonSubmit=()=>{
    console.log('button clicked');
    this.setState({imageUrl:this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response =>this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err=> console.log(err));
  }

  onRouteChange=(route)=>{
    this.setState({route:route});
  }

  render(){
    return (
      <div className="App">
      <Particles className='particles'
      params={particlesOptions}
      />

      <Navigation onRouteChange={this.onRouteChange}/>
      {
      this.state.route==='signin'?
      <Signin onRouteChange={this.onRouteChange}/>
      :<div><Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
      }
      
      </div>
      );
  }
}
export default App;
