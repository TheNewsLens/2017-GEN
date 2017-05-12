'use strict';

import React, { Component, PropTypes } from 'react';
import {GOOGLE_MAP_STYLE} from '../../data/googleMap';
import cx from 'classnames';
import moment from 'moment';

export default class GoogleMapMeta extends Component {
  constructor(props){
    super(props);
    this.state = {active: false};
    this.initMap = () => this._initMap();
    this.onClick = (e) => this._onClick(e);
    this.isNowActive = () => this._isNowActive();
    this.onMouseEnter = (e) => this._onMouseEnter(e);
    this.onMouseLeave = (e) => this._onMouseLeave(e);
  }
  componentDidMount(){
    this.initMap();
  }
  componentDidUpdate(){
    const {scroll, index} = this.props;
    const {active} = this.state;
    if(active !== this.isNowActive()){
      this.setState({active: this.isNowActive()});
      scroll("video-meta-"+index);
    }
  }
  _initMap(){
    const {meta, index} = this.props;
    const {value, title, zoom} = meta;
    // init google map
    let map = new google.maps.Map(document.getElementById("video-meta-"+index), {
      center: value,
      zoom: zoom,
      mapTypeControl: false,
      scrollwheel: false,
    });
    map.setOptions({styles: GOOGLE_MAP_STYLE});
    let marker = new google.maps.Marker({
      map: map,
      position: value,
      title: title,
    });
  }
  _onClick(e){
    const {seekTime, meta} = this.props;
    if(!this.isNowActive()){
      seekTime(meta.time.start);
    }
  }
  _onMouseEnter(e){
    const {onMouseEnter} = this.props;
    if(this.isNowActive()){
      onMouseEnter(e);
    }
  }
  _onMouseLeave(e){
    const {onMouseLeave} = this.props;
    if(this.isNowActive()){
      onMouseLeave(e);
    }
  }
  _isNowActive(){
    const {meta, position} = this.props;
    return meta.time.start < position && meta.time.end > position;
  }

  render(){
    const {index, meta, position} = this.props;
    const {top, left} = meta.position;
    const active = meta.time.start < position && meta.time.end > position;
    let time = new Date(null);
    time.setSeconds(meta.time.start);
    return (
      <div name={"video-meta-"+index} className={cx('video-meta',{'active': active})} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseMove={this.onMouseEnter}>
        <div className="video-label" style={{top,left}} onClick={this.onClick}>
          {/*<a href="http://google.com" target="_blank">*/}
            地圖
          {/*</a>*/}
        </div>
        <div id={"video-meta-time-"+index} className="video-meta-time">{time.toISOString().substr(14, 5)}</div>
        <div id={"video-meta-"+index} className="google-map" onClick={this.onClick}>
        </div>
      </div>
    )
  }
}
