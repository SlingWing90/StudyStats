import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'



import Header from './Header'
import Home from './Home'
import Setting from './Setting'


class App extends Component {
    constructor(props){
        super(props);
    }
    
    
    render () {
        return (
          <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/setting' component={Setting} />
            </Switch>

          </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))