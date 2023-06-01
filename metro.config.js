const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname);
module.exports.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');