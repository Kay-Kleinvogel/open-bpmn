[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![GitHub Release](https://img.shields.io/github/release/tterb/PlayMusic.svg?style=flat)]()  
[![Twitter Follow](https://img.shields.io/twitter/follow/bstevensondev.svg?style=social)](https://twitter.com/KayKleinvogel)

# Open BPMN

Open BPMN is an open source editor for BPMN diagrams. Its goal is to provice a solution that can be used by everyone (no matter which plattform) for free.

## Getting Started

Clone this repository locally :

```bash
git clone https://github.com/Ironlors/open-bpmn
```

Install dependencies with npm :

```bash
npm install
```

There is an issue with `yarn` and `node_modules` when the application is built by the packager. Please use `npm` as dependencies manager.

If you want to generate Angular components with Angular-cli , you **MUST** install `@angular/cli` in npm global context.
Please follow [Angular-cli documentation](https://github.com/angular/angular-cli) if you had installed a previous version of `angular-cli`.

```bash
npm install -g @angular/cli
```

## To build for development

- **in a terminal window** -> npm start

Voila! You can use your Angular + Electron app in a local development environment with hot reload !

## Included Commands

| Command                    | Description                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `npm run ng:serve:web`     | Execute the app in the browser                                                                              |
| `npm run build`            | Build the app. Your built files are in the /dist folder.                                                    |
| `npm run build:prod`       | Build the app with Angular aot. Your built files are in the /dist folder.                                   |
| `npm run electron:local`   | Builds your application and start electron                                                                  |
| `npm run electron:linux`   | Builds your application and creates an app consumable on linux system                                       |
| `npm run electron:windows` | On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems         |
| `npm run electron:mac`     | On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

## Built With

- [Angular](https://angular.io/) - The web framework used
- [ElectronJS](https://www.electronjs.org/) - creating the desktop applications
- [bpmn.io](https://bpmn.io/) - Used as the bpmn engine

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [releases](https://github.com/Ironlors/open-bpmn/releases).

## Authors

- **Kay Kleinvogel** - Owner of repository - [Ironlors](https://github.com/Ironlors)

See also the list of [contributors](https://github.com/Ironlors/open-bpmn/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
