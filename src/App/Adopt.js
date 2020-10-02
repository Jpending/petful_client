import React from 'react'
import PetCards from '../PetCards';
import petfulService from '../petfulService'
export default class About extends React.Component {
  constructor(props) {
    super();
    this.state={
      queue: [],
      inQueue: false,
      myName: '',
      recentlyAdopted: [],
      dogList: [],
      dogIndex: 0,
      catIndex: 0,
      catList: [],
      currDog: {},
      currCat: {},
      firstName: '',
      lastName: '',
      interval: null,
      currentCount: 0,
      hasDog: false,
      hasCat: false,
      left: false,
    }
  }

  componentDidMount=() => {
    petfulService.getCats()
      .then(cats => this.setState({catList: cats, currCat: cats[0], catIndex: cats.indexOf(cats[0])}))
    petfulService.getDogs()
      .then(dogs => this.setState({dogList: dogs, currDog: dogs[0], dogIndex: dogs.indexOf(dogs[0])}))
  }
  componentWillUnmount() {
    const {queue, myName}=this.state;
    const headOfLine=queue[0]
    if(headOfLine===myName) {clearInterval(this.state.interval)}
    clearInterval(this.state.interval);
  }
  putUsersInQueue=(users) => {
    users.forEach(user => {this.setState({queue: [...this.state.queue, user]})});

  }
  updateFirstName=(firstName) => {
    this.setState({firstName: firstName})
  }
  updateLastName=(lastName) => {
    this.setState({lastName: lastName})
  }
  addToQueue=() => {
    const {firstName, lastName, myName}=this.state;
    const nameString=`${firstName} ${lastName}`;
    let interval=setInterval(this.timer, 5000)
    this.setState({myName: nameString})
    console.log(myName)
    petfulService.postPerson(nameString)
      .then(() =>
        petfulService.getPeople()
          .then(this.putUsersInQueue)
          .then(() => this.setState({interval: interval}))
      );
  }
  timer=() => {
    this.handleQueueMove();
  }
  handleClickNextDog() {
    const {dogList, dogIndex}=this.state;
    this.setState({dogIndex: dogIndex+1})
    this.setState({currDog: dogList[dogIndex+1]})

  }
  handleClickPrevDog() {
    const {dogList, dogIndex}=this.state;
    this.setState({dogIndex: dogIndex-1})
    this.setState({currDog: dogList[dogIndex-1]})

  }
  handleClickNextCat() {
    const {catList, catIndex}=this.state;
    this.setState({catIndex: catIndex+1})
    this.setState({currCat: catList[catIndex+1]})

  }
  handleClickPrevCat() {
    const {catList, catIndex}=this.state;
    this.setState({catIndex: catIndex-1})
    this.setState({currCat: catList[catIndex-1]})
  }
  handleClickJoinQueue=() => {
    this.setState({inQueue: true});
    this.addToQueue();
  }
  handleQueueMove=() => {
    const {queue, myName, currentCount}=this.state;
    const headOfLine=queue[0];
    this.handleRandomAdopt();
    this.setState({queue: [...queue.slice(1), headOfLine], currentCount: currentCount+1},
      () => {

        if(this.state.queue[0]===myName) {
          clearInterval(this.state.interval);
        };
      })
  }

  handleRandomAdopt=() => {

    if(this.state.currentCount%2===0) {
      petfulService.adoptCat().then(() => {
        this.setState({
          recentlyAdopted: [...this.state.recentlyAdopted,
          this.state.catList[0]],
          catList: this.state.catList.slice(1)
        })
      })
    } else {
      petfulService.adoptDog().then(() => {
        this.setState({
          recentlyAdopted: [...this.state.recentlyAdopted,
          this.state.dogList[0]],
          dogList: this.state.dogList.slice(1)
        })
      })
    }

  }

  handleLeave=() => {
    this.setState({queue: this.state.queue.slice(1)});
    this.setState({inQueue: !this.state.inQueue})
    this.setState({left: true})
    petfulService.deletePerson().then(() =>
      this.setState({queue: this.state.queue.slice(1)})
    )
  }

  handleAdopt=(type) => {

    if(type==='dog') {
      petfulService.adoptDog().then(() => {
        this.setState({
          hasDog: true,
          recentlyAdopted: [...this.state.recentlyAdopted,
          this.state.dogList[0]],
          dogList: this.state.dogList.slice(1)
        })
      })
    }
    else {
      petfulService.adoptCat().then(() => {
        this.setState({
          hasCat: true,
          recentlyAdopted: [...this.state.recentlyAdopted,
          this.state.catList[0]],
          catList: this.state.catList.slice(1)
        })
      })
    };
  }


