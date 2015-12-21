export class App {

  configureRouter(config, router) {
    config.title = 'Lego';
    config.map([

      { route: ['', 'welcome'],
        name: 'welcome',
        moduleId: 'welcome',
        nav: true,
        title: 'Welcome',
        description: 'Welcome to the Lego Framework Styleguide'
      },

      { route: 'docs/base/typography',
        name: 'typography',
        moduleId: 'docs/base/typography',
        nav: true,
        title: 'Typography',
        category: 'base',
        description: 'The fundamental type styles across the entire framework.'
      },

      { route: 'docs/generic/normalize',
        name: 'normalize',
        moduleId: 'docs/generic/normalize',
        nav: true,
        title: 'Normalize',
        category: 'generic',
        description: 'Normalize'
      },

      { route: 'docs/objects/icons',
        name: 'icons',
        moduleId: 'docs/objects/icons',
        nav: true,
        title: 'Icons',
        category: 'objects',
        description: 'Utilizing the material icons design package.'
      },

      { route: 'docs/objects/buttons',
        name: 'buttons',
        moduleId: 'docs/objects/buttons',
        nav: true,
        title: 'Buttons',
        category: 'objects',
        description: 'A button should clearly communicate to a user what action will occur when it is clicked.'
      },

      { route: 'docs/objects/load-animation',
        name: 'load-animation',
        moduleId: 'docs/objects/load-animation',
        nav: true,
        title: 'Load Animation',
        category: 'objects',
        description: 'For user feedback awaiting app to be loaded.'
      },

      { route: 'docs/settings/variables',
        name: 'variables',
        moduleId: 'docs/settings/variables',
        nav: true,
        title: 'Variables',
        category: 'settings',
        description: 'Global variables used across the framework'
      },

      { route: 'docs/objects/grid',
        name: 'grid',
        moduleId: 'docs/objects/grid',
        nav: true,
        title: 'Grid',
        category: 'objects',
        description: 'A mobile first grid based on flexbox, with plenty of modifiers on both the flex container and flex items. Multiple grid column counts can be used from a top level down.'
      }

    ]);

    this.router = router;
  }

}
