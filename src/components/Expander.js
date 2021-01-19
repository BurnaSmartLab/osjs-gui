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
import { Element } from './Element';

/**
 * A status bar
 * @param {Object} props Properties
 * @param {boolean} [props.active] Active state
 * @param {Function} [props.onToggle] Toggle callback => (ev, active)
 * @param {BoxProperties} [props.box] Box Properties
 */
export const Expander = ({ children, ...props }) => {
  const [active, setActive] = React.useState(Boolean(props.active));

  const onToggle = ev => {
    if (props.onToggle) {
      props.onToggle(ev, !active);
    }

    setActive(!active);
  };

  return (
    <div className="osjs-gui osjs-gui-expander">
      <Element {...props.box} className={['osjs-gui-expander-wrapper']}>
        <div className="osjs-gui-expander-header" onClick={onToggle}>
          <div
            className="osjs-gui-expander-header-icon"
            data-active={String(state.active)}></div>
          <div className="osjs-gui-expander-header-label">{props.label}</div>
        </div>
        <div
          className="osjs-gui-expander-content"
          style={{
            display: state.active === false ? 'none' : undefined,
          }}>
          {children}
        </div>
      </Element>
    </div>
  );
};
