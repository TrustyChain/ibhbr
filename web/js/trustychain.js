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


var communityAddress = '0xdC3B778F1459EDa14c5e6bA4BE55f25244AadE62';
var campaignAddress = '0x1070b735D064238F12cF62C7F1eE9D1FA094CFd0';

var abiCommunityContract = [{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"communitiesToOwner","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"communityId","type":"uint256"},{"name":"_member","type":"address"},{"name":"_name","type":"bytes32"}],"name":"addMember","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_description","type":"bytes32"}],"name":"createComunity","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"members","outputs":[{"name":"uuid","type":"uint256"},{"name":"owner","type":"address"},{"name":"name","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"communityId","type":"uint256"},{"name":"_member","type":"address"}],"name":"getMemberName","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"communitiesToMembers","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"communities","outputs":[{"name":"uuid","type":"uint256"},{"name":"owner","type":"address"},{"name":"name","type":"bytes32"},{"name":"description","type":"bytes32"}],"type":"function"}];


var abiCampaignContract = [{"constant":false,"inputs":[{"name":"_campaign","type":"uint256"}],"name":"concludeCampaign","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"campaigns","outputs":[{"name":"uuid","type":"uint256"},{"name":"communityId","type":"uint256"},{"name":"owner","type":"address"},{"name":"name","type":"bytes32"},{"name":"description","type":"bytes32"},{"name":"image","type":"bytes32"},{"name":"amountNeed","type":"uint256"},{"name":"amountReceive","type":"uint256"},{"name":"done","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"collaborators","outputs":[{"name":"uuid","type":"uint256"},{"name":"owner","type":"address"},{"name":"name","type":"bytes32"},{"name":"description","type":"bytes32"},{"name":"amount","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_campaign","type":"uint256"},{"name":"amount","type":"uint256"}],"name":"donateToCampaign","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"campaignToCollaborates","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"current","type":"address"}],"name":"countCampaigns","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_campaign","type":"uint256"},{"name":"_collaborator","type":"address"},{"name":"_description","type":"bytes32"},{"name":"_amount","type":"uint256"}],"name":"addCollaborate","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_community","type":"uint256"},{"name":"_name","type":"bytes32"},{"name":"_description","type":"bytes32"},{"name":"_image","type":"bytes32"}],"name":"createCampaign","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"community","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"ownerToCampaigns","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[{"name":"_community","type":"address"}],"type":"constructor"}];


/* Carregamento dos Contratos */
var communityContract = web3.eth.contract(abiCommunityContract);
var community = communityContract.at(communityAddress);

var campaignContract = web3.eth.contract(abiCampaignContract);
var campaign = campaignContract.at(campaignAddress);

/* Inicializa conexão com o node local */
web3.setProvider(new web3.providers.HttpProvider());

var accountAddress = web3.eth.accounts;

web3.eth.defaultAccount = web3.eth.accounts[0];

var lastCommunity = community.communitiesToOwner(web3.eth.accounts[0]);

function createCampaign(_communityId, name, description, image){
    campaign.createCampaign(_communityId.plus(21).toString(10), web3.fromAscii(name.value), web3.fromAscii(description.value), web3.fromAscii(image.value), {value: 0, gas: 289032, gasPrice: 20000000000}, function(error, result){
        console.dir(arguments);
        if(!error){
            alert("Campanha criado com sucesso");
            window.location.href = "addColaborador.html";
        } else {
            alert("Deu muito ruim");
        }
  });
}

function createCommunity(_name, _description){
    community.createComunity(web3.fromAscii(_name.value), web3.fromAscii(_description.value), {value: 0, gas: 428638, gasPrice: 20000000000}, function(error, result){
        console.dir(arguments);
        if(!error){
          alert('Comunidade Criada com Sucesso');
          window.location.href = "addMembro.html";
        } else {
            alert("Deu ruim");
        }
    });
    return false;
}

function addMember(_communityId, _member, _name) {
    community.addMember(_communityId.plus(21).toString(10), _member.value, web3.fromAscii(_name.value), {value: 0, gas: 428638, gasPrice: 20000000000}, function(error, result){
      console.dir(arguments);
      if(!error){
          alert('Membro adicionado com Sucesso');
          _communityId.value = '';
          _member.value = '';
          _name.value = '';
      } else {
          alert("Deu ruim");
      }
  });
}

function addCollaborate(campaign, collaborator, description, amount){
    campaign.addCollaborate(campaign, collaborator, web3.fromAscii(description), web3.toBigNumber(amount), {value: 0, gas: 428638, gasPrice: 20000000000}, function(error, result){
        console.dir(arguments);
        if(!error){
            alert("Colaborador adicionado com sucesso");
        } else {
            alert("Deu muito ruim");
        }
    });
}

function popularColaboradores(){
    var count = campaign.countCampaigns(web3.eth.defaultAccount);
    for(var i = 1; ; i++) {
      var bigNumber = campaign.ownerToCampaigns(web3.eth.defaultAccount, i);
        if(bigNumber.c[0] == 0){
            break;
        } else {
            var camp = campaign.campaigns(bigNumber.c[0]);
            $('#campaigns').append("<option value='"+camp[0].c[0]+"'>"+web3.toAscii(camp[3])+"</option>"
            );
        }
    }
    $("#campaigns").on("change", function(){
        popularColaboradoresSub();
    });
    popularColaboradoresSub();
}

function popularColaboradoresSub(){
    var campaignId = $("#campaigns").val();
    var camp = campaign.campaigns(campaignId);
    var communityId = camp[1].c[0]
    console.log(communityId);
    for(var i = 1; ; i++) {
        
    }
}
