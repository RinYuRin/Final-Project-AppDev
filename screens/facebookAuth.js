import { auth } from '../firebaseConfig';
import { FacebookAuthProvider } from '@react-native-firebase/auth';

const facebookAuthProvider = new FacebookAuthProvider();

const handleFacebookLogin = async () => {
  try {
    const result = await auth.signInWithPopup(facebookAuthProvider);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export { handleFacebookLogin };