import React, { Component } from 'react';
// import { Input } from 'antd-mobile';
import classNames from 'classnames';
import './index.less';

export interface ZetInputProps {
    /** 组件行行内样式 */
    style?: React.CSSProperties;
    /** 自定义类名 */
    className?: string;
    /** 资源组件的宽度 */
    width?: string | number;
    /** 可输入的最大长度 */
    maxLength: string | number;
    value?: string;
    defaultValue?; string;
    /** onChange 事件 */
    onChange: (value: string) => void;
  }
  
export interface ZetInputState {
/** value 值 */
value: string;
}