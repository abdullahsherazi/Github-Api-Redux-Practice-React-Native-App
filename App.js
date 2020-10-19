import React from 'react';
import {StatusBar, View, Text} from 'react-native';
import StackNavigator from './src/navigations/StackNavigator';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Loader from './src/components/Loader';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyling from './src/constants/globalStyling';
import colors from './src/constants/colors';

export default class App extends React.Component {
  state = {appContainerColor: 'white'};

  componentDidMount() {
    if (Text.defaultProps == null) Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;

    global.setAppContainerColor = (appContainerColor) => {
      this.setState({
        appContainerColor,
      });
    };
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={colors.themeColor}
          translucent={true}
        />
        <SafeAreaView
          style={
            this.state.appContainerColor === 'white'
              ? globalStyling.appContainerWhite
              : globalStyling.appContainerThemeColor
          }>
          <View style={globalStyling.appContainerView}>
            <StackNavigator />
            <Loader />
          </View>
        </SafeAreaView>
      </Provider>
    );
  }
}
