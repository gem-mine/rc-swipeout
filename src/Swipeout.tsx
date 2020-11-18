import React from 'react';
import ReactDOM from 'react-dom';
import Gesture from 'rc-gesture';
import classnames from 'classnames';
import SwipeoutPropType from './PropTypes';

// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
// http://caniuse.com/#search=match
function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    } else {
      el = el.parentElement;
    }
  }
  return null;
}

export default class Swipeout extends React.Component <SwipeoutPropType, any> {
  static defaultProps = {
    prefixCls: 'rc-swipeout',
    autoClose: false,
    disabled: false,
    left: [],
    right: [],
    onOpen() {},
    onClose() {},
  };

  static getDerivedStateFromProps (props, state) {
    // 当用户不设置open时 open为undefined
    if (props.open && !state.open) {
      state.open = !state.open;
    } else if (props.open === false && state.open) {
      state.open = !state.open;
    }
    return state;
  }

  openedLeft: boolean;
  openedRight: boolean;
  content: any;
  cover: any;
  left: any;
  right: any;
  btnsLeftWidth: number;
  btnsRightWidth: number;
  swiping: boolean;
  needShowLeft: boolean;
  needShowRight: boolean;

  constructor(props) {
    super(props);
    this.state = {
      swiping: false,
      open: null,
    };
    this.openedLeft = false;
    this.openedRight = false;
  }

  componentDidMount() {
    this.btnsLeftWidth = this.left ? this.left.offsetWidth : 0;
    this.btnsRightWidth = this.right ? this.right.offsetWidth : 0;
    this.renderOpenState();
    // todo Unable to preventDefault inside passive event listener due to target being treated as passive.
    // { passive: false } 会造成点击失败
    document.body.addEventListener('touchstart', this.onCloseSwipe, true);
  }

  componentWillUnmount() {
    document.body.removeEventListener('touchstart', this.onCloseSwipe, true);
  }

  componentDidUpdate() {
    this.renderOpenState();
  }

  onCloseSwipe = (ev) => {
    ev.preventDefault();
    const pNode = closest(ev.target, `.${this.props.prefixCls}-actions`);
    if (!pNode) {
      this.needAutoClose();
    }
  }

  needAutoClose = () => {
    const { isControlled } = this;
    if (!isControlled()) {
      this.close();
    }
  }

  onPanStart = (e) => {
    const { direction, moveStatus } = e;
    const { x: deltaX } = moveStatus;
    // http://hammerjs.github.io/api/#directions
    const isLeft = direction === 2;
    const isRight = direction === 4;

    if (!isLeft && !isRight) {
      return;
    }
    const { left, right } = this.props;
    this.needShowRight = isLeft && right!.length > 0;
    this.needShowLeft = isRight && left!.length > 0;
    if (this.left) {
      this.left.style.visibility = this.needShowRight ? 'hidden' : 'visible';
    }
    if (this.right) {
      this.right.style.visibility = this.needShowLeft ? 'hidden' : 'visible';
    }
    if (this.needShowLeft || this.needShowRight) {
      this.swiping = true;
      this.setState({
        swiping: this.swiping,
      });
      this._setStyle(deltaX);
    }
  }
  onPanMove = (e) => {
    const { moveStatus, srcEvent } = e;
    const { x: deltaX } = moveStatus;
    if (!this.swiping) {
     return;
    }

    // fixed scroll when it's pan and moving.
    if (srcEvent && srcEvent.preventDefault) {
      srcEvent.preventDefault();
    }
    this._setStyle(deltaX);
  }

  onPanEnd = (e) => {
    if (!this.swiping) {
      return;
    }

    const { moveStatus, direction } = e;
    const { x: deltaX } = moveStatus;
    const isLeft = direction === 2;
    const isRight = direction === 4;

    if (!isLeft && !isRight) {
      return;
    }
    // 当松开时拖动方向和onPadStart相反时, 也不应该打开左右任一菜单
    const { left, right } = this.props;
    let needShowRight = isLeft && right!.length > 0;
    let needShowLeft = isRight && left!.length > 0;
    needShowRight = this.needShowRight && this.needShowRight === needShowRight;
    needShowLeft = this.needShowLeft && this.needShowLeft === needShowLeft;
    const needOpenRight = needShowRight && Math.abs(deltaX) > this.btnsRightWidth / 2;
    const needOpenLeft = needShowLeft && Math.abs(deltaX) > this.btnsLeftWidth / 2;

    if (needOpenRight) {
      this.doOpenRight();
    } else if (needOpenLeft) {
      this.doOpenLeft();
    } else {
      this.close();
    }
    this.swiping = false;
    this.setState({
      swiping: this.swiping,
    });
    this.needShowLeft = false;
    this.needShowRight = false;
  }

