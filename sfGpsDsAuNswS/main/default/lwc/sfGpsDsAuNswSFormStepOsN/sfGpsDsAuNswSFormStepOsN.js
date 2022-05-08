/*
 * Copyright (c) 2022, Emmanuel Schweitzer and salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

// Setup:
// in omniscript designer, go to setup tab and in the Element Type To LWC Component Mapping section
// set Step as the ElementType and this LWC as the Lightning Web Component

import OmniscriptStep from "omnistudio/omniscriptStep";
import { omniGetMergedField } from "c/sfGpsDsOmniHelpersOsN";
import tmpl from "./sfGpsDsAuNswSFormStepOsN.html";

export default class SfGpsDsAuNswSFormStepOs extends OmniscriptStep {
  render() {
    return tmpl;
  }

  handleNext(e) {
    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent("omniautoadvance", {
        bubbles: true,
        detail: {
          moveToStep: "next"
        }
      })
    );
  }

  handleBack(e) {
    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent("omniautoadvance", {
        bubbles: true,
        detail: {
          moveToStep: "previous"
        }
      })
    );
  }

  handleSave(e) {
    e.stopPropagation();

    if (!this._propSetMap.allowSaveForLater) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent("omnisaveforlater", {
        bubbles: true,
        detail: {
          auto: false
        }
      })
    );
  }

  get mergedLabel() {
    return omniGetMergedField(this._propSetMap.label);
  }

  get mergedChartLabel() {
    return omniGetMergedField(this._propSetMap.chartLabel);
  }

  get mergedCancelLabel() {
    return omniGetMergedField(this._propSetMap.cancelLabel);
  }

  get mergeSaveLabel() {
    return omniGetMergedField(this._propSetMap.saveLabel);
  }

  get mergedPreviousLabel() {
    return omniGetMergedField(this._propSetMap.previousLabel);
  }

  get mergedNextLabel() {
    return omniGetMergedField(this._propSetMap.nextLabel);
  }

  get showSave() {
    return this._propSetMap.allowSaveForLater && this._propSetMap.saveLabel;
  }

  get showNext() {
    return this._propSetMap.nextWidth > 0 && this._propSetMap.nextLabel;
  }

  get showPrev() {
    return (
      this.scriptHeaderDef.asIndex > this.scriptHeaderDef.firstStepIndex &&
      this._propSetMap.previousWidth > 0 &&
      this._propSetMap.previousLabel
    );
  }

  // cancelLabel
  // /laststepindex?
  // asIndex

  // jsonDef.indexInParent
  // jsonHeaderDef.asIndex;
}