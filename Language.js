import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
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
    },
    Search: {
        en: { Search: 'Search' },
        tr: { Search: 'Arama' },
    },
    Person: {
        en: { Person: 'Person' },
        tr: { Person: 'Kişiler' },
    },
    Phone: {
        en: { Phone: 'Phone' },
        tr: { Phone: 'Telefon' },
    },
    Address: {
        en: { Address: 'Address' },
        tr: { Address: 'Adres' },
    },
    About: {
        en: { About: 'About' },
        tr: { About: 'Hakkında' },
    },
    DocName: {
        en: { DocName: 'Document Name' },
        tr: { DocName: 'Belge Adı' },
    },
    Detail: {
        en: { Detail: 'Detail' },
        tr: { Detail: 'Detay' },
    },
    Companies: {
        en: { Companies: 'Companies' },
        tr: { Companies: 'Firmalar' },
    },
    TouchForSearch: {
        en: { TouchForSearch: 'Touch For Search' },
        tr: { TouchForSearch: 'Aramak için Dokun' },
    },
    EnterCompanyName: {
        en: { EnterCompanyName: 'Enter campany name for find' },
        tr: { EnterCompanyName: 'Aramak istediğiniz firmanın ismini giriniz' },
    },
    CertificateAndReport: {
        en: { CertificateAndReport: 'Certificates And Reports' },
        tr: { CertificateAndReport: 'Sertifika Ve Raporlar' },
    },
    Name: {
        en: { Name: 'Name' },
        tr: { Name: 'İsim' },
    },
    Job: {
        en: { Job: 'Job' },
        tr: { Job: 'Meslek' },
    },
    ProductCompany: {
        en: { ProductCompany: 'Product Company' },
        tr: { ProductCompany: 'Üretici Firma' },
    },
    NoResult: {
        en: { NoResult: 'No Result' },
        tr: { NoResult: 'Kayıt Bulunamadı' },
    },
    Find: {
        en: { Find: 'Find' },
        tr: { Find: 'Ara' },
    },
    Products: {
        en: { Products: 'Ürünler' },
        tr: { Products: 'Ürünler' },
    }, SearchByName: {
        en: { SearchByName: 'Search By Name' },
        tr: { SearchByName: 'Ad Soyad Ara' },
    }, EnterNameForSearch: {
        en: { EnterNameForSearch: 'Entar Person Name For Search' },
        tr: { EnterNameForSearch: 'Kişi Adı Soyadı İle Arama' },
    },
    EnterProductNameForSearch: {
        en: { EnterProductNameForSearch: 'Entar Product Name For Search' },
        tr: { EnterProductNameForSearch: 'Ürün Adı Girerek Arama ' },
    },
    ProductName: {
        en: { ProductName: 'Product Name' },
        tr: { ProductName: 'Ürün Adı ' },
    },
    StartDate: {
        en: { StartDate: 'Start Date' },
        tr: { StartDate: 'Başlangıç' },
    },
    EndDate: {
        en: { EndDate: 'End Date' },
        tr: { EndDate: 'Bitiş' },
    }


};
let lnconf=""

AsyncStorage.getItem("language").then(x => {
    if (x != null) {
        lnconf = x
    } else {

        lnconf = Localization.locale;

    }
})
//   var ss =await AsyncStorage.getItem("language")
const LangApp = (word) => {

    var dd = LGWord[word]
    var ln = new I18n(dd);

     ln.locale = lnconf;
    
    // Set the locale once at the beginning of your app.


    // if(dd!=null){
    //     ln.locale = dd
    // }



    // When a value is missing from a language it'll fallback to another language with the key present.
    ln.enableFallback = true;
    return ln.t(word)
}


export default LangApp