import "@babel/polyfill";

import showProducts from "./modules/showProducts";
import togglePopUp from './modules/togglePopUp';
import accordion from './modules/accordion';
import calc from './modules/calc';
import sendForm from './modules/sendForms';
import { form1, form2 } from './modules/sendForms';
import sendObj from './modules/sendObj';
import sendFormConc from './modules/sendFormconc';

//PopUp
togglePopUp();

//showProducts
showProducts();

//Accordion
accordion();

//Калькулятор
calc();

//sendForms
sendForm(form1);
sendForm(form2);
