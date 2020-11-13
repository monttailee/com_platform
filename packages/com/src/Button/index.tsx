import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import classNames from 'classnames';
import './index.less';

export interface ButtonProps{
    prefixCls?: string;
    style?: React.CSSProperties;
    className?: string;
    size?: string;
    onClick?: () => void;
    children: React.ReactNode;
}
    
export default class RSButton extends Component<ButtonProps, any>{
    static defaultProps = {
        prefixCls: 'rsbtn',
        onClick: () => {},
    };

    render() {
        const {prefixCls, style, className, size, onClick, children} = this.props;
        const cls = classNames(prefixCls, className, {
            'btn-rsm': size === 'sm',
            'btn-rmd': size === 'md',
        });
        
        return (
            <Button style={style} className={cls} onClick={onClick}>{children}</Button>
        );
    }
}