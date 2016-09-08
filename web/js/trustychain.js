/*
Copyright (c) 2016 Edilson Osorio Junior - OriginalMy.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

var Web3 = require('web3');
var web3 = new Web3();
var eth = web3.eth;

var txutils = lightwallet.txutils;
var signing = lightwallet.signing;
var encryption = lightwallet.encryption;


//Renato
var communityAddress = '0xa5a886bdba40e3906371ce8066faef90b2adedce';
var campaignAddress = '';

//Eduardo
var communityAddress = '0xdC3B778F1459EDa14c5e6bA4BE55f25244AadE62';
var campaignAddress = '0x6B312C8bF724C153777d15565181763ad328B72c';

var abiCommunityContract = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"communitiesToOwner","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"communityId","type":"uint256"},{"name":"_member","type":"address"},{"name":"_name","type":"bytes32"}],"name":"addMember","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_description","type":"bytes32"}],"name":"createComunity","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"members","outputs":[{"name":"uuid","type":"uint256"},{"name":"owner","type":"address"},{"name":"name","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"communityId","type":"uint256"},{"name":"_member","type":"address"}],"name":"getMemberName","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"communitiesToMembers","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"communities","outputs":[{"name":"uuid","type":"uint256"},{"name":"owner","type":"address"},{"name":"name","type":"bytes32"},{"name":"description","type":"bytes32"}],"type":"function"}];

/* Carregamento dos Contratos */
var communityContract = web3.eth.contract(abiCommunityContract);
var community = communityContract.at(communityAddress);


var keystore;


// var password = 'mercadopokemon';

/* Inicializa conexão com o node local */
web3.setProvider(new web3.providers.HttpProvider());	

/*function setWeb3Provider(keystore) {
    var web3Provider = new HookedWeb3Provider({
      host: "http://localhost:8545"
      ,transaction_signer: keystore
    });

    web3.setProvider(web3Provider);
};

setWeb3Provider();
 */

var accountAddress = web3.eth.accounts;

alert(accountAddress[0]);

web3.eth.defaultAccount = web3.eth.accounts[0];

function createCommunity(_name, _description){
    

    community.createComunity(web3.fromAscii(_name.value), web3.fromAscii(_description.value), {value: 0, gas: 428638, gasPrice: 20000000000}, function(error, result){
        console.dir(arguments);
        alert('Comunidade Criada com Sucesso');
        _name.value = '';
        _description.value = '';
    })

}

//  createCommunity();
