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

import { Element } from './Element';

/**
 * A menubar item
 * @param {Object} props Properties
 */
export const MenubarItem = ({ children, ...props }) => {
  const { onClick, data } = props;

  return (
    <div
      onClick={ev => {
        if (typeof onClick === 'function') {
          const parentNode = ev.target.parentNode;
          const index = Array.prototype.indexOf.call(
            parentNode.children,
            ev.target
          );

          onClick(ev, data || {}, index);
        }
      }}>
      <span>{children}</span>
    </div>
  );
};

/**
 * A menubar container
 * @param {BoxProperties} [props] Box Properties
 * @param {MenubarItem[]} [props.items] Array of object
 */
export const Menubar = ({ children, ...props }) => (
  <Element {...props} class={['osjs-gui-menubar', props.className]}>
    {(props.items || []).map(item => (
      <MenubarItem onClick={item.onClick || props.onClick} data={item.data}>
        {item.label}
      </MenubarItem>
    ))}
    {children}
  </Element>
);
