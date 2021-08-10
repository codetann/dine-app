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
    const room = this._createRoomId();
    ////const businesses = await yelpTEST();
    ////console.log(businesses); // ! TEST TEST TEST TEST TEST TEST TEST TEST
    // set room details
    this.rooms = [...this.rooms, room];
    this.roomDetails = [...this.roomDetails, { room, businesses: "test" }];
    this.members = [...this.members, { id, name, room }];
    // return room info
    const members = this.members.filter((r) => r.room === room);
    return { room, members };
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
  join(id, name, room) {
    if (this.rooms.some((i) => i === room)) {
      // push new member to array
      this.members = [...this.members, { id, name, room }];
      // return user if their id matches roomid
      return this.members.filter((r) => r.room === room);
    } else {
      // throw error if no rooms match roomid
      if (!this.rooms.some((i) => i === room))
        throw new Error("could not find room");
    }
  }

  leave(id, room) {
    // filter user out of members
    this.members = this.members.filter((m) => m.id !== id);
    if (!this.members) throw new Error("Error while leaving room");
    // return the rest of the users in the room
    return this.members.filter((m) => m.room === room);
  }

  quit(room) {
    this.rooms = this.rooms.filter((r) => r !== room);
    this.roomDetails = this.roomDetails.filter((r) => r.id !== room);
    this.members = this.members.filter((m) => m.room !== rooms);
  }

  start(room) {
    const i = this.roomDetails.findIndex((rd) => rd.room === room);

    if (i === -1) throw new Error("Can not find room details");

    return this.roomDetails[i];
  }
}

const rooms = () => {
  return new Rooms();
};

export default rooms();
