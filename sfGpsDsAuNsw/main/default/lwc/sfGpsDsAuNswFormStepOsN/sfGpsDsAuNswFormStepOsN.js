/*
 * Copyright (c) 2022, Emmanuel Schweitzer and salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

// Setup:
// in omniscript designer, go to setup tab and in the Element Type To LWC Component Mapping section
// set Step as the ElementType and this LWC as the Lightning Web Component

import OmniscriptStep from 'omnistudio/omniscriptStep';
import { omniGetMergedField } from 'c/sfGpsDsOmniHelpersOsN';
import tmpl from './sfGpsDsAuNswFormStepOsN.html';

export default class SfGpsDsAuNswFormStepOsN extends OmniscriptStep {
  render() {
    return tmpl;
  }

  get mergedLabel() {
    return omniGetMergedField(this, this._propSetMap.label);
  }
}
