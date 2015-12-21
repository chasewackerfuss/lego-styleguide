import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Tabs} from 'tabs';
import addEventListener from '../lib/add-event-listener';
import debounce from '../lib/debounce';

@inject(EventAggregator, Tabs)
export class PageHeader {

	constructor(eventAggregator, tabs) {

    this.tabs = tabs;
    this.eventAggregator = eventAggregator;
    this.activeSection = null;
    this.sections = null;

    this.eventAggregator.subscribe('router:navigation:complete', ({instruction}) => {
      this.setTitle(instruction.config);
    });

  }

  attached() {
    this.cleanup = addEventListener(window, 'scroll', this.handleScroll.bind(this));
  }

  detached() {
    if (typeof this.cleanup === 'function') {
      this.cleanup();
    }
  }

  setTitle(currentRoute) {
  	this.title = currentRoute.title;
  	this.description = currentRoute.description;
  }

  toSection(tab) {

    this.tabs.list.forEach(function(item) {
      item.isActive = false;
    });

    tab.isActive = true;

    console.log(this.tabs);

    console.log("Scrolling to Target ID: " + tab.targetId);
    document.querySelector('[au-target-id="' + tab.targetId + '"]').scrollIntoView();
  }


  isAnElementInViewport () {

    var sections = document.querySelectorAll('.l-technical'),
        docHeight = document.documentElement.clientHeight,
        checkpoint = docHeight * 0.5;

    this.sections = sections;

    if (this.activeSection) {

      var section = this.activeSection,
          rect = section.getBoundingClientRect(),
          isAtCheckpoint = rect.top < checkpoint && checkpoint < rect.bottom;

      var sectionTitle = section.parentElement.children[0].children[0].innerText;

      if ( isAtCheckpoint ) {
        //console.log(sectionTitle + " Still In View!");
        return;
      }

    }

    for (var i = 0; i<sections.length; i++) {
      
      var section = sections[i],
          rect = section.getBoundingClientRect(),
          sectionTitle = section.parentElement.children[0].children[0].innerText,
          isAtCheckpoint = rect.top < checkpoint && checkpoint < rect.bottom;


      if ( isAtCheckpoint ) {

        console.log(sectionTitle + " is now active.");
        this.activeSection = section;
        section.parentElement.classList.remove("section-is-inactive");
        section.parentElement.classList.add("section-is-active");

      } else {
        section.parentElement.classList.remove("section-is-active");
        section.parentElement.classList.add("section-is-inactive");
      }
      
    }

  }

  handleScroll() {
    
    debounce(this.modifyPageHeader(), 250);
    debounce(this.isAnElementInViewport(), 250);

  }

  modifyPageHeader() {
    var el = document.querySelector('.l-page-header');

    if (document.body.scrollTop > 2) {
      el.classList.add("is-compact");
    } else {
      el.classList.remove("is-compact");
    }
  }


	
}