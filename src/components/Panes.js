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

const onMouseDown = (ev, setSize, orientation) => {
  const { target, clientX, clientY } = ev;
  const pane = target.previousSibling;
  const { offsetWidth, offsetHeight } = pane;
  const index = Array.from(target.parentNode.children).indexOf(pane);
  const maxWidth = pane.parentNode.offsetWidth * 0.8;
  const maxHeight = pane.parentNode.offsetHeight * 0.8;

  if (index < 0) {
    return;
  }

  const mouseMove = ev => {
    ev.preventDefault();

    let size = orientation === 'vertical' ? offsetWidth : offsetHeight;

    if (orientation === 'vertical') {
      const diffX = ev.clientX - clientX;
      size = Math.min(maxWidth, size + diffX);
    } else {
      const diffY = ev.clientY - clientY;
      size = Math.min(maxHeight, size + diffY);
    }

    setSize({ index, size });
  };

  const mouseUp = ev => {
    ev.preventDefault();
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  };

  ev.preventDefault();
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);
};

const panes = (sizes, setSize, children, orientation) => {
  const spacersCount = Math.ceil(children.length / 2);

  const spacer = (
    <div
      className="osjs-gui-panes-spacer"
      onMouseDown={ev => onMouseDown(ev, setSize, orientation)}
    />
  );

  return React.Children.map(children, (child, i) => (
    <>
      <div
        className="osjs-gui-panes-pane"
        style={{
          flex: sizes[i] ? `0 0 ${sizes[i]}px` : undefined,
        }}>
        {child}
      </div>
      {i <= spacersCount ? spacer : null}
    </>
  ));
};

/**
 * Resizable panes
 * @param {Object} props Properties
 * @param {string} [props.orientation='vertical'] Pane orientation
 * @param {number[]} [props.sizes] Pane sizes
 */
export const Panes = ({ children, ...props }) => {
  const [sizes, setSizes] = React.useState(props.sizes || [150]);

  const setSize = ({ index, size }) =>
    setSizes(sizes.map((s, i) => (index === i ? size : s)));

  const orientation = props.orientation || 'vertical';

  return (
    <div className="osjs-gui-panes">
      <Element orientation={orientation} className="osjs-gui-panes-inner">
        {panes(sizes, setSize, children, orientation)}
      </Element>
    </div>
  );
};
