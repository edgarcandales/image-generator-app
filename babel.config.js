module.exports = function (api) {
  api.cache(true); // Enable caching for faster rebuilds
  return {
    presets: ['babel-preset-expo'], // Expo preset for React Native
    plugins: [
      [
        'module:react-native-dotenv', // Dotenv plugin
        {
          moduleName: '@env', // The module name to use when importing
          path: '.env', // The path to your .env file
          blacklist: null, // Exclude specific variables (optional)
          whitelist: null, // Include specific variables (optional)
          safe: false, // Set to true to use .env.example as a template (optional)
          allowUndefined: true, // Set to false to throw an error if a variable is undefined
        },
      ],
    ],
  };
};
