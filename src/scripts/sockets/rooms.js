import { yelpTEST } from "../api/yelp";

// TODO: on quit, room details are not being removed.

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
    const businesses = await yelpTEST();
    // set room / details / members
    this.rooms = [...this.rooms, room];
    this.roomDetails = [...this.roomDetails, { room, businesses }];
    this.members = [...this.members, { id, name, room, answers: null }];
    // return room info
    const members = this.members.filter((r) => r.room === room);
    return { room, members };
  }

  join(id, name, room) {
    if (this.rooms.some((i) => i === room)) {
      // push new member to array
      this.members = [...this.members, { id, name, room, answers: null }];
      // return user if their id matches room
      return this.members.filter((r) => r.room === room);
    } else {
      // throw error if no rooms match room
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
    // remove room from rooms
    this.rooms = this.rooms.filter((r) => r !== room);
    // remove room details
    this.roomDetails = this.roomDetails.filter((r) => r.room !== room);
    this.roomDetails.filter((r) => {
      console.log(r.room, room);
    });
    // remove all members
    this.members = this.members.filter((m) => m.room !== rooms);
  }

  start(room) {
    // find index of details
    const i = this.roomDetails.findIndex((rd) => rd.room === room);
    console.log(room, i);
    if (i === -1) throw new Error("Can not find room details");
    // return the correct room details
    return this.roomDetails[i];
  }

  end(id, room, answers) {
    // get all members in current room
    const members = this.members.filter((m) => m.room === room);
    // find current member in members
    const member = members.find((m) => m.id === id);
    // set members answers
    member.answers = answers;
    this.members = [...this.members, members];

    if (members.every((m) => m.answers)) {
      let results = [];
      let details = this.roomDetails.find((rd) => rd.room === room);
      for (let i = 0; i < details.businesses.length; i++) {
        results.push({ name: details.businesses[i].name, yes: 0, no: 0 });
      }
      members.forEach((m) => {
        for (let i = 0; i < m.answers.length; i++) {
          if (m.answers[i]) results[i].yes++;
          if (!m.answers[i]) results[i].no++;
        }
      });
      console.log(results);
      return { finished: true, results };
    } else {
      // run code here when not everyone is done
      return { finished: false };
    }
  }
}

const rooms = () => {
  return new Rooms();
};

export default rooms();
