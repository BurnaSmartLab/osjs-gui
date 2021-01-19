/*
 * OS.js - JavaScript Cloud/Web Desktop Platform
 *
 * Copyright (c) 2011-2020, Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @author  Anders Evenrud <andersevenrud@gmail.com>
 * @licence Simplified BSD License
 */

import React from 'react';
import { Icon } from './Icon';

const MenuList = ({ level = 0, children, ...props }) => {
  const label = child => {
    const children = [];

    if (child.type === 'checkbox' || typeof child.checked === 'boolean') {
      children.push(
        <span
          className={
            'osjs-gui-menu-checkbox' + (child.checked ? ' active' : '')
          }
        />
      );
    } else if (child.icon) {
      children.push(<Icon {...child.icon} />);
    }

    children.push(<span>{child.label}</span>);

    return children;
  };

  const inner = (props, child) => {
    if (typeof child.element === 'function') {
      return child.element();
    }

    const className =
      child.type === 'separator'
        ? 'osjs-gui-menu-separator'
        : 'osjs-gui-menu-label ' + (child.disabled ? 'osjs__disabled' : '');

    return (
      <span className={className}>
        {label(child)}
        {child.items ? (
          <MenuList {...props} level={level + 1}>
            {child.items}
          </MenuList>
        ) : null}
      </span>
    );
  };

  return (
    <ul>
      {React.Children.map(children, child => (
        <li className="osjs-gui-menu-entry">
          <div
            className="osjs-gui-menu-container"
            data-has-image={child.icon ? true : undefined}
            data-has-children={child.items ? true : undefined}
            onMouseOver={child.items ? props.onShow : undefined}
            onTouchEnd={child.items ? props.onShow : undefined}
            onClick={ev => {
              if (child.items) {
                return;
              }

              if (child.onClick) {
                child.onClick(child, ev);
              }

              if (props.onClick) {
                props.onClick(child, ev, child);
              }
            }}>
            {inner(props, child)}
          </div>
        </li>
      ))}
    </ul>
  );
};

/**
 * Menu tree
 * @property {String} label Label
 * @property {String} [icon] Icon source
 * @property {Boolean} [disabled] Disabled state
 * @property {Boolean} [closeable] Disable close on click
 * @property {Function} [element] A callback that returns a virtual DOM element
 * @property {Function} onClick Click callback
 * @property {MenuItems} [items] Child items
 * @typedef MenuItems
 */

/**
 * A menu
 * @param {Object} props Properties
 * @param {Boolean} [props.visible=true] Visible property
 * @param {Object} [posprops.position] Position
 * @param {MenuItems} [props.menu] Menu items
 */
export const Menu = props => (
  <div
    id="osjs-context-menu"
    className="osjs-gui osjs-gui-menu"
    onCreate={props.onCreate}
    onUpdate={props.onUpdate}
    style={{
      display: props.visible !== false ? 'block' : 'none',
      top: props.position ? props.position.top + 'px' : 0,
      left: props.position ? props.position.left + 'px' : 0,
    }}>
    <MenuList {...props}>{props.menu}</MenuList>
  </div>
);
