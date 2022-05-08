/*
 * Copyright (c) 2022, Emmanuel Schweitzer and salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import OmniscriptTextarea from "omnistudio/textarea";
import { getHelperClassName, getStatusIcon } from "c/sfGpsDsAuNswFormHelperOsN";
import tmpl from "./sfGpsDsAuNswTextareaOsN.html";

export default class SfGpsDsAuNswTextareaOsN extends OmniscriptTextarea {
  render() {
    return tmpl;
  }

  get computedLabelClassName() {
    return `nsw-form__label ${this.required ? "nsw-form__required" : ""}`;
  }

  get computedHelperClassName() {
    return getHelperClassName("invalid");
  }

  get computedStatusIcon() {
    return getStatusIcon("invalid");
  }

  get ariaDescribedBy() {
    return this.isError ? "textarealabel errorMessageBlock" : "textarealabel";
  }
}