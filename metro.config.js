const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
	transformer: {
		babelTransformerPath: require.resolve('react-native-svg-transformer/react-native'),
	},
	resolver: {
		assetExts: assetExts.filter(ext => ext !== 'svg'),
		sourceExts: [...sourceExts, 'svg'],
		// Ignore transient native build artifacts that can disappear while Metro is watching.
		blockList: [
			/android[\\/]app[\/]\.cxx[\/].*/,
			/android[\\/]app[\/]build[\/].*/,
		],
	},
};

module.exports = mergeConfig(defaultConfig, config);
