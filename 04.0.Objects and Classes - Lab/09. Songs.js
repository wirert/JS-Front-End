function printSongs(input) {
  class Song {
    constructor(type, name, time) {
      this.typeList = type;
      this.name = name;
      this.time = time;
    }
    printName() {
      console.log(this.name);
    }
  }
  const [_, ...songsInfo] = input;
  const typeList = songsInfo.pop();

  songsInfo.map((songInfo) => {
    let [type, name, time] = songInfo.split("_");
    const song = new Song(type, name, time);

    if (type === typeList || typeList === "all") {
      song.printName();
    }
  });
}

printSongs([2, "like_Replay_3:15", "ban_Photoshop_3:48", "all"]);
