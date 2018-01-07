import '../scss/index.scss'

import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';

setTimeout(function () {
    $('h1').text('Индекс');
}, 2000);

$(() => {
    $('select').select2();
});