  doOpenLeft = () => {
    this.open(this.btnsLeftWidth, true, false);
  }

  doOpenRight = () => {
    this.open(-this.btnsRightWidth, true, false);
  }
  // left & right button click
  onBtnClick(ev, btn) {
    const onPress = btn.onPress;
    if (onPress) {
      onPress(ev);
    }
    if (this.props.autoClose) {
      this.needAutoClose();
    }
  }

  _getContentEasing(value, limit) {
    // limit content style left when value > actions width
    const delta = Math.abs(value) - Math.abs(limit);
    const isOverflow = delta > 0;
    const factor = limit > 0 ? 1 : -1;
    if (isOverflow) {
      value = limit + Math.pow(delta, 0.85) * factor;
      return Math.abs(value) > Math.abs(limit) ? limit : value;
    }
    return value;
  }

  // set content & actions style
  _setStyle = (value) => {
    const limit = value > 0 ? this.btnsLeftWidth : -this.btnsRightWidth;
    const contentLeft = this._getContentEasing(value, limit);
    this.content.style.left = `${contentLeft}px`;
    if (this.cover) {
      this.cover.style.display = Math.abs(value) > 0 ? 'block' : 'none';
      this.cover.style.left = `${contentLeft}px`;
    }
  }

  open = (value, openedLeft, openedRight) => {
    if (!this.openedLeft && !this.openedRight && this.props.onOpen) {
      this.props.onOpen(true);
    }

    this.openedLeft = openedLeft;
    this.openedRight = openedRight;
    this._setStyle(value);
  }

  close = () => {
    if ((this.openedLeft || this.openedRight) && this.props.onClose) {
      this.props.onClose(false);
    }
    this._setStyle(0);
    this.openedLeft = false;
    this.openedRight = false;
  }

  renderButtons(buttons, ref) {
    const prefixCls = this.props.prefixCls;
    return (buttons && buttons.length) ? (
      <div
        className={`${prefixCls}-actions ${prefixCls}-actions-${ref}`}
        style={{ height: 'inherit' }}
        ref={(el) => this[ref] = el}
      >
        {
          buttons.map((btn, i) => (
            <div key={i}
              className={`${prefixCls}-btn ${btn.hasOwnProperty('className') ? btn.className : ''}`}
              style={btn.style}
              role="button"
              onClick={(e) => this.onBtnClick(e, btn)}
            >
              <div className={`${prefixCls}-btn-text`}>{btn.text || 'Click'}</div>
            </div>
          ))
        }
      </div>
    ) : null;
  }

  onTouchMove = (e) => {
    if (this.swiping) {
      e.preventDefault();
    }
  }

  isControlled = () => {
    return typeof(this.props.open) === 'boolean';
  }

  renderOpenState() {
    if (!this.isControlled()) {return; }
    const { open } = this.props;
    if (open === true) {
      this.doOpenRight();
    }
    if (open === false) {
      this.close();
    }
  }

  setRef = (el) => this.content = ReactDOM.findDOMNode(el);

  render() {
    const { prefixCls, left, right, children, disabled, ...restProps } = this.props;

    const { autoClose, onOpen, onClose, ...divProps } = restProps;

    const cls = classnames(prefixCls, {
      [`${prefixCls}-swiping`]: this.state.swiping,
    });

    if ((left!.length || right!.length) && !disabled && !this.isControlled()) {
      return (
        <div className={cls} {...divProps} >
        {/* 保证 body touchStart 后不触发 pan */}
        <div className={`${prefixCls}-cover`} ref={(el) => this.cover = el} />
        { this.renderButtons(left, 'left') }
        { this.renderButtons(right, 'right') }
        <Gesture
          onTouchMove={this.onTouchMove}
          onPanStart={this.onPanStart}
          onPanMove={this.onPanMove}
          onPanEnd={this.onPanEnd}
          onPanCancel={this.onPanEnd}
          onSwipeLeft={this.doOpenRight}
          onSwipeRight={this.doOpenLeft}
          direction="horizontal"
          ref = {this.setRef}
        >
          <div className={`${prefixCls}-content`}>{children}</div>
        </Gesture>
     </div>
      );
    }else {
      return (
        <div className={cls}  style={{ position: 'relative' }}>
        <div className={`${prefixCls}-cover`} ref={(el) => this.cover = el} />
         { this.renderButtons(left, 'left') }
         { this.renderButtons(right, 'right') }
         <div ref = {this.setRef} className={`${prefixCls}-content`}>
           <div>{children}</div>
         </div>
       </div>
      );
    }
  }
}
