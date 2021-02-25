import React from 'react'
import Navigation from '../components/Navigation/Navigation'
import Logo from '../components/Logo/Logo'
import Signin from '../components/Signin/Signin'
import Register from '../components/Register/Register'
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from '../components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js'
import './App.css'
import 'tachyons'

const particlesParams = {
  fpsLimit: 60,
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },

      resize: true,
    },
    modes: {
      push: {
        quantity: 1,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
    particles: {
    number: {
      value: 90,
        density: {
          enabled: true,
          value_area: 100
        }
    }
  }
}

const initialState = {
  input: '',
  inputUrl: '',
  boxes: [],
  route: 'signin',
  facesDetected: 0,
  user: {
    id: 0,
    login: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

const initialSearchState = {
  input: '',
  inputUrl: '',
  boxes: [],
  facesDetected: 0
}

class App extends React.Component {
  constructor () {
    super()
    this.state = initialState
  }

  calcFaceLocation = (data) => {
    const facesArr = data.outputs[0].data.regions.map(region => region.region_info.bounding_box)
    const image = document.getElementById('input-image')
    const width = Number(image.width)
    const height = Number(image.height)

    facesArr.forEach(face => {
        face.leftCol = face.left_col * width
        face.topRow = face.top_row * height
        face.rightCol = width - (face.right_col * width)
        face.bottomRow = height - (face.bottom_row * height)
      })
      this.setState({facesDetected: facesArr.length})
      return facesArr
  }

  displayFaceBox = (boxArr) => {
    this.setState({boxes: boxArr})
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value})
  }

  onSubmit = (event) => {
    this.setState({inputUrl: this.state.input})
    fetch('https://smart-brain-full.herokuapp.com/api/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        inputUrl: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      fetch('https://smart-brain-full.herokuapp.com/api/image', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: this.state.user.id
        })
      })
        .then(response => response.json())
        .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
        })
        this.displayFaceBox(this.calcFaceLocation(response))
        },
        err => {
          alert(`We got a negative response..\n${err}`)
          this.resetSearchState()
      })
    .catch(err => {
      alert(`Something went wrong..\n${err}`)
      this.resetSearchState()
    })
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.resetState()
    } else {
      this.setState({route: route})
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      login: data.login,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  resetState = () => {
    this.setState(initialState)
  }

  resetSearchState = () => {
    this.setState(initialSearchState)
  }

  renderScreen = () => {
    switch(this.state.route) {
      case 'signin':
        return <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      case 'register':
        return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      case 'home':
        return ( 
          <div>
            <Navigation onRouteChange={this.onRouteChange} resetState={this.resetState} userName={this.state.user.login} entries={this.state.user.entries} /> 
            <Logo onSubmit={this.onSubmit} />
            <ImageLinkForm onInputChange={this.onInputChange} facesDetected={this.state.facesDetected} />
            <FaceRecognition inputUrl={this.state.inputUrl} boxes={this.state.boxes} /> 
          </div>
        )
      default: 
        return <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    }
  }

  render() {
    return(
      <div className="App">
        <Particles className='particles z-1' params={particlesParams}/>
        {this.renderScreen()}
      </div>
    )
  }  
}

export default App