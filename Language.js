import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

export const LGWord = {
    Email: {
        en: { Email: 'Email' },
        tr: { Email: 'Eposta' },
    },
 Password: {
        en: { Password: 'Password' },
        tr: { Password: 'Parola' },
    }, 
    Emailcantbeempty: {
        en: { Emailcantbeempty: 'Email can`t be empty.' },
        tr: { Emailcantbeempty: 'Eposta boş olamaz' },
    },
    Passwordcantbeempty: {
        en: { Passwordcantbeempty: 'Password can`t be empty.' },
        tr: { Passwordcantbeempty: 'Parola boş olamaz' },
    },
    Login: {
        en: { Login: 'Login' },
        tr: { Login: 'Giriş' },
    },
    PressForDetail: {
        en: { PressForDetail: 'Pres For Detail' },
        tr: { PressForDetail: 'Detay İçin Dokunun' },
    },
    ExpireDate: {
        en: { ExpireDate: 'Expire Date' },
        tr: { ExpireDate: 'Geçerlilik Tarihi' },
    },
    DocumentDate: {
        en: { DocumentDate: 'Document Date' },
        tr: { DocumentDate: 'Döküman Tarihi' },
    },
    Report: {
        en: { Report: 'Report' },
        tr: { Report: 'Rapor' },
    },
    Certificate: {
        en: { Certificate: 'Certificate' },
        tr: { Certificate: 'Sertifika' },
    },
    DocumentNo: {
        en: { DocumentNo: 'Documnet No' },
        tr: { DocumentNo: 'Dömüman No' },
    },
    Attachments: {
        en: { Attachments: 'Attachments' },
        tr: { Attachments: 'Dosya Ekleri' },
    },
    Download: {
        en: { Download: 'Download' },
        tr: { Download: 'İndir' },
    }


};

const LangApp =(word)=>{ 
    
    var dd=LGWord[word]
    
    var ln=new I18n(dd);

// Set the locale once at the beginning of your app.
ln.locale = Localization.locale;


// When a value is missing from a language it'll fallback to another language with the key present.
ln.enableFallback = true;
return ln.t(word)
} 
export default LangApp