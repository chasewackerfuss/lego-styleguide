import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {values} from 'lodash';

@inject(EventAggregator)
export class Sidebar {
  
  @bindable router;

  order = [
    'settings',
    'generic',
    'tools',
    'base',
    'objects',
    'components'
  ];

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;

    this.eventAggregator.subscribe('router:navigation:complete', ({instruction}) => {
      this.activateCategory(instruction.config);
    });
  }

  activateCategory(currentRoute) {

    this.categories.forEach((category) => {
      category.categoryOpen = currentRoute.category === category.name;
    })

  }

  routerChanged({routes}) {

    if (!routes) {
      throw new Error('Routes is required');
    }
    routes = routes.filter((route) => {
      return route.category;
    }).map((route) => {
      if (Array.isArray(route.route)) {
        route.route = route.route[0];
      }
      return route;
    });

    var categoriesObject = routes.reduce((categories, route) => {
      if (!categories[route.category]) {
        categories[route.category] = {
          name: route.category,
          pages: []
        }
      }

      categories[route.category].pages.push(route);

      return categories;
    }, {});

    var unsortedCategory = values(categoriesObject);
    this.categories = this.order.map((name) => {
      for (let j = 0; j <  unsortedCategory.length; j++) {
        var category = unsortedCategory[j];
        if (category.name === name) {
          return unsortedCategory.splice(j, 1)[0];
        }
      }
      return {
        name,
        pages: []
      };
    });

    console.log('Categories Change: %O', this.categories);
  }


  expandList(category){
    console.log(category);

    this.categories.forEach(function(cat) {
      cat.categoryOpen = false;
    });

    category.categoryOpen = true;
  }

}
