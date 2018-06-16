/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}


declare global {

  namespace StencilComponents {
    interface CalendarPicker {
      'multipleDays': boolean;
    }
  }

  interface HTMLCalendarPickerElement extends StencilComponents.CalendarPicker, HTMLStencilElement {}

  var HTMLCalendarPickerElement: {
    prototype: HTMLCalendarPickerElement;
    new (): HTMLCalendarPickerElement;
  };
  interface HTMLElementTagNameMap {
    'calendar-picker': HTMLCalendarPickerElement;
  }
  interface ElementTagNameMap {
    'calendar-picker': HTMLCalendarPickerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'calendar-picker': JSXElements.CalendarPickerAttributes;
    }
  }
  namespace JSXElements {
    export interface CalendarPickerAttributes extends HTMLAttributes {
      'multipleDays'?: boolean;
      'onSelectedDaysUpate'?: (event: CustomEvent) => void;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;