  render() {
    const {currCat, currDog, dogIndex, dogList, catList, catIndex}=this.state;
    return (
      <div>
        {this.state.inQueue&&
          <div className="queue flex items-evenly flex-col font-semibold text-lg tracking-tight">
            <h3 className="flex-1 px-2">Head of Queue: {this.state.queue[0]}</h3>
            <h3 className="flex-1 px-2">Next in Queue: {this.state.queue[1]}</h3>
            {this.state.queue[0]!==this.state.myName&&this.state.inQueue&&
              <h3 className="flex-1 px-2">Your Position: {this.state.queue.indexOf(this.state.myName)}</h3>}
          </div>}
        {this.state.queue[0]===this.state.myName&&<div className="queue flex items-evenly flex-initial font-semibold text-lg tracking-tight">
          <h3 className="flex-auto text-2xl text-bold px-2 text-green-500">Your turn!</h3>
        </div>}

        {this.state.recentlyAdopted.length>0&&<div className="queue flex items-evenly flex-initial font-semibold text-lg tracking-tight">
          <h3 className="flex-auto text-2xl text-bold px-2 text-green-500">{this.state.recentlyAdopted[this.state.recentlyAdopted.length-1].name} Was just adopted!</h3>
        </div>}
        {!this.state.inQueue&&this.state.left===false&&
          <div className="join-queue flex items-center flex-col w-full  flex-1" >
            <form className="bg-white shadow-md rounded w-full px-8 flex-1 pt-6 pb-8 mb-4">
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
        { (this.state.hasDog||this.state.hasCat)&&this.state.inQueue&&<div className="text-center mt-16"><button onClick={() => this.handleLeave()} className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 m-1 max-w-md w-full rounded focus:outline-none focus:shadow-outline" type="button">
          Leave Queue
</button></div>}
        <div className="pet-cards container py-24 px-10 flex-1 flex flex-col md:flex-row justify-around items-center">
          <div className="flex-1 max-w-sm rounded overflow-hidden shadow-lg my-6 sm:mx-10 sm:px-5 w-full">
            <PetCards {...currDog} notAvailable={this.state.recentlyAdopted.includes(currDog)} />
            <div className="sm:px-6 sm:pt-4 sm:pb-2 flex-1 flex flex-col sm:flex-row items-center justify-around ">
              {(dogIndex>0)&&<button onClick={() => this.handleClickPrevDog()} className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 m-1 w-full rounded focus:outline-none focus:shadow-outline" type="button">
                Prev
</button>}
              {this.state.queue[0]===this.state.myName&&dogList[0]===currDog&&!this.state.hasDog&&<button onClick={() => this.handleAdopt('dog')} className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 m-1 w-full rounded focus:outline-none focus:shadow-outline" type="button">
                Adopt
</button>}
              {dogIndex<dogList.length-1&&<button onClick={() => this.handleClickNextDog()} className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 m-1 w-full rounded focus:outline-none focus:shadow-outline" type="button">
                Next
</button>}
            </div>
          </div>
          <div className="flex-1 max-w-sm rounded overflow-hidden shadow-lg my-6 sm:mx-10 sm:px-5 w-full">
            <PetCards {...currCat} notAvailable={this.state.recentlyAdopted.includes(currCat)} />
            <div className="sm:px-6 sm:pt-4 sm:pb-2 flex-1 flex flex-col sm:flex-row items-center justify-around ">
              {catIndex>0&&<button onClick={() => this.handleClickPrevCat()} className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 m-1 w-full rounded focus:outline-none focus:shadow-outline" type="button">
                Prev</button>}
              {this.state.queue[0]===this.state.myName&&catList[0]===currCat&&!this.state.hasCat&&<button onClick={() => this.handleAdopt('cat')} className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 m-1 w-full rounded focus:outline-none focus:shadow-outline" type="button">
                Adopt</button>}
              {catIndex<catList.length-1&&<button onClick={() => this.handleClickNextCat()} className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 m-1 w-full rounded focus:outline-none focus:shadow-outline" type="button">
                Next</button>}
            </div>
          </div>
        </div>
      </div>)
  }
}
