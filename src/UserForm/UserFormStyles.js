import {Dimensions, StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import GlobalVariable from '../Assets/Styles/GlobalColor';

const {width, height} = Dimensions.get('window');

const UserFormStyles = StyleSheet.create({
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
  appBarBackTO: {
    position: 'absolute',
    left: '5%',
  },
  appBarText: {
    color: GlobalVariable.COLOR.WHITE,
    textAlign: 'center',
    fontSize: RFPercentage(2.7),
    fontFamily: 'Montserrat-Bold',
  },
  profileImageView: {
    alignSelf: 'center',
    marginTop: '5%',
  },
  profileImage: {
    height: wp('30%'),
    width: wp('30%'),
    resizeMode: 'contain',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: GlobalVariable.COLOR.CCC,
  },
  profileCamera: {
    position: 'absolute',
    right: '-5%',
    bottom: '10%',
  },
  rbSheetView: {
    paddingVertical: '3%',
    paddingHorizontal: '8%',
  },
  rbSheetTO: {
    marginVertical: '3%',
  },
  rbSheetLG: {
    paddingVertical: '3%',
    borderRadius: 10,
    alignItems: 'center',
  },
  rbSheetText: {
    fontSize: RFPercentage(2.1),
    fontFamily: 'Montserrat-Bold',
    color: GlobalVariable.COLOR.WHITE,
  },
  inputName: {
    width: width / 1.2,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: '5%',
    paddingHorizontal: 15,
    fontSize: RFPercentage(2.1),
    alignSelf: 'center',
    fontFamily: 'Montserrat-Regular',
    backgroundColor: GlobalVariable.COLOR.EFEFEF,
    borderColor: GlobalVariable.COLOR.BORDER,
  },
  genderMainView: {
    flex: 1,
    width: width / 1.2,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: '5%',
    alignSelf: 'center',
    paddingVertical: '1.5%',
    backgroundColor: GlobalVariable.COLOR.EFEFEF,
    borderColor: GlobalVariable.COLOR.BORDER,
  },
  genderView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderMaleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '5%',
  },
  genderMaleText: {
    fontSize: RFPercentage(2.1),
    fontFamily: 'Montserrat-Regular',
    color: GlobalVariable.COLOR.BLACK,
  },
  genderFemaleView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 3,
  },
  dropdownView: {
    alignSelf: 'center',
    width: width / 1.2,
  },
  dropdown: {
    height: wp('13%'),
    width: width / 1.2,
    backgroundColor: GlobalVariable.COLOR.EFEFEF,
    borderColor: GlobalVariable.COLOR.BORDER,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: '5%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  placeholderStyle: {
    fontSize: RFPercentage(2.2),
    color: GlobalVariable.COLOR.BLACK,
    fontFamily: 'Montserrat-Regular',
  },
  selectedTextStyle: {
    fontSize: RFPercentage(1.8),
    color: GlobalVariable.COLOR.BLACK,
    fontFamily: 'Montserrat-Regular',
  },
  iconStyle: {
    tintColor: GlobalVariable.COLOR.BLACK,
  },
  itemTextStyle: {
    color: GlobalVariable.COLOR.BLACK,
    fontFamily: 'Montserrat-Regular',
    fontSize: RFPercentage(2.1),
  },
  selectedStyle: {
    borderRadius: 8,
  },
  createBtnTO: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '3%',
    backgroundColor: GlobalVariable.COLOR.APPBAR,
    marginTop: '5%',
    width: width / 1.2,
    alignSelf: 'center',
    borderRadius: 8,
  },
  createBtnText: {
    color: GlobalVariable.COLOR.WHITE,
    fontSize: RFPercentage(2.7),
    fontFamily: 'Montserrat-Regular',
  },
});

export default UserFormStyles;
