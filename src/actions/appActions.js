import ACTIONS from '../constants/actions';

export const configLoaded = (config) => {
	return {
		type: ACTIONS.CONFIG_LOADED,
		config: config
	}
}