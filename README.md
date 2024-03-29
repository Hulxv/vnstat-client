
<div align="center"> 

[![CircleCI](https://circleci.com/gh/Hulxv/vnstat-client.svg?style=svg)](https://circleci.com/gh/Hulxv/vnstat-client)

[![GitHub release](https://img.shields.io/github/v/release/Hulxv/vnstat-client?style=for-the-badge)](https://github.com/Hulxv/vnstat-client/releases)


![linux](https://img.shields.io/badge/Linux-FCC624.svg?style=for-the-badge&logo=Linux&logoColor=black)
![nextjs](https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=next-dot-js&logoColor=white)
![electronjs](https://img.shields.io/badge/Electron-47848F.svg?style=for-the-badge&logo=Electron&logoColor=white)

</div>

<div align='center'> <img src="resources/icons/512x512.png" alt="vnstat-client-logo" width="300" /> <h1 align='center'>vnStat Client</h1> </div>

<h3 align='center'> GUI Client for <a href='https://github.com/vergoh/vnstat'>vnStat traffic monitor</a> built with <a href='https://github.com/saltyshiomix/nextron/tree/v7.1.0'>Nextron</a> </h3>

## Requirements

- vnStat^2.8 ([guide](docs/vnstat-installation-guide.md))


## Features

- Network statistics monitor
- Display statistics for your usage for different intervals
  - Daily
  - Weekly
  - Monthly
  - Yearly
  - Custom Interval you choose
- Different types of stats display
  - Bar Chart
  - Line Chart
  - Table
- Export all information as:
  - CSV
  - XML
  - JSON
- Beautiful UI (Thanks [Chakra UI](https://chakra-ui.com/) for this great UI components library)
- Different themes and color schemes for UI and Charts (Line/Bar Chart and Thanks for [Nivo](https://nivo.rocks/) for great charts library)
- Full controlling in vnStat Daemon (Support systemd & sysvinit)
- Easy changing vnStat's configurations

And more!

## Installation

> Please check [INSTALLATION.md](./INSTALLATION.md)

---

## Screenshots

![Table](screenshots/2022-01-06-23-42-33.png)

![line chart](screenshots//2022-01-06-23-42-25.png)

![bar chart](screenshots/2022-01-06-23-42-50.png)

Show [More](screenshots).



## Credits

- Thanks [vergoh](https://github.com/vergoh) for making this amazing [tool](https://github.com/vergoh/vnstat).
- Thanks to any developer who build a library used in this project.



## Contribution

You can contribute by doing one of the following:

- Starring the repository.
- Forking the repository.
- Creating an Issue.
- Creating a Pull Request.

## Changes logs

> Please check [CHANGELOG.md](./CHANGELOG.md)



You can see all packages used in the project in [package.json](./package.json)



## Documentations

> Read [Documentions](docs/index.md) for more information



## Statistics
<div align="center"> 

[![GitHub stars](https://img.shields.io/github/stars/Hulxv/vnstat-client?style=for-the-badge)](https://github.com/Hulxv/vnstat-client/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Hulxv/vnstat-client?style=for-the-badge)](https://github.com/Hulxv/vnstat-client/network)
[![Github Downloads](https://img.shields.io/github/downloads/Hulxv/vnstat-client/total.svg?style=for-the-badge)]()

</div>



## Related
- [vnstat-server](https://github.com/hulxv/vnstat-server)



## License

vnStat Client is available under the [GPL-2](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html) license.
For more, you can read [License](https://github.com/Hulxv/vnstat-client/blob/main/LICENSE) file.


<div align="center"> 

[![GitHub license](https://img.shields.io/github/license/Hulxv/vnstat-client?style=for-the-badge)](https://github.com/Hulxv/vnstat-client/blob/main/LICENSE)

</div>


## Next Step 
> It's not expected to be soon, it may take about a year to get started due to the pressure of studying in high school. If there are any suggestions, You can open an [issue](https://github.com/Hulxv/vnstat-client/issues/new/choose)!
- Moving from Electronjs to [Tauri](https://tauri.app/) to improve performance, decrease bundle size, and use fewer resources.
