'use strict';

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import moment from 'moment';

export default class ArticleMeta extends Component {
  constructor(props){
    super(props);
    this.state = {active: false, show: false};
    this.initWiki = () => this._initWiki();
    this.onClick = (e) => this._onClick(e);
    this.isNowActive = () => this._isNowActive();
    this.onMouseEnter = (e) => this._onMouseEnter(e);
    this.onMouseLeave = (e) => this._onMouseLeave(e);
    this.toggle = (e) => this._toggle(e);
  }
  componentDidMount(){
    this.initWiki();
  }

  componentDidUpdate(){
    const {scroll, index, showIndex} = this.props;
    const {active, show} = this.state;
    if(active !== this.isNowActive()){
      this.setState({active: this.isNowActive()});
      scroll("video-meta-box-"+index);
    }
    if(showIndex == index){
      if(!show){
        this.setState({show: true});
      }
    }
    if(showIndex == null){
      if(show) {
        this.setState({show: false});
      }
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
    const {show, active} = this.state;
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
      changeShowIndex(index);
    }
  }
  render(){
    const {show} = this.state;
    const {index, meta, position} = this.props;
    const {top, left} = meta.position;
    const {link, title, text, longText} = meta.value;
    const active = meta.time.start < position && meta.time.end > position;
    let time = new Date(null);
    time.setSeconds(meta.time.start);
    return (
      <div id={"video-meta-box-"+index} className={cx('video-meta-box','article',{'active': active, 'show': show})} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onMouseMove={this.onMouseEnter}>
        <div className="video-label" style={{top,left}} onClick={this.onClick}>
          {/*<a href="http://google.com" target="_blank">*/}
          {/*Article*/}
          {/*</a>*/}
        </div>
        <div className="video-type" onClick={this.onClick}>
          <div id={"video-meta-time-"+index} className="video-meta-time">{time.toISOString().substr(14, 5)}</div>
          <div className="img" style={{backgroundImage: "url('/img/meta/article.png')"}}/>
        </div>
        <div id={"video-meta-"+index} className="video-meta article" onClick={this.toggle}>
          {/*<div className="wiki-logo"><img src="/img/wiki_logo.png"/></div>*/}
          <a className="link">{show ? 'HIDE' : 'SHOW MORE'}</a>
          <div className="title">{title}</div>
          <div className="text">{text}</div>
          <a className="hide-link" target="_blank" href={link} onClick={(e)=>{e.stopPropagation()}}>LINK</a>
        </div>
      </div>
    )
  }
}
