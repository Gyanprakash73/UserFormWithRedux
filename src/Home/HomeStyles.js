import {Dimensions, StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import GlobalVariable from '../Assets/Styles/GlobalColor';

const {width, height} = Dimensions.get('window');

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalVariable.COLOR.WHITE,
  },
  appBarView: {
    width: '100%',
    backgroundColor: GlobalVariable.COLOR.APPBAR,
    paddingVertical: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  appBarText: {
    color: GlobalVariable.COLOR.WHITE,
    textAlign: 'center',
    fontSize: RFPercentage(2.7),
    fontFamily: 'Montserrat-Bold',
  },
  logoutTO: {
    position: 'absolute',
    right: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  createBtnTO: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
    backgroundColor: GlobalVariable.COLOR.APPBAR,
  },
  createBtnText: {
    color: GlobalVariable.COLOR.WHITE,
    fontSize: RFPercentage(2.7),
    fontFamily: 'Montserrat-Regular',
  },
  emptyImage: {
    width: '50%',
    height: '50%',
    alignSelf: 'center',
    marginTop: '10%',
  },
  itemView: {
    backgroundColor: GlobalVariable.COLOR.EFEFEF,
    marginVertical: '2%',
    marginHorizontal: '1%',
    borderRadius: 8,
  },
  itemInnerView: {
    flexDirection: 'row',
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    alignItems: 'center',
  },
  image: {
    width: wp('22%'),
    height: wp('22%'),
    borderRadius: 999,
  },
  leftItemView: {
    width: wp('25%'),
  },
  rightItemView: {
    width: wp('75%'),
  },
  titleText: {
    fontSize: RFPercentage(2.4),
    color: GlobalVariable.COLOR.BLACK,
    fontFamily: 'Montserrat-Bold',
    width: wp('70%'),
  },
  rightText: {
    fontSize: RFPercentage(2),
    color: GlobalVariable.COLOR.BLACK,
    fontFamily: 'Montserrat-Regular',
  },
  itemInnerView1: {
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    flexDirection: 'row',
  },
  titleText1: {
    fontSize: RFPercentage(2.4),
    color: GlobalVariable.COLOR.BLACK,
    fontFamily: 'Montserrat-Bold',
    width: wp('80%'),
  },
  deleteIconView: {
    alignItems: 'center',
    paddingLeft: '3%',
  },
});

export default HomeStyles;
