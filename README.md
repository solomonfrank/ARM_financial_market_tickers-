### Questions

### How long did you spend on the coding test? 
I spent some couple of hours to build the test


### What would you add to your solution if you had more time? If you did not spend much time on the coding test, then use this as an opportunity to explain what you would add
I would add 
- News likes functionality
- Comment functionality
- Subscribed for news feed functionality

### What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you have used it.

The latest version of react is v17, and there has not been more new features added others than bug fixes. Set of new features where introduced in v16 which are hooks api. This demo app is built on top react hooks, and some of hooks api that I used are

// store.js
`import React, { createContext, useReducer, useContext } from "react";`

export const initState = {
  news: [],
}

const newsReducer = (state = initState, action) => {
    switch(action.type) {
        case "GET_ALL_NEWS":
            return {
                ...state,
                loading: false,
                news: action.payload,
            };
        default:
          return state;  
    }

}
`export const Context = createContext(initState);`

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(newsReducer, initState);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;

// example.js
`import React, { useContext } from "react";`
`import { Context } from "./store";`

const Example = () => {
  const { state, dispatch } = useContext(Context);
  return (
      <div> {state.news.count} </div>
    )
}
The core api are createContext, useReducer, useContext, 
- createContext allow us to pass properties around
- useReducer allows us to manage our state and also provides us a way to update our state.
- useContext allows us to access the pass properies from the created context

Note: Wrap the top most parent with `Provider` from `store.js`


### How would you track down a performance issue in production? Have you ever had to do this? 
I had been in a situation where I had need to optimize an app
- I basically start with Lighthouse to gain insight on the overall performance  of the app and also,
- [browser-perf](https://github.com/axemclion/browser-perf).

After the insight, I had to do some of the following
- Optimize my images
- Used cdn to serves my assets
- Used `source-map-explorer` to understand where code bloat is coming from.
- Lazy load my script using `React.Lazy`
- Defer blocking  third-parties script using the javascript `defer`
- Remove un-used css and javascript by using javascript and css style guides. Purgecss is usually helpful.

### How would you improve the Just marketaux that you just used?
- Add user subscription to  news feed
- Add user comments and likes endpoints
- I think related resources from the resource endpoints should be loaded on demand.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
