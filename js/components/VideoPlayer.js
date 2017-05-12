'use strict';

import React, { Component, PropTypes } from 'react';

export default class VideoPlayer extends Component {
  constructor(props){
    super(props);
    // this.state = {duration: 0, position: 0, viewable: 0};
    this.initVideo = () => this._initVideo();
    this.addVideoListener = () => this._addVideoListener();

  }
  componentDidMount(){
    this.initVideo();
  }

  _initVideo(){
    let playerInstance = jwplayer("video-player");
    playerInstance.setup({
      file:"/video/hate_life_mp4_h264_aac_hd_8.mp4",
      image:"/img/LOGO-01.jpg",
      "height": 380,
      "width": "100%",
      displaytitle: false,
      controls: true,
      primary: 'html5',
      mute: true,
      autostart: false,
    });
    this.addVideoListener();
  }

  _addVideoListener(){
    const {changeVideoData, isPlaying} = this.props;
    jwplayer().on('time', (data)=>{
      const {duration, position, viewable} = data;
      changeVideoData({duration, position, viewable});
    });
    jwplayer().on('play', (data)=>{
      changeVideoData({isPlaying: true});
    });
    jwplayer().on('pause complete', (data)=>{
      changeVideoData({isPlaying: false});
    });
  }

  componentDidUpdate(){
    const {isPlaying, seekPosition, changeVideoData} = this.props;
    switch (jwplayer().getState()){
      case 'playing':
        if(!isPlaying) jwplayer().pause();
        break;
      case 'paused':
        if(isPlaying) jwplayer().play();
        break;
    }
    // 跳轉影片
    if(seekPosition != null){
      jwplayer().seek(seekPosition);
      changeVideoData({seekPosition: null});
    }
    // console.log(jwplayer().getState());
  }

  render(){
    return (
      <div id="video-player">
      </div>
    )
  }
}