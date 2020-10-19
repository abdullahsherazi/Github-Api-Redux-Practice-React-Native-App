import React, {PureComponent} from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Keyboard,
  Linking,
  Alert,
} from 'react-native';
import GlobalHeader from '../components/GlobalHeader';
import colors from '../constants/colors';
import globalStyling from '../constants/globalStyling';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

class Home extends PureComponent {
  state = {
    searchVal: '',
    imageLoaded: false,
    followersModel: false,
  };

  search = () => {
    Keyboard.dismiss();
    if (this.state.searchVal.length > 0)
      this.props.reduxActions.search(
        this.props.navigation,
        this.state.searchVal,
      );
    else {
      Alert.alert('', 'Kindly Write Some Name To Search', [{text: 'OK'}], {
        cancelable: false,
      });
    }
  };
  renderFlatlist = ({item, index, separators}) => (
    <View style={[styles.touchableOpacityContainer, {marginTop: 10}]}>
      <View style={[styles.imageView]}>
        <Image
          source={{uri: item.avatar_url}}
          style={globalStyling.imageStyle}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.name}>{item.login}</Text>
      <Text
        style={[
          styles.name,
          {color: colors.facebookBlue, textDecorationLine: 'underline'},
        ]}>
        Github Url: {item.html_url}
      </Text>
    </View>
  );
  render() {
    return (
      <View style={globalStyling.container}>
        <GlobalHeader navigation={this.props.navigation} headingText="Search" />

        <View style={styles.searchView}>
          <TextInput
            placeholder="Search"
            style={styles.textInput}
            onChangeText={(searchVal) => {
              this.setState({searchVal});
            }}
          />
          <TouchableOpacity
            onPress={() => this.search()}
            style={styles.searchIconView}>
            <Image
              source={require('../assets/images/searchIcon.png')}
              style={globalStyling.imageStyle}
            />
          </TouchableOpacity>
        </View>
        {Object.keys(this.props.reduxState.userdata).length > 0 ? (
          <TouchableOpacity
            style={styles.touchableOpacityContainer}
            onPress={() => {
              if (this.props.reduxState.userdata.followers > 0)
                this.props.reduxActions.searchFollowers(
                  this.props.reduxState.userdata.followers_url,
                  () => {
                    this.setState({followersModel: true});
                  },
                );
              else {
                Alert.alert(
                  '',
                  "This person doesn't have followers",
                  [{text: 'OK'}],
                  {
                    cancelable: false,
                  },
                );
              }
            }}>
            <View
              style={[
                styles.imageView,
                this.state.imageLoaded === false
                  ? {backgroundColor: colors.greyColor}
                  : null,
              ]}>
              <Image
                source={{uri: this.props.reduxState.userdata.avatar_url}}
                style={globalStyling.imageStyle}
                resizeMode="contain"
                onLoad={() => {
                  this.setState({imageLoaded: true});
                }}
              />
            </View>
            <Text style={styles.name}>
              {this.props.reduxState.userdata.name}
            </Text>
            <Text
              style={[
                styles.name,
                {color: colors.facebookBlue, textDecorationLine: 'underline'},
              ]}
              onPress={() => {
                Linking.openURL(this.props.reduxState.userdata.html_url);
              }}>
              Github Url: {this.props.reduxState.userdata.html_url}
            </Text>
          </TouchableOpacity>
        ) : null}

        <Modal
          onBackButtonPress={() => {
            this.setState({followersModel: false});
          }}
          isVisible={this.state.followersModel}>
          <View style={styles.followersModelView}>
            <Text style={[styles.name, {width: '70%'}]}>
              {this.props.reduxState.userdata.name} Followers(
              {this.props.reduxState.followers.length})
            </Text>
            <FlatList
              renderItem={this.renderFlatlist}
              data={this.props.reduxState.followers}
              removeClippedSubviews={true}
              keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity
              style={styles.crossView}
              onPress={() => {
                this.setState({followersModel: false});
              }}>
              <Image
                source={require('../assets/images/cross.png')}
                style={[globalStyling.imageStyle]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  crossView: {
    width: 40,
    height: 40,
    right: 5,
    top: 5,
    position: 'absolute',

    overflow: 'hidden',
  },
  followersModelView: {
    height: '90%',
    width: '95%',
    backgroundColor: colors.whiteColor,
    alignSelf: 'center',
    marginTop: '5%',
    borderRadius: 10,
    paddingBottom: 10,
  },
  touchableOpacityContainer: {
    width: 150,
    alignSelf: 'center',
    marginTop: 50,
    borderWidth: 1,
    borderRadius: 5,
  },
  imageView: {
    height: 100,
    width: '100%',
    overflow: 'hidden',
    borderBottomWidth: 1,
    marginVertical: 5,
    paddingBottom: 5,
  },
  name: {alignSelf: 'center', marginVertical: 5, textAlign: 'center'},
  searchView: {
    paddingVertical: Platform.OS === 'ios' ? 10 : null,
    borderRadius: 10,
    borderColor: colors.greyTextColor,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  textInput: {width: '90%'},
  searchIconView: {height: 25, width: 25, overflow: 'hidden'},
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
