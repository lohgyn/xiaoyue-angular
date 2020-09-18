import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  isPresent(): Promise<boolean> {
    return element(by.css('app-root')).isPresent() as Promise<boolean>;
  }
}
