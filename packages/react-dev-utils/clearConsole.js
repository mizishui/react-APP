/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

function clearConsole() {
  if (process.env.DEBUG) {
    return;
  }

  process.stdout.write(
    process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H'
  );
}

module.exports = clearConsole;
