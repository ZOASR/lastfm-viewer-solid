# Changelog

All notable changes to this project will be documented in this file.

## [unreleased]

### Bug Fixes

- Removed tailwind content config to avoid generating extra styles during dev
- Update library name in Vite config for consistency
- Enforce minimum update interval for Lastfm viewer to prevent rate limiting

### Documentation

- Remove caution note about updateInterval from README and update image assets

### Features

- Optimize source maps by excluding embedded source content

### Refactor

- Update ErrorView component to accept Error object instead of string message

### Ui

- Fix wrong size for album cover size skeleton when loading
- Fix spin animation for disc when there is no album cover image

## [3.0.1] - 2025-06-11

### Refactor

- Remove api_key prop from Test component and update related usage in App and README

### Update

- V3.0.1

## [3.0.0] - 2025-06-11

### Refactor

- Removed api_key prop from SolidLastFMViewer and adjusted related components

### Ui

- Adjust loading skeleton size in ReactLastFMViewer component for improved responsiveness

### Update

- V2.4.2
- V3.0.0

## [2.4.2] - 2025-06-04

### Update

- V2.4.2

## [2.4.1] - 2025-06-03

### Update

- V2.4.1

## [2.4.0] - 2025-06-03

### Breaking

- Transfered scoping to postcss-scope plugin and removed css modules

### Update

- V2.4.0

## [2.3.5] - 2025-06-03

### Dev

- Added a button to toggle between dev component and live component

### Ui

- Adapting colors based on prefered color scheme (dark&light)
- Fixed a scoping issue that causes tailwind v3 styles to clash with v4

### Update

- V2.3.4
- V2.3.5

## [2.3.4] - 2024-09-08

### Bug Fixes

- Converted unchanged variable to const

### Ui

- Replaced default album cover with an icon
- Replaced drop-shadow in ablum cover with a drop-shadow
- Fixed card footer component layout and changed user icon styles

### Update

- V2.3.4

## [2.3.3] - 2024-07-15

### Update

- V2.3.3

## [2.3.2] - 2024-06-19

### Update

- V2.3.2

## [2.3.1] - 2024-06-19

### Documentation

- Added svg as a divider instead of html div

### Build

- Upgraded packages

### Update

- V2.3.0
- V2.3.0
- V2.3.1

## [2.3.0] - 2024-02-08

### Bug Fixes

- Added the mode prop for handling errors in error view

### Documentation

- Added better documentation for usage

### Dev

- Changed solid-js external name to "solidJs"
- Added a test component to test for built library

### Update

- V2.3.0

## [2.2.6] - 2024-02-03

### Update

- V2.2.6

## [2.2.5] - 2024-01-29

### Bug Fixes

- Removed relative color in pasttracks title background

### Documentation

- Added project logo and homepage

### Update

- V2.2.5

## [2.2.4] - 2024-01-25

### Styling

- Changed font sizing to adapt to any page styles

### Update

- V2.2.4

## [2.2.3] - 2024-01-19

### Bug Fixes

- Converted all http links to https

### Update

- V2.2.3

## [2.2.2] - 2024-01-14

### Bug Fixes

- Fixed some of daisyui themes are applied to the whole page

### Documentation

- Modified package git repo url
- Added bun as an installer in README

### Update

- V2.2.2

## [2.2.1] - 2024-01-08

### Refactor

- Scoped daisyui styles to avoid unwanted conflicts

### Update

- V2.2.1

## [2.2.0] - 2024-01-08

### Bug Fixes

- Fixed wrong number formatting when displaying track length

### Refactor

- Used a simpler array method to display past tracks

### Styling

- Changed album cover shadow to hsla color for better browser compatibility

### Update

- V2.2.0

## [2.1.5] - 2024-01-04

### Dev

- Moved all utility functions and types to the util package
- Renamed monorepo to @lastfm-viewer

### Update

- V2.1.3
- V2.1.5

## [2.1.3] - 2024-01-03

### Update

- V2.1.2
- V2.1.3

## [2.1.2] - 2024-01-03

### Styling

- Modified shadow color for album cover
- Modified background color for past tracks title

### Update

- V2.1.1
- V2.1.2

## [2.1.1] - 2024-01-02

### Update

- V2.1.1

## [2.1.0] - 2024-01-02

### Bug Fixes

- Wrong solidJs config in vite
- Wrong solidJs import

### Miscellaneous Tasks

- Renamed package

### Dev

- Added package git repo link

### Update

- V2.0.1
- V2.1.0

## [2.0.1] - 2024-01-02

### Dev

- Added turbo folder to gitignore
- Fixed wrong import typo

### Update

- V2.0.0
- V2.0.1

## [2.0.0] - 2024-01-01

### Refactor

- Use imageUrl in Track info instead of conditionally rendering the image based on sources
- Simplified colors and used color data from track info

### Dev

- Removed color.js as a dependency (now handeled in the utility package)

### Update

- V2.0.0

## [1.2.0] - 2023-12-30

### Bug Fixes

- Skeleton not showing when first time loading the component
- Avoid reloading when the same track is playing

### Documentation

- Modified README
- Fixed typo in README

### Styling

- View small MB cover image for network effeciency

### Dev

- Modified update script
- Modified CHANGELOG
- Migrated project to the monorepo
- Unused imports
- Unused package-lock file
- Unused import
- Added build name for solid-lastfm-viewer
- Modified update script

### Update

- V1.1.5
- Changeset version

## [1.0.5] - 2023-12-27

### Documentation

- Added CHANGELOG file

### Refactor

- Use solid store instead of multiple signals
- Modified context to use the new store
- Changed component logic to use the store instead of prevoius signals
- Refactored LoadingSkeleton component to use the new context
- Refactored PastTracks component to use the new context
- Refactored TrackProgressBar component to use the new context
- Used createResource to fetch track info instead of naiive loading state
- Use Switch Component instead of Show for more clarity
- Renamed fallback prop in LoadingSKeleton component
- Modified fallback in LoadingSkeleton to be an element

### Styling

- Added some styles and animations for smooth visuals

### Dev

- Modified update script
- Unused imports
- Unused imports

### Update

- V1.0.5

## [1.0.4] - 2023-12-26

### Bug Fixes

- Not showing album name even when it is available
- Destructuring props caused reduced reactivity

### Styling

- Reduced padding on past tracks title

### Dev

- Modified update script

### Update

- V1.0.4

## [1.0.3] - 2023-12-26

### Bug Fixes

- Not fetching album cover from MB when lastfm album isn't available
- Removed tailwind's opnionated preflight styles to avoid style conflicts
- Show artist name even when no album is available or no album cover is available

### Performance

- Added preconnect links to root component

### Refactor

- Moved most of the logic to seperate components

### Styling

- Style changes and improvements to album cover image and link colors

### Dev

- Added prettier cofig file
- Format files usinf prettier
- Unused constant
- Added update script

### Update

- V1.0.3

## [1.0.2] - 2023-12-25

### Bug Fixes

- Added inject Css plugin to vite to inject all styles in the component

### Update

- Version1.0.2

<!-- generated by git-cliff -->
