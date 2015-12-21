import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Tabs {
	constructor(eventAggregator) {
		this.list = [];
		this.eventAggregator = eventAggregator;
	}

	wipeTabs() {
		this.list = [];
	}

}