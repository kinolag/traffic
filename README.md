# traffic - geospatial visualisation app

Built with TypeScript, React and D3.

The app visualises part of the information about the [road traffic statistics](https://roadtraffic.dft.gov.uk/downloads) collected in the UK over the last 23 years (2000-2022), across 45,865 manual count points.

Traffic data is displayed over a [GeoJSON representation](https://martinjc.github.io/UK-GeoJSON/) of the selected area generated with [D3.js](https://d3js.org/).

Features:

• view traffic points in selected `area`

• see gradual evolution by modifying `year` via custom slider

• filter data by `vehicle type`

• display an animated loader while data is being fetched

The app is responsive and works on touch screen devices too.

Deployed to [kinola.it/app/traffic/](https://kinola.it/app/traffic/)


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

