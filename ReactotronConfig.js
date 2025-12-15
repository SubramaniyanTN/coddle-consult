let reactotron = {
    createEnhancer: () => (next) => (reducer, initialState) =>
      next(reducer, initialState),
  };
  
  if (__DEV__) {
    const Reactotron = require('reactotron-react-native').default;
    const AsyncStorage =
      require('@react-native-async-storage/async-storage').default;
    const { reactotronRedux } = require('reactotron-redux');
    const {
      openInEditor,
      trackGlobalErrors,
    } = require('reactotron-react-native');
  
    Reactotron.setAsyncStorageHandler(AsyncStorage)
      .configure({ name: 'React Native Demo' }) // controls connection & communication settings
      .useReactNative() // adds built-in React Native plugins
      .use(openInEditor())
      .use(
        trackGlobalErrors({
          veto: (frame) =>
            !frame.fileName.includes('/node_modules/react-native/'),
        }),
      )
      .use(reactotronRedux())
      .connect();
  
    Reactotron.clear(); // optional, clear logs on startup
  
    console.tron = Reactotron;
    reactotron = Reactotron;
  } else {
    // Prevent runtime errors in production
    console.tron = {
      log: () => {},
      logImportant: () => {},
      display: () => {},
    };
  }
  
  export default reactotron;
  