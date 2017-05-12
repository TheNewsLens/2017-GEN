'use strict';

import React, { Component, PropTypes } from 'react';
import {MAP_TYPE, meta, WIKI_TYPE} from '../data/meta';
import _ from 'underscore';
import GoogleMapMeta from './meta/GoogleMapMeta';
import WikiMeta from './meta/WikiMeta';
import {scroller} from 'react-scroll';

export default class VideoMeta extends Component {
  constructor(props){
    super(props);
    this.state = {meta: meta};
    this.onMouseEnter = (e) => this._onMouseEnter(e);
    this.onMouseLeave = (e) => this._onMouseLeave(e);
    this.seekTime = (time) => this._seekTime(time);
    this.scroll = (name) => this._scroll(name);
  }
  _onMouseEnter(e){
    const {changeVideoData} = this.props;
    changeVideoData({isPlaying: false});
  }
  _onMouseLeave(e){
    const {changeVideoData} = this.props;
    changeVideoData({isPlaying: true});
  }
  _seekTime(time){
    const {changeVideoData} = this.props;
    changeVideoData({seekPosition: time});
  }
  _scroll(name){
    console.log("scroll");
    scroller.scrollTo(name, {
      duration: 1500,
      delay: 100,
      smooth: true,
      containerId: 'video-meta-container',
    })
  }

  render(){
    const {meta} = this.state;
    const {position} = this.props;
    return (
      <div id="video-meta-container">
        {
          _.map(meta, (m, i)=>{
            // if(m.time.start < position && m.time.end > position) {
              switch (m.type) {
                case MAP_TYPE:
                  return (<GoogleMapMeta key={i} meta={m} index={i} position={position}
                                         seekTime={this.seekTime}
                                         scroll={this.scroll}
                                         onMouseEnter={this.onMouseEnter}
                                         onMouseLeave={this.onMouseLeave}/>);
                  break;
                case WIKI_TYPE:
                  return (<WikiMeta key={i} meta={m} index={i} position={position}
                                    seekTime={this.seekTime}
                                    scroll={this.scroll}
                                    onMouseEnter={this.onMouseEnter}
                                    onMouseLeave={this.onMouseLeave}/>);
                  break;
                default:
                  return (<div key={i}/>);
                  break;
              }
            // }
          })
        }
      </div>
    )
  }
}