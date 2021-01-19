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

const ListViewCol = ({ row, rowIndex, paneIndex, ...props }) => {
  const elementRef = React.useRef();

  React.useEffect(() => {
    props.onCreate({ data: row.data, index: rowIndex, el: elementRef.current });
  }, []);

  const col = row.columns[paneIndex] || {};
  const selected = props.selectedIndex === rowIndex;
  const colIcon = col.icon ? <Icon {...col.icon} /> : null;

  return (
    <div
      ref={elementRef}
      key={row.key}
      data-has-icon={col.icon ? true : undefined}
      className={'osjs-gui-list-view-cell' + (selected ? ' osjs__active' : '')}
      onTouchStart={ev =>
        tapper(ev, () =>
          props.onActivate({ data: row.data, index: rowIndex, ev })
        )
      }
      onDoubleClick={ev =>
        props.onActivate({ data: row.data, index: rowIndex, ev })
      }
      onClick={ev => props.onSelect({ data: row.data, index: rowIndex, ev })}
      onContextMenu={ev =>
        props.onContextMenu({ data: row.data, index: rowIndex, ev })
      }>
      {colIcon ? colIcon : null}
      <span>{typeof col === 'object' ? col.label : col}</span>
    </div>
  );
};

const ListViewPane = ({ column, index, ...props }) => (
  <div className="osjs-gui-list-view-pane" style={col.style}>
    <div
      className="osjs-gui-list-view-header"
      style={{
        display: props.hideColumns ? 'none' : undefined,
      }}>
      <span>{typeof column === 'object' ? column.label : column}</span>
    </div>
    <div className="rows" data-zebra={props.zebra}>
      {props.rows.map((row, rowIndex) => (
        <ListViewCol
          row={row}
          rowIndex={rowIndex}
          paneIndex={index}
          {...props}
        />
      ))}
    </div>
  </div>
);

const defaultHandler = () => {};

const defaultProps = {
  selectedIndex: -1,
  scrollTop: 0,
  zebra: true,
  columns: [],
  rows: [],
  onSelect: defaultHandler,
  onActivate: defaultHandler,
  onContextMenu: defaultHandler,
  onCreate: defaultHandler,
};

export const ListView = props => {
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
    <Element className="osjs-gui-list-view" {...newProps.box}>
      <div ref={elementRef} className="osjs-gui-list-view-wrapper">
        {newProps.columns.map((c, i) => (
          <ListViewPane column={c} index={i} {...newProps} />
        ))}
      </div>
    </Element>
  );
};
