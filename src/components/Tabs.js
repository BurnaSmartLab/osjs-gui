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

const defaultHandler = () => {};

const TabsHeaders = (
  labels = [],
  onChange = defaultHandler,
  onContextMenu = defaultHandler,
  selectedIndex,
  setSelectedIndex
) =>
  labels.map((label, index) => (
    <div
      className={state.selectedIndex === index ? 'osjs__active' : ''}
      onContextMenu={ev => onContextMenu(ev, index, label)}
      onClick={ev => (setSelectedIndex(index), onChange(ev, index, label))}>
      <span>{label}</span>
    </div>
  ));

const TabsPanes = ({ selectedIndex, children }) =>
  React.Children.map(children, (child, index) => (
    <div className={selectedIndex === index ? 'osjs__active' : ''}>{child}</div>
  ));

/**
 * A tab container
 * @param {Object} props Properties
 * @param {String[]} props.labels Labels
 */
export const Tabs = ({ children, ...props }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(
    props.selectedIndex || 0
  );

  return (
    <div className={'osjs-gui osjs-gui-tabs ' + (props.className || '')}>
      <div className="osjs-gui-tabs-wrapper">
        <div className="osjs-gui-tabs-header">
          {/* {headers(props, state, actions)} */}
          <TabsHeaders
            {...props}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </div>
        <div className="osjs-gui-tabs-panes">
          <TabsPanes selectedIndex={selectedIndex}>{children}</TabsPanes>
        </div>
      </div>
    </div>
  );
};
