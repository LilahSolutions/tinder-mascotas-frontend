import TabNavigator from './TabNavigator';

export default TabNavigator;

export const PetsTabNavigator = (props) => (
	<TabNavigator {...props} screen="pets" />
);
export const MatchTabNavigator = (props) => (
	<TabNavigator {...props} screen="match" />
);
export const ProfileTabNavigator = (props) => (
	<TabNavigator {...props} screen="profile" />
);
