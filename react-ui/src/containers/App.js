import React from 'react'
import Navigation from '../components/Navigation/Navigation'
import Signin from '../components/Signin/Signin'
import Register from '../components/Register/Register'
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from '../components/FaceRecognition/FaceRecognition'
import Profile from '../components/Profile/Profile'
import Particles from 'react-particles-js'
import './App.css'
import 'tachyons'

const particlesParams = {
  fpsLimit: 30,
  interactivity: {
    detectsOn: "window",
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
      value: 80,
        density: {
          enabled: true,
          value_area: 200
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
  isProfileOpen: false,
  user: {
    id: 0,
    login: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    birthday: ''
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

  componentDidMount() {

    const token = window.sessionStorage.getItem('token')

    setTimeout(() => {
      if (token) { 
        fetch('/api/signin',{
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        })
        .then(res => res.json())
        .then(data => {
          if (data.login && data.id) {
            fetch(`/api/profile/${data.id}`, {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token    
              }})
              .then(resp => resp.json())
              .then(user => {
                if (Object.keys(user).length && user.id) {
                  this.loadUser(user)
                  this.onRouteChange('home')
                } else {
                    console.warn('Could not load user profile.')
                }})
          } else {
            console.warn('Could not fetch user profile.')
          }
        })
      } else {
        console.warn('Token not verified.')
      }
    }, 300)
  }

  calcFaceLocation = (data) => {
    if (data.outputs) {
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
    } else {
        alert('The image URL may not be valid')
    }
  }

  displayFaceBox = (boxArr) => {
    boxArr && this.setState({boxes: boxArr})
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value})
  }

  onSubmit = (event) => {
    this.setState({inputUrl: this.state.input})
    fetch('/api/imageurl', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        inputUrl: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      fetch('/api/image', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token')
        },
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
      joined: data.joined,
      birthday: data.birthday && data.birthday.slice(0,10),
      name: data.name
    }})
  }

  resetState = () => {
    this.setState(initialState)
  }

  resetSearchState = () => {
    this.setState(initialSearchState)
  }

  toggleProfile = () => {
    this.setState(() => ({isProfileOpen : !this.state.isProfileOpen}))
  }

  renderScreen = () => {
    switch(this.state.route) {
      case 'signin':
        return <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      case 'register':
        return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      case 'home':
        return ( 
          <div className="alsolute flex-column z-1">
            <Navigation onRouteChange={this.onRouteChange} resetState={this.resetState} user={this.state.user} isProfileOpen={this.state.isProfileOpen} toggleProfile={this.toggleProfile} onSubmit={this.onSubmit}/>    
            {this.state.isProfileOpen && <Profile user={this.state.user} isProfileOpen={this.state.isProfileOpen} toggleProfile={this.toggleProfile} loadUser={this.loadUser} />} 
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
        <Particles className='particles absolute z-0' params={particlesParams}/>
        {this.renderScreen()}
      </div>
    )
  }  
}

export default App