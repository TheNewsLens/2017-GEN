'use strict';

import React, { Component, PropTypes } from 'react';
import {GOOGLE_MAP_STYLE} from '../../data/googleMap';
import cx from 'classnames';

export default class GoogleMapMeta extends Component {
  constructor(props){
    super(props);
    this.initMap = () => this._initMap();
  }
  componentDidMount(){
    this.initMap();
  }
  _initMap(){
    const {meta, index} = this.props;
    const {value, title} = meta;
    // init google map
    let map = new google.maps.Map(document.getElementById("video-meta-"+index), {
      center: value,
      zoom: 15,
      mapTypeControl: false
    });
    map.setOptions({styles: GOOGLE_MAP_STYLE});
    let marker = new google.maps.Marker({
      map: map,
      position: value,
      title: title,
    });
  }

  render(){
    const {index, meta, onMouseEnter, onMouseLeave, position} = this.props;
    const {top, left} = meta.position;
    const active = meta.time.start < position && meta.time.end > position;
    return (
      <div className={cx({'active': active})} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
        <div className="video-label" style={{top,left}}>
          {/*<a href="http://google.com" target="_blank">*/}
            地圖
          {/*</a>*/}
        </div>
        <div id={"video-meta-"+index} className="video-meta google-map">
        </div>
      </div>
    )
  }
}
