import { createElement } from "lwc";
import SfGpsDsUkGovRadioGroupOsN from "c/sfGpsDsUkGovRadioGroupOsN";

describe("c-sf-gps-ds-uk-gov-radio-group-os-n", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("TODO: test case generated by CLI command, please fill in test logic", () => {
    // Arrange
    const element = createElement("c-sf-gps-ds-uk-gov-radio-group-os-n", {
      is: SfGpsDsUkGovRadioGroupOsN
    });

    // Act
    document.body.appendChild(element);

    // Assert
    expect(1).toBe(1);
  });
});
