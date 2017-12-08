import React from 'react';
import ReactDOM from 'react-dom';

import { FrameworkDelegate } from '@ionic/core';

export function attachViewToDom(parentElement: HTMLElement, reactComponent: any, propsOrData: any, classesToAdd: string[]) {
  const wrappingDiv = document.createElement('div');
  if (classesToAdd) {
    for (const clazz of classesToAdd) {
      wrappingDiv.classList.add(clazz);
    }
  }

  parentElement.appendChild(wrappingDiv);

  // mount the React component
  const reactElement = React.createElement(reactComponent, propsOrData);
  const mountedComponentInstance = ReactDOM.render(reactElement, wrappingDiv);

  return Promise.resolve({
    element: wrappingDiv,
    reactElement: reactElement,
    instance: mountedComponentInstance
  });

}

export function removeViewFromDom(parentElement: HTMLElement, childElement: HTMLElement): Promise<any> {
  ReactDOM.unmountComponentAtNode(childElement);
  parentElement.removeChild(childElement);
  return Promise.resolve();
}

const Delegate: FrameworkDelegate = {
  attachViewToDom: attachViewToDom,
  removeViewFromDom: removeViewFromDom,
};

export { Delegate }