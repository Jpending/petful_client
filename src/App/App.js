import React from 'react'
import {Link, Route, Switch} from 'react-router-dom';
import Adopt from './Adopt'
import petfulService from '../petfulService'
import About from './About';
import Nav from './Nav';
import FAQ from './FAQ';
export default class App extends React.Component {
  constructor(props) {
    super();

  }



  renderRoutes=() => {
    return (
      <Switch>
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/about" component={About} />
        <Route exact path="/adopt" component={Adopt} />
        <Route exact path="/" component={About} />
      </Switch>
    )
  }


  render() {

    return (
      <div className="App font-mono h-screen">
        <header id="top" className="flex items-center w-screen justify-evenly flex-row flex-wrap bg-gradient-to-r from-blue-600 to-blue-600 via-blue-400 p-6 text-white mb-6">
          <Nav />
        </header>
        <main className='items-center container flex flex-col flex-wrap'>
          {this.renderRoutes()}
        </main>
        <footer className="flex items-center h-48 flex-col md:flex-row w-screen pb-8 bg-gradient-to-r from-blue-600 to-blue-600 via-blue-400 p-6 text-white mt-6 ">
          <div className="w-full flex-1 pt-2 text-center">
            <div className="text-3xl font-narrow tracking-wide flex flex-1 flex-col sm:flex-row justify-items-around">
              <Link to="/faq"><div className="flex-1 sm:mx-12 md:mx-24 text-teal-200 hover:text-white">
                FAQ</div></Link>
              <a href="#top" className="flex-1 sm:mx-8  text-teal-200 hover:text-white">
                Top</a>
              <a target='blank' href="https://secure.humanesociety.org/site/Donation2;jsessionid=00000000.app325b?idb=1276949979&df_id=23356&mfc_pref=T&23356.donation=form1&NONCE_TOKEN=F37E65F634EF6A3DC2D70D0F9C71F9DC&s_src=web_topnav_donate&23356_donation=form1" className="flex-1 sm:mx-12 md:mx-24  text-teal-200 hover:text-white">
                Donate</a>
            </div>
          </div>
        </footer>

      </div>)
  }
}
