'use strict';

import React, { Component, PropTypes } from 'react';
import {ARTICLE_TYPE, INFOGRAPHIC_TYPE, MAP_TYPE, meta, WIKI_TYPE} from '../data/meta';
import _ from 'underscore';
import cx from 'classnames';

export default class VideoLabel extends Component {
  constructor(props){
    super(props);
    this.seekTime = (time) => this._seekTime(time);
    this.changeShow = (index) => this._changeShow(index);
  }
  _seekTime(time){
    const {changeVideoData} = this.props;
    changeVideoData({seekPosition: time});
  }
  _changeShow(index){
    const {changeVideoData, isPlaying, showIndex} = this.props;
    if(showIndex == index){
      changeVideoData({isPlaying: !isPlaying, showIndex: null});
    }else{
      changeVideoData({isPlaying: !isPlaying, showIndex: index});
    }
  }
  render(){
    const {position, rect} = this.props;
    // const video_rect = document.querySelector("#video-player").getBoundingClientRect();
    return (
      <div className="video-label-container">
        {
          _.map(meta, (m, i)=>{
            let active = m.time.start < position && m.time.end > position;
            let top = m.position.top, left = m.position.left;
            if(rect != null){
              top = rect.top + (m.position.top * rect.height);
              left = rect.left + (m.position.left * rect.width);
            }
            switch (m.type){
              case ARTICLE_TYPE:
                return (
                  <div key={i} className={cx('video-label', {'active': active})} style={{top, left}} onClick={()=>this.changeShow(i)}>
                    <img src="/img/video/article.png" />
                  </div>
                );
                break;
              case WIKI_TYPE:
                return (
                  <div key={i} className={cx('video-label', {'active': active})} style={{top, left}} onClick={()=>this.changeShow(i)}>
                    <img src="/img/video/wiki.png" />
                  </div>
                );
                break;
              case MAP_TYPE:
                return (
                  <div key={i} className={cx('video-label', {'active': active})} style={{top, left}} onClick={()=>this.changeShow(i)}>
                    <img src="/img/video/map.png" />
                  </div>
                );
                break;
              case INFOGRAPHIC_TYPE:
                return (
                  <div key={i} className={cx('video-label', {'active': active})} style={{top, left}} onClick={()=>this.changeShow(i)}>
                    <img src="/img/video/infographic.png" />
                  </div>
                );
                break;
            }
          })
        }
      </div>
    );
  }
}