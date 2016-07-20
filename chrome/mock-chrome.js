// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License")
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

document.execCommand = function () {
  return true;
};

// Manually override functions by replacing the entire namespace.
// See: https://github.com/acvetkov/sinon-chrome/issues/30
chrome.runtime = {
  getURL: function (path) {
    return '/base/chrome/' + path;
  }
};

var contextMenus = {};

chrome.contextMenus = {
  create: function (contextMenu, callback) {
    contextMenus[contextMenu.title] = contextMenu;
    callback();
  }
};

chrome.notifications = {
  create: function (nid, options, callback) {
    if (!nid) {
      nid = 'notification-' + Math.floor(Math.random(1000000));
    }

    var nevent = new Event('chrome-notification');
    nevent.id = nid;
    nevent.options = options;
    document.dispatchEvent(nevent);

    if (callback) {
      callback(nid);
    }
  },
  clear: function (nid, callback) {
    var nevent = new Event('chrome-notification-removed');
    nevent.id = nid;
    document.dispatchEvent(nevent);

    if (callback) {
      callback(true);
    }
  }
};
