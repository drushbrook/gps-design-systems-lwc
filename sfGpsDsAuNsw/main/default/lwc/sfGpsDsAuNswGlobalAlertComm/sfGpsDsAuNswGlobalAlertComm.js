/*
 * Copyright (c) 2022, Emmanuel Schweitzer and salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { api, track } from "lwc";
import SfGpsDsLwc from "c/sfGpsDsLwc";
import mdEngine from "c/sfGpsDsMarkdown";

export default class SfGpsDsAuNswGlobalAlertComm extends SfGpsDsLwc {
  @api title;
  @api copy;
  @api as = "default";
  @api className;

  /*
   * cta
   */

  @track _cta;
  _originalCta;

  @api get cta() {
    return this._originalCta;
  }

  set cta(markdown) {
    this._originalCta = markdown;

    try {
      this._cta = markdown ? mdEngine.extractFirstLink(markdown) : null;
    } catch (e) {
      this.addError("CTA-MD", "Issue when parsing cta markdown");
    }
  }

  @api ctaStyle = "link";
}
