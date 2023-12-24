import {Dimensions, StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import GlobalVariable from '../Assets/Styles/GlobalColor';

const {width, height} = Dimensions.get('window');

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
  },
  loginView: {
    marginHorizontal: '8%',
    marginTop: '12%',
    marginBottom: '5%',
  },
  loginText: {
    marginHorizontal: '3%',
    fontSize: RFPercentage(2.5),
    color: GlobalVariable.COLOR.BLACK,
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    marginTop: '10%',
  },
  noteView: {
    backgroundColor: GlobalVariable.COLOR.NOTE,
    borderRadius: 5,
    paddingVertical: 3,
    marginTop: '8%',
    marginBottom: '15%',
  },
  noteText: {
    marginHorizontal: '3%',
    fontSize: RFPercentage(2.1),
    color: GlobalVariable.COLOR.WHITE,
    fontFamily: 'Montserrat-Regular',
  },
  inputView: {
    flexDirection: 'row',
    borderRadius: 999,
    marginBottom: '6%',
    backgroundColor: GlobalVariable.COLOR.DROPDOWNBG,
    alignItems: 'center',
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    borderWidth: 1,
    borderColor: GlobalVariable.COLOR.NORMALGREY,
  },
  input: {
    width: '80%',
    marginLeft: '2.5%',
    fontSize: RFPercentage(2),
    fontFamily: 'Montserrat-Regular',
  },
  loginBtnTO: {
    paddingHorizontal: '3%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '20%',
    paddingVertical: '4.8%',
    borderRadius: 999,
    backgroundColor: GlobalVariable.COLOR.LOGINBTNBG,
    marginTop: '10%',
  },
  loginBtnText: {
    fontSize: RFPercentage(2.5),
    color: GlobalVariable.COLOR.WHITE,
    fontFamily: 'Montserrat-Regular',
  },
});

export default LoginStyles;
