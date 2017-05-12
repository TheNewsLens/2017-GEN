'use strict';
import React, { Component, PropTypes } from 'react';
import '../../scss/index.scss';
import VideoPlayer from './VideoPlayer';
import VideoMeta from './VideoMeta';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {position: 0, duration: 0, isPlaying: false, seekPosition: null};
    this.changeVideoData = (data) => this._changeVideoData(data);
  }
  _changeVideoData(data){
    this.setState(data);
  }

  componentDidMount(){
  }

  render(){
    const {position, isPlaying, seekPosition} = this.state;
    return (
      <div id="video-container">
        <VideoPlayer
          changeVideoData={this.changeVideoData}
          isPlaying={isPlaying}
          seekPosition={seekPosition} />
        <VideoMeta changeVideoData={this.changeVideoData} position={position}/>
      </div>
    )
  }
}