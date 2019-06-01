import React,{Component} from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Signin from './components/Signin/Signin'
import Rank from './components/Rank/Rank'
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
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

const initialState={
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        password:'',
        entries:0,
        joined: new Date()
      }
}

class App extends Component{
  constructor()
  {
    super();
    this.state=initialState;
  }

  loadUser=(data)=>{
    console.log('load user called and id is '+data[0].id);
    this.setState({user:{
      id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined: data.joined
    }})
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
    this.setState({imageUrl:this.state.input});
    fetch('http://localhost:3000/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
          id:this.state.user.id
          })
        })
    .then(response=>response.json())
    .then(response=>{
      if(response){
        fetch('http://localhost:3000/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
          id:this.state.user.id
          })
        })
        .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)
        }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err=> console.log(err));
  }

  onRouteChange=(route)=>{
    if(route==='signout')
      {this.setState(initialState)}
    else if(route==='home')
      {this.setState({isSignedIn:true})}
    this.setState({route:route});
  }

  render(){
    const {isSignedIn,imageUrl,route,box}=this.state;
    return (
      <div className="App">
      <Particles className='particles'
      params={particlesOptions}
      />

      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {
      route==='home'?
      <div>
        <Logo />
        <Rank name={this.state.user.name}
                entries={this.state.user.entries}/>
        <ImageLinkForm onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={box} imageUrl={imageUrl} />
      </div>
      :(
          route==='signin'
          ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
      }
      
      </div>
      );
    }
  }

export default App;
