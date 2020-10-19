import * as actionTypes from './types';
import {CommonActions} from '@react-navigation/native';
import axios from 'axios';
import {server} from '../../constants/config';
import {Alert} from 'react-native';

export const search = (navigation, userdata) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_USER_DATA,
    payload: {},
  });
  dispatch({
    type: actionTypes.SET_FOLLOWERS,
    payload: [],
  });
  dispatch({type: actionTypes.START_LOADING});
  axios
    .get(`${server}/${userdata}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: actionTypes.SET_USER_DATA,
          payload: res.data,
        });
        dispatch({type: actionTypes.STOP_LOADING});
      } else {
        dispatch({type: actionTypes.STOP_LOADING});
        Alert.alert(
          '',
          'Some problem occured while getting user data, Try again',
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
      }
    })
    .catch((err) => {
      dispatch({type: actionTypes.STOP_LOADING});
      if (err.response.status === 404) {
        Alert.alert('', "Userdata Doesn't Exist", [{text: 'OK'}], {
          cancelable: false,
        });
      } else
        Alert.alert(
          '',
          'Some problem occured while getting user data, Try again',
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
    });
};

export const searchFollowers = (url, openFollowersModel) => async (
  dispatch,
) => {
  dispatch({
    type: actionTypes.SET_FOLLOWERS,
    payload: [],
  });
  dispatch({type: actionTypes.START_LOADING});
  axios
    .get(`${url}`)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: actionTypes.SET_FOLLOWERS,
          payload: res.data,
        });
        dispatch({type: actionTypes.STOP_LOADING});
        openFollowersModel();
      } else {
        dispatch({type: actionTypes.STOP_LOADING});
        Alert.alert(
          '',
          'Some problem occured while getting followers data, Try again',
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
      }
    })
    .catch(() => {
      dispatch({type: actionTypes.STOP_LOADING});
      Alert.alert(
        '',
        'Some problem occured while getting followers data, Try again',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
    });
};
