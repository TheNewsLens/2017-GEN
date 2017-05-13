'use strict';
import React, { Component, PropTypes } from 'react';
import '../../scss/index.scss';
import VideoPlayer from './VideoPlayer';
import VideoMeta from './VideoMeta';
import VideoLabel from './VideoLabel';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {position: 0, duration: 0, isPlaying: false, seekPosition: null, rect: null, showIndex: null};
    this.changeVideoData = (data) => this._changeVideoData(data);
  }
  _changeVideoData(data){
    this.setState(data);
  }

  componentDidMount(){
  }

  render(){
    const {position, isPlaying, seekPosition, rect, showIndex} = this.state;
    return (
      <div>
        <div className="bar">
          <div className="logo">
            <img src="/img/logo.png"/>
          </div>
          <div className="placeholder">
          </div>
          <div className="menu">
            <h5 className="active">NEWS</h5>
            <h5>LIVE BROADCAST</h5>
            <h5>FEATURED REPORT</h5>
          </div>
          <div className="hamburger">
            <img src="/img/hamburger.png" />
          </div>
        </div>
        <div id="video-container">
          <VideoPlayer
            changeVideoData={this.changeVideoData}
            isPlaying={isPlaying}
            seekPosition={seekPosition} />
          <VideoLabel changeVideoData={this.changeVideoData} position={position} rect={rect} isPlaying={isPlaying} showIndex={showIndex}/>
          <VideoMeta changeVideoData={this.changeVideoData} position={position} showIndex={showIndex}/>
        </div>
        <div className="video-info-container">
          <div className="video-info-box">
            <div className="video-title">【關鍵77秒 】俄羅斯爆炸案｜美聯航強拖乘客下機｜全球死刑執行大減</div>
            <div className="video-view">16,000 views</div>
            <div className="share">
              <img src="/img/share/share.png"/>
              <img src="/img/share/bookmark.png"/>
            </div>
          </div>
          <div className="video-vote-box">
            <div className="short-name">VOTE</div>
            <div className="vote-title">你是否支持死刑?</div>
            <div className="vote-bar"></div>
            <div className="vote-option">
              <img src="/img/vote/agree.png"/>
              <img src="/img/vote/not-agree.png"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}