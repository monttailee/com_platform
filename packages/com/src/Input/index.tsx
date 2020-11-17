import React, { Component } from 'react';
import { InputItem } from 'antd-mobile';
import classNames from 'classnames';
import './index.scss';

export interface InputProps{
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value?: string) => void;
}
export interface InputState {
  value?: string;
  placeholder?: string;
}
  
export default class Input extends Component<InputProps, InputState>{
  constructor(props: InputProps) {
    super(props);
    this.state = {
      value: props.defaultValue || props.value || '',
      placeholder: props.placeholder,
    };
  }

  static defaultProps = {
    prefixCls: 'rsipt',
    placeholder: '',
    onChange: () => null
  };

  render() {
    const {prefixCls, className, ...restProps} = this.props;
    const {value, placeholder} = this.state;
    const cls = classNames(prefixCls, className);

    return (
      <InputItem className={cls} value={value} placeholder={placeholder} {...restProps} />
    );
  }
}