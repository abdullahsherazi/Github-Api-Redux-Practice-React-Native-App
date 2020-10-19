import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Header, Body, Left, Right} from 'native-base';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';
import fontSizes from '../constants/fontSizes';

class GlobalHeader extends Component {
  render() {
    return (
      <Header
        style={styles.header}
        androidStatusBarColor={colors.themeColor}
        iosBarStyle="light-content">
        <Left style={styles.left}>
          {this.props.backArrow ? (
            <TouchableOpacity
              style={styles.arrowView}
              onPress={() => this.props.navigation.goBack()}>
              <MaterialCommunityIcons
                name={'keyboard-backspace'}
                size={25}
                color={colors.blackColor}
              />
            </TouchableOpacity>
          ) : null}
        </Left>
        <Body style={styles.body}>
          <Text style={styles.text}>
            {this.props.headingText ? this.props.headingText : null}
          </Text>
        </Body>

        <Right style={styles.right}></Right>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  appIconImage: {
    width: '100%',
    height: '100%',
  },
  left: {flex: 1},
  body: {
    flex: 1,
  },
  right: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.transparent,
    elevation: 0,
    borderBottomWidth: 0,
  },
  arrowView: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSizes.normal,
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);
