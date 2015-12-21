import {inject, customAttribute} from 'aurelia-framework';
import {Tabs} from 'tabs';
import {EventAggregator} from 'aurelia-event-aggregator';

@customAttribute('tabitem')
@inject(EventAggregator, Element, Tabs)
export class TabItem {

  constructor(eventAggregator, el, tabs) {
    this.el = el;
    this.tabs = tabs;
    this.eventAggregator = eventAggregator;
  }

  attached() {
    this.populateTabs();
    this.subscribe();
  }

  populateTabs() {
    this.tabs.list.push({
      value: this.el.attributes.tabitem.value,
      targetId: this.el.attributes['au-target-id'].value,
      isActive: null
    });
  }

  subscribe() {
    this.eventAggregator.subscribe('testchannel', payload => {
      console.log("Yup!")
    });
  }

}