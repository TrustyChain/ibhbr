contract CommunityContract {

  struct Community {
    uint    uuid;
    address owner;
    bytes32 name;
    bytes32 description;
  }
  
  struct Member {
    uint uuid;
    address owner;
    bytes32 name;
  }
  
  Community[] public communities;
  Member[] public members;
  mapping (address => uint) public communitiesToMembers;
  mapping (address => uint) public communitiesToOwner;

  function createComunity( bytes32 _name, bytes32 _description ){
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

  function addMember(uint communityId, address _member, bytes32 _name) hasCommunity(communityId) {
    uint uuid = members.length++;
    members[uuid] = Member({name: _name, owner: _member, uuid: uuid});
    communitiesToMembers[_member] = uuid;
  }

  function removeMember(uint communityId, address member) hasCommunity(communityId) {
    delete communitiesToMembers[member];
  }
  
  function () {throw;}
  
}