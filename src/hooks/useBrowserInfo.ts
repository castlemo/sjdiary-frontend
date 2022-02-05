import Bowser from 'bowser';

const browser = Bowser.parse(window.navigator.userAgent);

export const useBrowserInfo = () => {
  console.log(browser);
  return browser;
};
