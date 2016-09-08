contract CommunityContract {

  struct Community {
    uint    uuid;
    address owner;
    bytes32 name;
    bytes32 description;
  }
  
  struct CommunityMember {
    uint uuid;
    address member;
    uint community;
  }
  
  Community[] public communities;
  mapping (address => uint) public communitiesToMembers;
  mapping (address => uint) public communitiesToOwner;

  function create( bytes32 _name, bytes32 _description ){
    uint uuid = communities.length++;
    communities[uuid] = Community({
      uuid: uuid,
      owner: msg.sender,
      name: _name,
      description: _description
    });
    communitiesToOwner[msg.sender] = uuid;
  }

  modifier hasCommunity (uint communityId) {
    if ( communitiesToOwner[msg.sender] == communityId ) return;
    _
  }

  function addMember(uint communityId, address member) hasCommunity(communityId) {
    communitiesToMembers[member] = communityId;
  }

  function removeMember(uint communityId, address member) hasCommunity(communityId) {
    delete communitiesToMembers[member];
  }
  
}