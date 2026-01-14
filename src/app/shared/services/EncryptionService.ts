import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: "root"
})
export class EncryptionService {
  key: string = "z!!!!!!!1sdfadsf56adf456asdfasdf";
  appProperties = {
    VALUES: {
      KEY: "MTIzNDU2Nzg5MEFCQ0RFRkdISUpLTE1O",
      IV: "MTIzNDU2Nzg="
    }
  }

  constructor() {}

  encryptionAES (msg) {
    // Encrypt
    const ciphertext = CryptoJS.AES.encrypt(msg, 'secret key 123');
    return ciphertext.toString();
  }

  decryptionAES (msg) {
    // Decrypt
    const bytes  = CryptoJS.AES.decrypt(msg, 'secret key 123');
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }
}