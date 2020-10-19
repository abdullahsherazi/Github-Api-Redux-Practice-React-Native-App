import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  TextInput,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import colors from '../constants/colors';
import globalStyling from '../constants/globalStyling';
import {bindActionCreators} from 'redux';
import * as reduxActions from '../redux/actions/actions';
import {connect} from 'react-redux';
const screenWidth = Dimensions.get('window').width;
import i18n from '../constants/languages';
import ProductCard from '../components/ProductCard';
import GlobalHeader from '../components/GlobalHeader';
import {RTL} from 'react-native-easy-localization-and-rtl';
import Fontisto from 'react-native-vector-icons/Fontisto';

class Search extends Component {
  state = {
    initialSearch: false,
    searchVal: '',
  };
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      global.showBottomTab(true).then(() => {
        global.setFocused('search');
      });
      this.setState({initialSearch: false});
    });
    this.props.reduxActions.clearSearchItems();
  }
  componentWillUnmount() {
    this._unsubscribe();
  }
  renderItem = ({item, index, separators}) => (
    <ProductCard
      onsubmit={() =>
        this.props.navigation.navigate('ProductPage', {
          data: item.id,
        })
      }
      // image={item.images[0].src}
      image={item.images.length > 0 ? item.images[0] : null}
      regularPrices={item.regular_price}
      price={item.price}
      name={item.name}
      item={item}
      navigation={this.props.navigation}
    />
  );
  handleTextChange = () => {
    Keyboard.dismiss();
    if (this.state.initialSearch === false) {
      this.setState({initialSearch: true});
    }
    if (this.state.searchVal.length > 0)
      this.props.reduxActions.search(
        this.props.navigation,
        this.state.searchVal[0],
      );
    else {
      Alert.alert('', 'Kindly Write Some Item To Search', [{text: 'OK'}], {
        cancelable: false,
      });
    }
  };
  render() {
    const RTLStyles = RTL.getSheet(i18n);
    return (
      <View style={globalStyling.container}>
        <GlobalHeader
          navigation={this.props.navigation}
          backArrow={true}
          appIcon={true}
          cart={true}
          // menu={true}
        />

        <View style={styles.searchView}>
          <TextInput
            placeholder="Search"
            style={styles.textInput}
            onChangeText={(searchVal) => {
              // if (
              //   searchVal.length === 0 &&
              //   this.props.reduxState.searchProd.length === 0
              // ) {
              //   this.handleTextChange(searchVal);
              //   Keyboard.dismiss();
              // }
              this.setState({searchVal});
            }}
          />
          <TouchableOpacity
            onPress={() => this.handleTextChange()}
            style={styles.imageView}>
            <Fontisto name="search" size={25} color={colors.blackColor} />
          </TouchableOpacity>
        </View>

        {this.props.reduxState.loading ? null : this.state.initialSearch ===
            false || this.state.searchVal.length === 0 ? (
          <View style={styles.containerView}>
            <View style={styles.searchImageView}>
              <Image
                source={require('../assets/images/searchIcon.png')}
                resizeMode="contain"
                style={globalStyling.imageStyle}
              />
            </View>
          </View>
        ) : this.props.reduxState.searchProd.length === 0 ? (
          <View style={styles.containerView}>
            <Text style={globalStyling.errorText}>
              {i18n.productsDoesntExist}
            </Text>
          </View>
        ) : (
          <FlatList
            style={globalStyling.flatlist}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={[
              styles.columnWrapperStyleFlatlist,
              RTLStyles.containerRow,
            ]}
            renderItem={this.renderItem}
            data={this.props.reduxState.searchProd}
            inverted={
              this.props.reduxState.language.languageCode === 'ar'
                ? true
                : false
            }
            // numColumns={screenWidth < 500 ? 3 : 4}
            numColumns={2}
            removeClippedSubviews={true}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
  imageView: {height: 25, width: 25, overflow: 'hidden'},
  containerView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  columnWrapperStyleFlatlist: {
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  flatlist: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  searchImageView: {
    height: 50,
    width: 50,
    overflow: 'hidden',
  },
});

const mapStateToProps = (state) => ({
  reduxState: state.reducers,
});

const mapDispatchToProps = (dispatch) => ({
  reduxActions: bindActionCreators(reduxActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
