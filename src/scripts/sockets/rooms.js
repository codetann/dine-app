import { yelpTEST } from "../api/yelp";

class Rooms {
  constructor() {
    this.rooms = ["test"];
    this.roomDetails = [];
    this.members = [];
  }

  _createRoomId() {
    const chars = "abcdefghijklmnopqrstuvwxyz" + "1234567890";
    const i = () => Math.floor(Math.random() * chars.length);
    return `${chars[i()]}${chars[i()]}${chars[i()]}${chars[i()]}`;
  }

  async create(id, name, details) {
    // ... deconstruct details here
    const roomid = this._createRoomId();
    const businesses = await yelpTEST();
    console.log(businesses); // ! TEST TEST TEST TEST TEST TEST TEST TEST
    // set room details
    this.rooms = [...this.rooms, roomid];
    this.roomDetails = [...this.roomDetails, { roomid, businesses }];
    this.members = [...this.members, { id, name, roomid }];
    // return room info
    const members = this.members.filter((r) => r.roomid === roomid);
    return { roomid, members };
  }

  /**
   * join() will look for active rooms the the room id provided.
   * - if any are found, it will assign the user that room and return members
   * - if not found, it will throw an error to be sent back to the user
   *
   * @param {String} id - user id
   * @param {String} name - user name
   * @param {String} roomid - user roomId
   * @returns Error || members of that room
   */
  join(id, name, roomid) {
    if (this.rooms.some((i) => i === roomid)) {
      // push new member to array
      this.members = [...this.members, { id, name, roomid }];
      // return user if their id matches roomid
      return this.members.filter((r) => r.roomid === roomid);
    } else {
      // throw error if no rooms match roomid
      if (!this.rooms.some((i) => i === roomid))
        throw new Error("could not find room");
    }
  }
}

const rooms = () => {
  return new Rooms();
};

export default rooms();
