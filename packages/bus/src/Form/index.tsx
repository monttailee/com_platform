import React, { Component } from 'react';
import { Input, Button } from '@montai/com';
import classNames from 'classnames';

export interface FormProps{
  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
}
  
export default class Form extends Component<FormProps>{
  static defaultProps = {
    prefixCls: 'rsform',
  };

  render() {
    const {prefixCls, className, ...restProps} = this.props;
    const cls = classNames(prefixCls, className);

    return (
      <div>
        <Input className={cls}  {...restProps} />
        <Button>hello</Button>
      </div>
    );
  }
}