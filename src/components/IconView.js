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
import { doubleTap } from '../utils';
import { Element } from './Element';
import { Icon } from './Icon';

const tapper = doubleTap();

export const IconViewEntry = ({ entry, index, ...props }) => {
  const elementRef = React.useRef();

  const icon = entry.icon || { name: 'application-x-executable' };
  const selected = props.selectedIndex === index;

  React.useEffect(() => {
    props.onCreate({ data: entry.data, index, el: elementRef.current });
  }, []);

  return (
    <div
      ref={elementRef}
      className={'osjs-gui-icon-view-entry' + (selected ? ' osjs__active' : '')}
      onTouchStart={ev =>
        tapper(ev, () => props.onactivate({ data: entry.data, index, ev }))
      }
      onDoubleClick={ev => props.onactivate({ data: entry.data, index, ev })}
      onClick={ev => props.onselect({ data: entry.data, index, ev })}
      onContextMenu={ev =>
        props.oncontextmenu({ data: entry.data, index, ev })
      }>
      <div className="osjs__container">
        <div className="osjs__image">
          <Icon {...icon} />
        </div>
        <div className="osjs__label">
          <span>{entry.label}</span>
        </div>
      </div>
    </div>
  );
};

const defaultHandler = () => {};

const defaultProps = {
  selectedIndex: -1,
  scrollTop: 0,
  entries: [],
  onSelect: defaultHandler,
  onActivate: defaultHandler,
  onContextMenu: defaultHandler,
  onCreate: defaultHandler,
};

export const IconView = props => {
  const elementRef = React.useRef();

  const newProps = { ...defaultProps, ...props };

  React.useEffect(() => {
    elementRef.current.scrollTop = newProps.scrollTop;
  }, []);

  React.useEffect(() => {
    if (newProps.selectedIndex < 0) {
      elementRef.current.scrollTop = newProps.scrollTop;
    }
  });

  return (
    <Element className="osjs-gui-icon-view" {...newProps.box}>
      <div ref={elementRef} className="osjs-gui-icon-view-wrapper">
        {newProps.entries.map((entry, index) => (
          <IconViewEntry entry={entry} index={index} {...newProps} />
        ))}
      </div>
    </Element>
  );
};
