contract communityContract {
}

contract CampaignContract {

  struct Campaign {
    uint uuid;
    uint communityId;
    address owner;
    bytes32 name;
    bytes32 description;
    bytes32 image;
    uint amountNeed;
    uint amountReceive;
    bool done;
  }

  struct Collaborator {
    uint uuid;
    address owner;
    bytes32 name;
    bytes32 description;
    uint amount;
  }

  Campaign[] public compaigns;
  Collaborator[] public collaborators;

  mapping (address => uint[]) public ownerToCampaigns;
  mapping (uint => uint[]) public campaignToCollaborates;

  modifier isOwnerOfCommunity (communityId) {
    if ( communityContract.communitiesToOwner[msg.sender] != communityId ) return;
    _
  }

  modifier isOwnerOfCampaign (campaignId) {
    uint[] campaignsOfSender = ownerToCampaigns[msg.sender];
    uint count = campaignsOfSender.length;
    if( count > 0 ){
      for( uint i = 0; i < count; i++ ){
        if( campaignOfSender[i] == campaignId ){
          return true;
        }
      }
    }
    return false;
  }

  function createCampaign(uint _community, bytes32 _name, bytes32 _description, byte32 _image) isOwnerOfCommunity (_community) {
    uint uuid = campaigns.length++;
    campaigns[uuid] = Campaign({
      uuid: uuid,
      communityId: _community,
      owner: msg.sender,
      name: _name,
      description, _description,
      image: _image,
      amountNeed: 0,
      amountReceive: 0,
      done: false
    });
    uint[] campaignsOfSender = ownerToCampaigns[msg.sender];
    campaignsOfSender[campaignsOfSender.length++] = uuid;
    ownerToCampaigns[msg.sender] = campaignsOfSender;
  }

  function addCollaborate(uint _campaign, address _collaborator, bytes32 _description, uint _amount) isOwnerOfCampaign(_campaign) {
    uint uuid = collaborators.length++;
    Campaign camp = campaigns[_campaign];
    Member member = communityContract.getMemberName(camp.communityId, _collaborator);
    collaborators[uuid] = Collaborate({
      uuid: uuid,
      owner: number.address,
      name: member.name,
      description: _description,
      amount: _amount
    });
    camp.amountNeed += amount;
    campaigns[_campaign] = camp;
    uint[] campaignToCollaboratesIds = campaignToCollaborates[campaign];
    campaignToCollaborates[campaign][campaignToCollaboratesIds.length++] = uuid;
  }

  function donateToCampaign(uint _campaign, uint amount) {
    
  }

  function concludeCampaign(uint _campaign) isOwnerOfCampaign(_campaign) {

  }

  function () { throw; }
}