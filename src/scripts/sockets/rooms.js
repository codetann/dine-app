import chalk from "chalk";

class Rooms {
  constructor() {
    this.rooms = ["test"];
    this.members = [];
  }

  create(id, roomId) {
    this.rooms = [...this.rooms, roomId];
    this.members = [...this.members, { id, roomId }];
  }

  join(id, roomid) {
    if (this.rooms.some((i) => i === roomid)) {
      this.members = [...this.members, { id, roomid }];
      return this.members.filter((r) => r.id === roomid);
    } else {
      if (!this.rooms.some((i) => i === roomid))
        throw new Error("could not find room");
    }
  }
}

const rooms = () => {
  return new Rooms();
};

export default rooms();
