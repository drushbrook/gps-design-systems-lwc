/*
 * Copyright (c) 2022, Emmanuel Schweitzer and salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { api, track } from "lwc";
import { parseIso8601, replaceInnerHtml } from "c/sfGpsDsHelpers";
import SfGpsDsLwc from "c/sfGpsDsLwc";
import mdEngine from "c/sfGpsDsMarkdown";

export default class SfGpsDsAuNswCardComm extends SfGpsDsLwc {
  // ADJUSTED: style is a reserved keyword in lwc
  @api cstyle = "white"; // PropTypes.oneOf(['dark', 'light', 'white']),
  // END ADJUSTED
  @api tag;
  @api image;
  @api imageAlt;
  // ADJUSTED: incorporate highlight into cstyle
  // @api highlight = false;
  // END ADJUSTED
  @api className;

  // This is not exposed in Experience Builder and is used by cardCollectionComm
  @api useMarkup = false;

  /*
   * headline and link
   */

  @track _headline; // combined link into headline
  _originalHeadline;

  @api get headline() {
    return this._originalHeadline;
  }

  set headline(markdown) {
    this._originalHeadline = markdown;

    try {
      this._headline = markdown ? mdEngine.extractFirstLink(markdown) : null;
    } catch (e) {
      this.addError("HL-MD", "Issue when parsing Headline markdown");
    }
  }

  /*
   * date
   */

  @track _date;
  _originalDate;

  @api get date() {
    return this._originalDate;
  }

  set date(date) {
    this._originalDate = date;

    if (date instanceof Date) {
      this._date = date;
    } else {
      this._date = date ? parseIso8601(date.toString()) : null;
    }
  }

  /*
   * copy
   */

  _copy;
  _copyHtml;

  @api get copy() {
    return this._copy;
  }

  set copy(markdown) {
    this._copy = markdown;
    try {
      if (markdown) {
        this._copyHtml = this.useMarkup
          ? markdown
          : mdEngine.renderEscaped(markdown);
      } else {
        this._copyHtml = null;
      }
    } catch (e) {
      this.addError("CO-MD", "Issue when parsing Copy markdown");
    }
  }

  _footer;
  _footerHtml;

  @api get footer() {
    return this._footer;
  }

  set footer(markdown) {
    this._footer = markdown;
    try {
      if (markdown) {
        this._footerHtml = this.useMarkup
          ? markdown
          : mdEngine.renderEscaped(markdown);
      } else {
        this._footerHtml = null;
      }
    } catch (e) {
      this.addError("FO-MD", "Issue when parsing Footer markdown");
    }
  }

  renderedCallback() {
    let element;

    if (this.copy) {
      if ((element = this.template.querySelector(".nsw-card__copy"))) {
        replaceInnerHtml(element, this._copyHtml);
      } else {
        this.addError(
          "RC-PHC",
          "Couldn't find internal copy markdown placeholder"
        );
      }
    }

    if (this.footer) {
      if ((element = this.template.querySelector(".nsw-card__footer"))) {
        replaceInnerHtml(element, this._footerHtml);
      } else {
        this.addError(
          "RC-PHF",
          "Couldn't find internal footer markdown placeholder"
        );
      }
    }
  }
}
