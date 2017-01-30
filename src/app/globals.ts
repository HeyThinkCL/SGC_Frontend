/**
 * Created by matias on 29-12-16.
 */
'use strict';

export let apiUrl: string = 'http://190.44.43.185:80';
// export let apiUrl: string = 'http://api.innovacolegio.cl:3000';

export let rolesDocentes = [
  {'rol':'profesor'},
  {'rol':'asistente'},
  {'rol':'jefeUTP'},
];

export let rolesNoDocentes = [
  {'rol':'director'},
  {'rol':'inspector'},
  {'rol':'psicopedagogo'},
  {'rol':'digitador'},
  {'rol':'secretario'},
];

export let countriesArray = JSON.parse('[{"nombre":"","flag":""},{"nombre":"Afganistán","flag":"flag-icon-af"},{"nombre":"Alandia","flag":"flag-icon-ax"},{"nombre":"Albania","flag":"flag-icon-al"},{"nombre":"Argelia","flag":"flag-icon-dz"},{"nombre":"Samoa Americana","flag":"flag-icon-as"},{"nombre":"Andorra","flag":"flag-icon-ad"},{"nombre":"Angola","flag":"flag-icon-ao"},{"nombre":"Anguilla","flag":"flag-icon-ai"},{"nombre":"Antártida","flag":"flag-icon-aq"},{"nombre":"Antigua y Barbuda","flag":"flag-icon-ag"},{"nombre":"Argentina","flag":"flag-icon-ar"},{"nombre":"Armenia","flag":"flag-icon-am"},{"nombre":"Aruba","flag":"flag-icon-aw"},{"nombre":"Australia","flag":"flag-icon-au"},{"nombre":"Austria","flag":"flag-icon-at"},{"nombre":"Azerbaiyán","flag":"flag-icon-az"},{"nombre":"Bahamas","flag":"flag-icon-bs"},{"nombre":"Bahrein","flag":"flag-icon-bh"},{"nombre":"Bangladesh","flag":"flag-icon-bd"},{"nombre":"Barbados","flag":"flag-icon-bb"},{"nombre":"Bielorrusia","flag":"flag-icon-by"},{"nombre":"Bélgica","flag":"flag-icon-be"},{"nombre":"Belice","flag":"flag-icon-bz"},{"nombre":"Benín","flag":"flag-icon-bj"},{"nombre":"Bermudas","flag":"flag-icon-bm"},{"nombre":"Bután","flag":"flag-icon-bt"},{"nombre":"Bolivia","flag":"flag-icon-bo"},{"nombre":"Bonaire","flag":"flag-icon-bq"},{"nombre":"Bosnia y Herzegovina","flag":"flag-icon-ba"},{"nombre":"Botswana","flag":"flag-icon-bw"},{"nombre":"Isla Bouvet","flag":"flag-icon-bv"},{"nombre":"Brasil","flag":"flag-icon-br"},{"nombre":"Territorio Británico del Océano Índico","flag":"flag-icon-io"},{"nombre":"Islas Ultramarinas Menores de Estados Unidos","flag":"flag-icon-um"},{"nombre":"Islas Vírgenes del Reino Unido","flag":"flag-icon-vg"},{"nombre":"Islas Vírgenes de los Estados Unidos","flag":"flag-icon-vi"},{"nombre":"Brunei","flag":"flag-icon-bn"},{"nombre":"Bulgaria","flag":"flag-icon-bg"},{"nombre":"Burkina Faso","flag":"flag-icon-bf"},{"nombre":"Burundi","flag":"flag-icon-bi"},{"nombre":"Camboya","flag":"flag-icon-kh"},{"nombre":"Camerún","flag":"flag-icon-cm"},{"nombre":"Canadá","flag":"flag-icon-ca"},{"nombre":"Cabo Verde","flag":"flag-icon-cv"},{"nombre":"Islas Caimán","flag":"flag-icon-ky"},{"nombre":"República Centroafricana","flag":"flag-icon-cf"},{"nombre":"Chad","flag":"flag-icon-td"},{"nombre":"Chile","flag":"flag-icon-cl"},{"nombre":"China","flag":"flag-icon-cn"},{"nombre":"Isla de Navidad","flag":"flag-icon-cx"},{"nombre":"Islas Cocos o Islas Keeling","flag":"flag-icon-cc"},{"nombre":"Colombia","flag":"flag-icon-co"},{"nombre":"Comoras","flag":"flag-icon-km"},{"nombre":"Congo","flag":"flag-icon-cg"},{"nombre":"Congo (Rep. Dem.)","flag":"flag-icon-cd"},{"nombre":"Islas Cook","flag":"flag-icon-ck"},{"nombre":"Costa Rica","flag":"flag-icon-cr"},{"nombre":"Croacia","flag":"flag-icon-hr"},{"nombre":"Cuba","flag":"flag-icon-cu"},{"nombre":"Curaçao","flag":"flag-icon-cw"},{"nombre":"Chipre","flag":"flag-icon-cy"},{"nombre":"República Checa","flag":"flag-icon-cz"},{"nombre":"Dinamarca","flag":"flag-icon-dk"},{"nombre":"Yibuti","flag":"flag-icon-dj"},{"nombre":"Dominica","flag":"flag-icon-dm"},{"nombre":"República Dominicana","flag":"flag-icon-do"},{"nombre":"Ecuador","flag":"flag-icon-ec"},{"nombre":"Egipto","flag":"flag-icon-eg"},{"nombre":"El Salvador","flag":"flag-icon-sv"},{"nombre":"Guinea Ecuatorial","flag":"flag-icon-gq"},{"nombre":"Eritrea","flag":"flag-icon-er"},{"nombre":"Estonia","flag":"flag-icon-ee"},{"nombre":"Etiopía","flag":"flag-icon-et"},{"nombre":"Islas Malvinas","flag":"flag-icon-fk"},{"nombre":"Islas Faroe","flag":"flag-icon-fo"},{"nombre":"Fiyi","flag":"flag-icon-fj"},{"nombre":"Finlandia","flag":"flag-icon-fi"},{"nombre":"Francia","flag":"flag-icon-fr"},{"nombre":"Guayana Francesa","flag":"flag-icon-gf"},{"nombre":"Polinesia Francesa","flag":"flag-icon-pf"},{"nombre":"Tierras Australes y Antárticas Francesas","flag":"flag-icon-tf"},{"nombre":"Gabón","flag":"flag-icon-ga"},{"nombre":"Gambia","flag":"flag-icon-gm"},{"nombre":"Georgia","flag":"flag-icon-ge"},{"nombre":"Alemania","flag":"flag-icon-de"},{"nombre":"Ghana","flag":"flag-icon-gh"},{"nombre":"Gibraltar","flag":"flag-icon-gi"},{"nombre":"Grecia","flag":"flag-icon-gr"},{"nombre":"Groenlandia","flag":"flag-icon-gl"},{"nombre":"Grenada","flag":"flag-icon-gd"},{"nombre":"Guadalupe","flag":"flag-icon-gp"},{"nombre":"Guam","flag":"flag-icon-gu"},{"nombre":"Guatemala","flag":"flag-icon-gt"},{"nombre":"Guernsey","flag":"flag-icon-gg"},{"nombre":"Guinea","flag":"flag-icon-gn"},{"nombre":"Guinea-Bisáu","flag":"flag-icon-gw"},{"nombre":"Guyana","flag":"flag-icon-gy"},{"nombre":"Haiti","flag":"flag-icon-ht"},{"nombre":"Islas Heard y McDonald","flag":"flag-icon-hm"},{"nombre":"Santa Sede","flag":"flag-icon-va"},{"nombre":"Honduras","flag":"flag-icon-hn"},{"nombre":"Hong Kong","flag":"flag-icon-hk"},{"nombre":"Hungría","flag":"flag-icon-hu"},{"nombre":"Islandia","flag":"flag-icon-is"},{"nombre":"India","flag":"flag-icon-in"},{"nombre":"Indonesia","flag":"flag-icon-id"},{"nombre":"Costa de Marfil","flag":"flag-icon-ci"},{"nombre":"Iran","flag":"flag-icon-ir"},{"nombre":"Irak","flag":"flag-icon-iq"},{"nombre":"Irlanda","flag":"flag-icon-ie"},{"nombre":"Isla de Man","flag":"flag-icon-im"},{"nombre":"Israel","flag":"flag-icon-il"},{"nombre":"Italia","flag":"flag-icon-it"},{"nombre":"Jamaica","flag":"flag-icon-jm"},{"nombre":"Japón","flag":"flag-icon-jp"},{"nombre":"Jersey","flag":"flag-icon-je"},{"nombre":"Jordania","flag":"flag-icon-jo"},{"nombre":"Kazajistán","flag":"flag-icon-kz"},{"nombre":"Kenia","flag":"flag-icon-ke"},{"nombre":"Kiribati","flag":"flag-icon-ki"},{"nombre":"Kuwait","flag":"flag-icon-kw"},{"nombre":"Kirguizistán","flag":"flag-icon-kg"},{"nombre":"Laos","flag":"flag-icon-la"},{"nombre":"Letonia","flag":"flag-icon-lv"},{"nombre":"Líbano","flag":"flag-icon-lb"},{"nombre":"Lesotho","flag":"flag-icon-ls"},{"nombre":"Liberia","flag":"flag-icon-lr"},{"nombre":"Libia","flag":"flag-icon-ly"},{"nombre":"Liechtenstein","flag":"flag-icon-li"},{"nombre":"Lituania","flag":"flag-icon-lt"},{"nombre":"Luxemburgo","flag":"flag-icon-lu"},{"nombre":"Macao","flag":"flag-icon-mo"},{"nombre":"Macedonia","flag":"flag-icon-mk"},{"nombre":"Madagascar","flag":"flag-icon-mg"},{"nombre":"Malawi","flag":"flag-icon-mw"},{"nombre":"Malasia","flag":"flag-icon-my"},{"nombre":"Maldivas","flag":"flag-icon-mv"},{"nombre":"Mali","flag":"flag-icon-ml"},{"nombre":"Malta","flag":"flag-icon-mt"},{"nombre":"Islas Marshall","flag":"flag-icon-mh"},{"nombre":"Martinica","flag":"flag-icon-mq"},{"nombre":"Mauritania","flag":"flag-icon-mr"},{"nombre":"Mauricio","flag":"flag-icon-mu"},{"nombre":"Mayotte","flag":"flag-icon-yt"},{"nombre":"México","flag":"flag-icon-mx"},{"nombre":"Micronesia","flag":"flag-icon-fm"},{"nombre":"Moldavia","flag":"flag-icon-md"},{"nombre":"Mónaco","flag":"flag-icon-mc"},{"nombre":"Mongolia","flag":"flag-icon-mn"},{"nombre":"Montenegro","flag":"flag-icon-me"},{"nombre":"Montserrat","flag":"flag-icon-ms"},{"nombre":"Marruecos","flag":"flag-icon-ma"},{"nombre":"Mozambique","flag":"flag-icon-mz"},{"nombre":"Myanmar","flag":"flag-icon-mm"},{"nombre":"Namibia","flag":"flag-icon-na"},{"nombre":"Nauru","flag":"flag-icon-nr"},{"nombre":"Nepal","flag":"flag-icon-np"},{"nombre":"Países Bajos","flag":"flag-icon-nl"},{"nombre":"Nueva Caledonia","flag":"flag-icon-nc"},{"nombre":"Nueva Zelanda","flag":"flag-icon-nz"},{"nombre":"Nicaragua","flag":"flag-icon-ni"},{"nombre":"Níger","flag":"flag-icon-ne"},{"nombre":"Nigeria","flag":"flag-icon-ng"},{"nombre":"Niue","flag":"flag-icon-nu"},{"nombre":"Isla de Norfolk","flag":"flag-icon-nf"},{"nombre":"Corea del Norte","flag":"flag-icon-kp"},{"nombre":"Islas Marianas del Norte","flag":"flag-icon-mp"},{"nombre":"Noruega","flag":"flag-icon-no"},{"nombre":"Omán","flag":"flag-icon-om"},{"nombre":"Pakistán","flag":"flag-icon-pk"},{"nombre":"Palau","flag":"flag-icon-pw"},{"nombre":"Palestina","flag":"flag-icon-ps"},{"nombre":"Panamá","flag":"flag-icon-pa"},{"nombre":"Papúa Nueva Guinea","flag":"flag-icon-pg"},{"nombre":"Paraguay","flag":"flag-icon-py"},{"nombre":"Perú","flag":"flag-icon-pe"},{"nombre":"Filipinas","flag":"flag-icon-ph"},{"nombre":"Islas Pitcairn","flag":"flag-icon-pn"},{"nombre":"Polonia","flag":"flag-icon-pl"},{"nombre":"Portugal","flag":"flag-icon-pt"},{"nombre":"Puerto Rico","flag":"flag-icon-pr"},{"nombre":"Catar","flag":"flag-icon-qa"},{"nombre":"Kosovo","flag":"flag-icon-xk"},{"nombre":"Reunión","flag":"flag-icon-re"},{"nombre":"Rumania","flag":"flag-icon-ro"},{"nombre":"Rusia","flag":"flag-icon-ru"},{"nombre":"Ruanda","flag":"flag-icon-rw"},{"nombre":"San Bartolomé","flag":"flag-icon-bl"},{"nombre":"Santa Helena","flag":"flag-icon-sh"},{"nombre":"San Cristóbal y Nieves","flag":"flag-icon-kn"},{"nombre":"Santa Lucía","flag":"flag-icon-lc"},{"nombre":"Saint Martin","flag":"flag-icon-mf"},{"nombre":"San Pedro y Miquelón","flag":"flag-icon-pm"},{"nombre":"San Vicente y Granadinas","flag":"flag-icon-vc"},{"nombre":"Samoa","flag":"flag-icon-ws"},{"nombre":"San Marino","flag":"flag-icon-sm"},{"nombre":"Santo Tomé y Príncipe","flag":"flag-icon-st"},{"nombre":"Arabia Saudí","flag":"flag-icon-sa"},{"nombre":"Senegal","flag":"flag-icon-sn"},{"nombre":"Serbia","flag":"flag-icon-rs"},{"nombre":"Seychelles","flag":"flag-icon-sc"},{"nombre":"Sierra Leone","flag":"flag-icon-sl"},{"nombre":"Singapur","flag":"flag-icon-sg"},{"nombre":"Sint Maarten","flag":"flag-icon-sx"},{"nombre":"República Eslovaca","flag":"flag-icon-sk"},{"nombre":"Eslovenia","flag":"flag-icon-si"},{"nombre":"Islas Salomón","flag":"flag-icon-sb"},{"nombre":"Somalia","flag":"flag-icon-so"},{"nombre":"República de Sudáfrica","flag":"flag-icon-za"},{"nombre":"Islas Georgias del Sur y Sandwich del Sur","flag":"flag-icon-gs"},{"nombre":"Corea del Sur","flag":"flag-icon-kr"},{"nombre":"Sudán del Sur","flag":"flag-icon-ss"},{"nombre":"España","flag":"flag-icon-es"},{"nombre":"Sri Lanka","flag":"flag-icon-lk"},{"nombre":"Sudán","flag":"flag-icon-sd"},{"nombre":"Surinam","flag":"flag-icon-sr"},{"nombre":"Islas Svalbard y Jan Mayen","flag":"flag-icon-sj"},{"nombre":"Suazilandia","flag":"flag-icon-sz"},{"nombre":"Suecia","flag":"flag-icon-se"},{"nombre":"Suiza","flag":"flag-icon-ch"},{"nombre":"Siria","flag":"flag-icon-sy"},{"nombre":"Taiwán","flag":"flag-icon-tw"},{"nombre":"Tayikistán","flag":"flag-icon-tj"},{"nombre":"Tanzania","flag":"flag-icon-tz"},{"nombre":"Tailandia","flag":"flag-icon-th"},{"nombre":"Timor Oriental","flag":"flag-icon-tl"},{"nombre":"Togo","flag":"flag-icon-tg"},{"nombre":"Islas Tokelau","flag":"flag-icon-tk"},{"nombre":"Tonga","flag":"flag-icon-to"},{"nombre":"Trinidad y Tobago","flag":"flag-icon-tt"},{"nombre":"Túnez","flag":"flag-icon-tn"},{"nombre":"Turquía","flag":"flag-icon-tr"},{"nombre":"Turkmenistán","flag":"flag-icon-tm"},{"nombre":"Islas Turks y Caicos","flag":"flag-icon-tc"},{"nombre":"Tuvalu","flag":"flag-icon-tv"},{"nombre":"Uganda","flag":"flag-icon-ug"},{"nombre":"Ucrania","flag":"flag-icon-ua"},{"nombre":"Emiratos Árabes Unidos","flag":"flag-icon-ae"},{"nombre":"Reino Unido","flag":"flag-icon-gb"},{"nombre":"Estados Unidos","flag":"flag-icon-us"},{"nombre":"Uruguay","flag":"flag-icon-uy"},{"nombre":"Uzbekistán","flag":"flag-icon-uz"},{"nombre":"Vanuatu","flag":"flag-icon-vu"},{"nombre":"Venezuela","flag":"flag-icon-ve"},{"nombre":"Vietnam","flag":"flag-icon-vn"},{"nombre":"Wallis y Futuna","flag":"flag-icon-wf"},{"nombre":"Sahara Occidental","flag":"flag-icon-eh"},{"nombre":"Yemen","flag":"flag-icon-ye"},{"nombre":"Zambia","flag":"flag-icon-zm"},{"nombre":"Zimbabue","flag":"flag-icon-zw"}]')
