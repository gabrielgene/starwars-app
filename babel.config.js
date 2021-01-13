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
          '@theme': './src/theme',
          '@assets': './src/assets',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
