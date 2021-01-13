module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './src/components',
          '@context': './src/context',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@services': './src/services',
        },
      },
    ],
  ],
};
