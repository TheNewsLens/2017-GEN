'use strict';

import React, { Component, PropTypes } from 'react';
import {GOOGLE_MAP_STYLE} from '../../data/googleMap';
import cx from 'classnames';
import moment from 'moment';

export default class GoogleMapMeta extends Component {
  constructor(props){
    super(props);
    this.state = {active: false, show: false, map: null};
    this.initMap = () => this._initMap();
    this.onClick = (e) => this._onClick(e);
    this.isNowActive = () => this._isNowActive();
    this.onMouseEnter = (e) => this._onMouseEnter(e);
    this.onMouseLeave = (e) => this._onMouseLeave(e);
    this.toggle = (e) => this._toggle(e);
  }
  componentDidMount(){
    this.initMap();
  }
  componentDidUpdate(){
    const {scroll, index, showIndex} = this.props;
    const {active, show, map} = this.state;
    if(active !== this.isNowActive()){
      this.setState({active: this.isNowActive()});
      scroll("video-meta-box-"+index);
    }
    if(showIndex == index){
      if(!show){
        this.setState({show: true});
        map.setOptions({zoomControl: true});
      }
    }
    if(showIndex == null){
      if(show) {
        this.setState({show: false});
      }
    }
  }
  _initMap(){
    const {meta, index} = this.props;
    const {value, title, zoom} = meta;
    // init google map
    let map = new google.maps.Map(document.getElementById("video-map-"+index), {
      center: value,
      zoom: zoom,
      mapTypeControl: false,
      scrollwheel: false
    });
    // map.setOptions({styles: GOOGLE_MAP_STYLE});
    let marker = new google.maps.Marker({
      map: map,
      position: value,
      title: title,
    });
    this.setState({map: map});
  }
  _onClick(e){
    const {seekTime, meta} = this.props;
    if(!this.isNowActive()){
      seekTime(meta.time.start);
    }
  }
  _onMouseEnter(e){
    // const {onMouseEnter} = this.props;
    if(this.isNowActive()){
      // onMouseEnter(e);
    }
  }
  _onMouseLeave(e){
    // const {onMouseLeave} = this.props;
    if(this.isNowActive()){
      // onMouseLeave(e);
    }
  }
  _isNowActive(){
    const {meta, position} = this.props;
    return meta.time.start < position && meta.time.end > position;
  }
  _toggle(e){
    const {show, active, map} = this.state;
    if(show){
      if(e.target.tagName != 'A') return false;
    }
    this.setState({show: !show});
    const {index, startPlaying, stopPlaying, changeShowIndex} = this.props;
    if(show){
      if(active){
        startPlaying();
      }
      changeShowIndex(null);
    }else{
      stopPlaying();
      map.setOptions({zoomControl: true});
      changeShowIndex(index);
    }
  }
  render(){
    const {show} = this.state;
    const {index, meta, position} = this.props;
    const {title} = meta;
    const {top, left} = meta.position;
    const active = meta.time.start < position && meta.time.end > position;
    let time = new Date(null);
    time.setSeconds(meta.time.start);
    return (
      <div id={"video-meta-box-"+index} className={cx('video-meta-box','map',{'active': active, 'show': show})} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseMove={this.onMouseEnter}>
        {/*<div className="video-label" style={{top,left}} onClick={this.onClick}>*/}
          {/*/!*<a href="http://google.com" target="_blank">*!/*/}
            {/*/!*地圖*!/*/}
          {/*/!*</a>*!/*/}
        {/*</div>*/}
        <div className="video-type google-map" onClick={this.onClick}>
          <div id={"video-meta-time-"+index} className="video-meta-time">{time.toISOString().substr(14, 5)}</div>
          <div className="img" style={{backgroundImage: "url('/img/meta/map.png')"}}/>
        </div>
        <div id={"video-meta-"+index} className="video-meta map" onClick={this.toggle}>
          <div className="title">{title}</div>
          <a className="link" target="_blank">{show ? 'HIDE' : 'SHOW MORE'}</a>
          <div className="filter"></div>
          <div id={"video-map-"+index} className="google-map">

          </div>
        </div>
      </div>
    )
  }
}
