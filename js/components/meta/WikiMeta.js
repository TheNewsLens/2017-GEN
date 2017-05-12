'use strict';

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import moment from 'moment';

export default class WikiMeta extends Component {
  constructor(props){
    super(props);
    this.state = {active: false};
    this.initWiki = () => this._initWiki();
    this.onClick = (e) => this._onClick(e);
    this.isNowActive = () => this._isNowActive();
    this.onMouseEnter = (e) => this._onMouseEnter(e);
    this.onMouseLeave = (e) => this._onMouseLeave(e);
  }
  componentDidMount(){
    this.initWiki();
  }

  componentDidUpdate(){
    const {scroll, index} = this.props;
    const {active} = this.state;
    if(active !== this.isNowActive()){
      this.setState({active: this.isNowActive()});
      scroll("video-meta-"+index);
    }
  }
  _initWiki(){
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
    const {link, title, text} = meta.value;
    const active = meta.time.start < position && meta.time.end > position;
    let time = new Date(null);
    time.setSeconds(meta.time.start);
    return (
      <div className={cx('video-meta', {'active': active})} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseMove={this.onMouseEnter}>
        <div className="video-label" style={{top,left}} onClick={this.onClick}>
          {/*<a href="http://google.com" target="_blank">*/}
          Wiki
          {/*</a>*/}
        </div>
        <div id={"video-meta-time-"+index} className="video-meta-time">{time.toISOString().substr(14, 5)}</div>
        <div id={"video-meta-"+index} className="wiki" onClick={this.onClick}>
          <div className="wiki-logo"><img src="/img/wiki_logo.png"/></div>
          <div className="title">{title}</div>
          <a className="link" href={link} target="_blank">More</a>
          <div className="text">{text}</div>
        </div>
      </div>
    )
  }
}
