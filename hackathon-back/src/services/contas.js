'use strict'

var Nightmare = require('nightmare');

const ENDPOINT = 'https://www.aeseletropaulo.com.br/mobile/servicos/login?args=48E1EC4A7C8200A7BA64C2876D52E93B8AE3BB67C76FBB592A01EDE9F0458A13'
const NUM_INSCRICAO_INPUT = '#ctl00_PlaceHolderMain_controle_txtNumeroInstalacao'
const CPF_INPUT = '#ctl00_PlaceHolderMain_controle_txtCpfCnpj'
const ENVIAR_BUTTON = '#ctl00_PlaceHolderMain_controle_btnEnviar'

const INFO_TABLE = '#ctl00_PlaceHolderMain_controle_pnlVizualizarFaturas'

/**
 * @param numInscricao
 * @param cpf
 * @return A promise contains an array of object, include (valor, mes, situacao)
 * 
 * Usage eg.
 * contas.getEletropauloData('1115639497', '42152477553').then(x => //do something).catch(x => //error report)
 */
function getEletropauloData(numInscricao, cpf){
  let nightmare = Nightmare({ show: false});

  return nightmare
    .goto(ENDPOINT)
    .wait(NUM_INSCRICAO_INPUT)
    .insert(NUM_INSCRICAO_INPUT, numInscricao)
    .insert(CPF_INPUT, cpf)
    .click(ENVIAR_BUTTON)
    .wait(INFO_TABLE)
    .evaluate(() => {
       var trs = document.querySelectorAll('#ctl00_PlaceHolderMain_controle_pnlVizualizarFaturas table tr')
       return [...trs].map(x => {
         var el = x.querySelectorAll('td');
         var obj = {}
         if(el[1] && el[1].querySelector('span')) obj.valor = el[1].querySelector('span').innerHTML.replace('R$ ', '')
         if(el[2] && el[2]) obj.situacao = el[2].innerHTML
         if(el[3] && el[3].querySelector('span')) obj.mes = el[3].querySelector('span').innerHTML
         return obj
       })
    })
    .end()
    .then(function (result) {
      result.shift()
      return result
    })
 }  



exports.getEletropauloData = getEletropauloData
