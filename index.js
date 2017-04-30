var CryptoJS = require('crypto-js');
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');

function computeAddressFromPrivKey(privKey) {
  var keyPair = ec.genKeyPair();
  keyPair._importPrivate(privKey, 'hex');
  var compact = false;
  var pubKey = keyPair.getPublic(compact, 'hex').slice(2);
  var pubKeyWordArray = CryptoJS.enc.Hex.parse(pubKey);
  var hash = CryptoJS.SHA3(pubKeyWordArray, { outputLength: 256 });
  var address = hash.toString(CryptoJS.enc.Hex).slice(24);

  return address;
};

let privKey = process.argv[2];

console.log('Generated address: ', '0x' + computeAddressFromPrivKey(privKey))