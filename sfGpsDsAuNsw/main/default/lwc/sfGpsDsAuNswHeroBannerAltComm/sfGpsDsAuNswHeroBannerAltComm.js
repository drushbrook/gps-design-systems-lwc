import { api, track } from "lwc";
import SfGpsDsLwc from "c/sfGpsDsLwc";
import mdEngine from "c/sfGpsDsMarkdown";
import { replaceInnerHtml } from "c/sfGpsDsHelpers";

export default class SfGpsDsAuNswHeroBannerAltComm extends SfGpsDsLwc {
  // ---- titleLink: String in Markdown format

  _titleLink;
  @track _titleLabel;
  @track _titleUrl;

  @api set titleLink(markdown) {
    this._titleLink = markdown;

    try {
      const { url, text } = mdEngine.extractFirstLink(markdown);
      this._titleUrl = url;
      this._titleLabel = text;
    } catch (e) {
      console.log("Exception: " + JSON.stringify(e));
    }
  }

  get titleLink() {
    return this._titleLink;
  }

  // ---- imageSrc: String
  // ---- imageAlt: String

  @api imageSrc;
  @api imageAlt;

  // ---- content: String in Markdown format

  _content;
  _contentHtml;

  @api set content(markdown) {
    this._content = markdown;

    try {
      this._contentHtml = mdEngine.renderEscaped(markdown);
    } catch (e) {
      this.addError("CO-MD", "Issue when parsing Content markdown");
    }
  }

  get content() {
    return this._content;
  }

  // ---- className: String

  @api className;

  // ---- rendered

  _rendered = false;

  renderedCallback() {
    if (this._rendered === false) {
      let element = this.template.querySelector(
        ".nsw-hero-banner-alt__content_internal"
      );

      if (element) {
        /*
         * We have to add an empty span if there is a title to trigger the appropriate css for *+p and similar
         * as the react component would have one for the title in the same scope,
         * but here our containment hierarchy is a bit different.
         */

        let span = this._titleLabel ? `<span></span>` : "";
        let markup = (this._titleLabel ? span : "") + (this._contentHtml || "");

        replaceInnerHtml(element, markup);
      } else {
        this.addError("RC-PH", "Couldn't find internal markdown placeholder");
      }

      this._rendered = true;
    }
  }
}
