import React, { Component } from 'react';
import logo from './logo.svg';
import moment from 'moment';
import './App.css';
import Header from './components/Header';
import SetTimer from './components/SetTimer';
import Timer from './components/Timer';
import Controls from './components/Controls';


class App extends Component {

  state = {
      breakValue : 5,
      sessionValue: .1,
      mode: 'session',
      time: 25 * 60 * 1000,
      active: false,
      touched: false
  }

  componentDidUpdate(prevProps, prevState) {
      if(prevState.time === 0 && prevState.mode === 'session'){
        this.setState({time: this.state.sessionValue * 60 * 1000, mode: 'break'});
        this.audio.play();
      }

      if(prevState.time === 0 && prevState.mode === 'break'){
          this.setState({time: this.state.sessionValue * 60 * 1000, mode: 'session'});
      }
  }

  handleSetTimers = (inc, type) => {
    if(this.state[type] === 60 && inc) return;
    if(this.state[type] === 1 && !inc) return;
    this.setState({ [type]: this.state[type] + (inc ? 1 : -1)  })
  }

  handleReset = () => {
    this.setState({
      breakValue: 5,
      sessionValue: 25,
      time: 25 * 60 * 1000,
      touched: false,
      active: false
    });

    clearInterval(this.pomodoro);
    this.audio.currentTime = 0;


  }

  handlePlayPause = () => {
    if(this.state.active){
        clearInterval(this.pomodoro);
        this.setState({active: false});
    } else {
      if(this.state.touched){
        this.pomodoro = setInterval(() => this.setState({time: this.state.time - 1000}), 1000);
        this.setState({active: true})
      } else {
        this.setState({time: this.state.sessionValue * 60 * 1000, touched: true, active: true}, () => {
          this.pomodoro = setInterval(() => this.setState({time: this.state.time - 1000}), 1000);
        });
      }
      
    }
    
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <div className='settings'>
          <SetTimer type='break' value={this.state.breakValue} handleClick={this.handleSetTimers}/>
          <SetTimer type='session' value={this.state.sessionValue} handleClick={this.handleSetTimers}/>
        </div>
        <Timer mode={this.state.mode} time={moment(this.state.time).format('mm:ss')}/>
        <Controls active={this.state.active} handlePlayPause={this.handlePlayPause} handleReset={this.handleReset} handlePlayPause={this.handlePlayPause}/>
        <audio id="beep" src='https://s3-us-west-1.amazonaws.com/benjaminadk/Data+synth+beep+high+and+sweet.mp3' ref={ref => this.audio = ref}></audio>
      </div>
    );
  }
}

export default App;
