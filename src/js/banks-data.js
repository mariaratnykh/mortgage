export {banks};
import {Bank} from './bank-class';

let gas = new Bank('Газпромбанк', '9', '10','src/img/gas.png', '3');
let vtb = new Bank('ВТБ', '8.9', '20', 'src/img/vtb.jpg', '2');
let sber = new Bank('Сбербанк России', '7.6', '15', 'src/img/sber.png', '1');
let open = new Bank('Открытие', '8.7', '10', 'src/img/open.jpeg', '8');

const banks = [gas, vtb, sber, open];