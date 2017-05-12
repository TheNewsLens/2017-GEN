'use strict';

import React, { Component, PropTypes } from 'react';
import {MAP_TYPE, meta} from '../data/meta';
import _ from 'underscore';
import GoogleMapMeta from './meta/GoogleMapMeta';

export default class VideoMeta extends Component {
  constructor(props){
    super(props);
    this.state = {meta: meta};
    this.onMouseEnter = (e) => this._onMouseEnter(e);
    this.onMouseLeave = (e) => this._onMouseLeave(e);
  }
  _onMouseEnter(e){
    const {changeVideoData} = this.props;
    setTimeout(changeVideoData({isPlaying: false}), 1000);
  }
  _onMouseLeave(e){
    const {changeVideoData} = this.props;
    setTimeout(changeVideoData({isPlaying: true}), 1000);
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