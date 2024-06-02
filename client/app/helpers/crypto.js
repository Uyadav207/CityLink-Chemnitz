var CryptoJS = require('crypto-js');

// Encrypt User token
export const storeUserTokenInLocalStorage = (token) => {
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(token),
    'secret key cityLink'
  ).toString();
  localStorage.setItem('token', ciphertext);
};

export const storeUserDetailsInLocalStorage = (userData) => {
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(userData),
    'secret key cityLink'
  ).toString();
  localStorage.setItem('UserData', ciphertext);
};

export const getUserDetailsFromLocalStorage = () => {
  const ciphertext = localStorage.getItem('UserData');
  if (!ciphertext) {
    return false;
  } else {
    var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key cityLink');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (decryptedData) {
      return decryptedData;
    } else {
      return false;
    }
  }
};

// Decryption of User data
export const getUserTokenFromLocalStorage = () => {
  let ciphertext;
  if (typeof window !== 'undefined') {
    ciphertext = localStorage.getItem('token');
  }
  if (!ciphertext) {
    return false;
  } else {
    var bytes = CryptoJS.AES.decrypt(ciphertext, 'secret key cityLink');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (decryptedData) {
      return decryptedData;
    } else {
      return false;
    }
  }
};

export const removeUserDataFromLS = () => {
  localStorage.removeItem('UserData');
};
