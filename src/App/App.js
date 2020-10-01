import React, {useState, useEffect} from 'react'
import petfulService from '../petfulService'
export default class App extends React.Component {
  constructor(props) {
    super();
    this.state={
      queue: [],
      inQueue: false,
      myName: '',
      dogList: [],
      catList: [],
      currDog: {},
      currCat: {},
      firstName: '',
      lastName: '',
      interval: null,
      currentCount: 0,
    }
  }
  //.forEach(user => {this.setState({queue: [...this.state.queue, user.name]})})
  componentDidMount=() => {

    petfulService.getPeople()
      .then(this.putUsersInQueue)
    // .then(interval=setInterval(this.timer, 5000),
    //   this.setState({interval: interval}))
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  timer=() => {
    this.handleQueueMove();
  }

  putUsersInQueue=(users) => {
    users.forEach(user => {this.setState({queue: [...this.state.queue, user.name]})})
  }

  updateFirstName=(firstName) => {
    this.setState({firstName: firstName})
  }

  updateLastName=(lastName) => {
    this.setState({lastName: lastName})
  }

  addToQueue=() => {
    const {firstName, lastName}=this.state;
    const nameString=`${firstName} ${lastName}`;
    this.setState({myName: nameString})
    this.setState({queue: [...this.state.queue, nameString]})
  }

  handleClickJoinQueue=() => {

    this.setState({inQueue: !this.state.inQueue}, () => {this.addToQueue()});
    let interval=setInterval(this.timer, 5000);
    this.setState({interval: interval})
  }

  handleQueueMove=() => {
    const {queue, myName}=this.state;
    const headOfLine=queue[0]
    if(headOfLine===myName) {clearInterval(this.state.interval)}
    queue.shift();
    this.setState({queue: [...this.state.queue, headOfLine]})
  }

  render() {

    return (
      <div className="App font-mono h-screen">
        <header id="top" className="flex items-center w-screen justify-evenly flex-row flex-wrap bg-gradient-to-r from-blue-600 to-blue-600 via-blue-400 p-6 text-white mb-6">
          <nav className="flex flex-auto items-center justify-around flex-wrap p-6 w-full">
            <div className="flex justify-items-end">
              {/* <svg className="fill-current h-8 w-8 mr-2 flex-1" width="54" height="54" viewBox="0 0 24 24" stroke-width="3" stroke="lightgrey" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              </svg> */}
              <h1 className="flex-1 text-6xl tracking-wide font-custom w-full">Petful</h1>
              {/* <span className="flex-auto text-sm tracking-tight hidden sm:whitespace-normal  md:whitespace-normal lg:whitespace-no-wrap px-2 pt-1">FIFO Adoptions for fido and fluffy</span> */}
            </div>
            <div className="w-full flex-1 p-2 text-center md:text-right lg:mr-16 ">
              <div className="text-2xl md:text-3xl font-narrow tracking-wide flex-1">
                <a href="#responsive-header" className="flex-1 mt-4 mx-4 lg:mr-16 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                  Home
      </a>
                <a href="#adopt" className="flex-1 mt-4 mx-4 lg:mr-16 text-teal-200 hover:text-white mr-4">
                  Adopt
      </a>
                <a href="#responsive-header" className="flex-1 mt-4 mx-4 lg:mr-16 text-teal-200 hover:text-white mr-4">
                  About
      </a>
              </div>

            </div>
          </nav>

        </header>

        <main className='items-center container flex flex-col flex-wrap'>
          {/* queue component should probably just be in the main component as it will rely on state */}
          {this.state.inQueue&&<div className="queue flex items-evenly flex-initial font-semibold text-lg tracking-tight">
            <h3 className="flex-auto px-2">Head of Queue: {this.state.queue[0]}</h3>
            <h3 className="flex-auto px-2">Next in Queue: {this.state.queue[1]}</h3>
            {this.state.queue[0]===this.state.myName&&<h3 className="flex-auto px-2">Your turn!</h3>}
          </div>}
          {/* should add name with first inital only and last name to end of queue */}
          {!this.state.inQueue&&<div className="join-queue w-full max-w-xs flex-1" >
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstname">
                  First Name
      </label>
                <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" name="firstName" placeholder="First Name" onChange={e => this.updateFirstName(e.target.value)} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name
      </label>
                <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" name="lastName" type="text" placeholder="Last Name" onChange={e => this.updateLastName(e.target.value)} />
              </div>
              <div className="flex items-center justify-between">
                <button onClick={this.handleClickJoinQueue} className="flex-1 m-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Join Queue
      </button>

              </div>
            </form>
          </div>}
          {/* will display top of queue for both dogs and cats */}
          <div className="pet-cards container py-24 px-10 flex-1 flex flex-col md:flex-row justify-around items-center">
            <div className=" flex-1 max-w-sm rounded overflow-hidden shadow-lg my-6 sm:mx-10 sm:px-5 w-full">
              <img className="w-full" id="adopt" src="https://picsum.photos/500" alt="Sunset in the mountains" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Available Dog</div>
                <p className="text-gray-700 text-base" >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
              </div>
              <div className="sm:px-6 sm:pt-4 sm:pb-2 flex-1 flex flex-col sm:flex-row items-center justify-around ">
                <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 m-1 w-full rounded focus:outline-none focus:shadow-outline" type="button">
                  Prev
      </button>
                {this.state.queue[0]===this.state.myNam&&<button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 m-1 w-full rounded focus:outline-none focus:shadow-outline" type="button">
                  Adopt
      </button>}
                <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 m-1 w-full rounded focus:outline-none focus:shadow-outline" type="button">
                  Next
      </button>
              </div>
            </div>
            <div className="flex-1 max-w-sm rounded overflow-hidden shadow-lg my-6 sm:mx-10 sm:px-5 w-full">
              <img className="w-full" src="https://picsum.photos/400" alt="Sunset in the mountains" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Available Cat</div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
              </div>
              <div className="sm:px-6 sm:pt-4 sm:pb-2 flex-1 flex flex-col sm:flex-row items-center justify-around ">
                <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 m-1 w-full rounded focus:outline-none focus:shadow-outline" type="button">
                  Prev
      </button>
                {this.state.queue[0]===this.state.myName&&<button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 m-1 w-full rounded focus:outline-none focus:shadow-outline" type="button">
                  Adopt
      </button>}
                <button className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 m-1 w-full rounded focus:outline-none focus:shadow-outline" type="button">
                  Next
      </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="flex items-center h-48 flex-col md:flex-row w-screen pb-8 bg-gradient-to-r from-blue-600 to-blue-600 via-blue-400 p-6 text-white mt-6 ">
          <div className="w-full flex-1 pt-2 text-center">
            <div className="text-3xl font-narrow tracking-wide flex flex-1 flex-col sm:flex-row justify-items-around">
              <a href="#responsive-header" className="flex-1 sm:mx-12 md:mx-24 text-teal-200 hover:text-white">
                FAQ</a>
              <a href="#top" className="flex-1 sm:mx-8  text-teal-200 hover:text-white">
                Top</a>
              <a href="#responsive-header" className="flex-1 sm:mx-12 md:mx-24  text-teal-200 hover:text-white">
                Donate</a>
            </div>
          </div>
        </footer>

      </div>)
  }
}
