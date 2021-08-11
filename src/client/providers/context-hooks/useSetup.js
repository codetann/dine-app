/**
 * @success: events sent only to the current user
 * @new: events sent to all users conencted to the socket room
 * @error: events that error out on the serverside
 */

const useSetup = () => {
  const initializeSocket = (
    socket,
    setError,
    setMembers,
    setRoom,
    setIsAdmin,
    setGameData,
    setResults
  ) => {
    socket.on("error:any", ({ error }) => {
      setError(error);
      setTimeout(() => {
        setError(null);
      }, 1000);
    });
    socket.on("new:join-room", ({ members }) => {
      setMembers(members);
    });
    socket.on("success:join-room", ({ room, members }) => {
      setMembers(members);
      setRoom(room);
    });
    socket.on("success:create-room", ({ members, room }) => {
      setMembers(members);
      setRoom(room);
      setIsAdmin(true);
    });
    socket.on("new:leave-room", ({ members }) => {
      setMembers(members);
    });
    socket.on("success:leave-room", () => {
      setMembers(null);
      setRoom(null);
    });
    socket.on("success:quit-room", () => {
      setMembers(null);
      setRoom(null);
      setIsAdmin(false);
    });
    socket.on("new:quit-room", () => {
      setMembers(null);
      setRoom(null);
      setIsAdmin(false);
    });
    socket.on("new:start-game", ({ businesses }) => {
      console.log(businesses);
      setGameData(businesses);
    });
    socket.on("new:end-game", ({ results }) => {
      setResults(results);
    });
  };

  return initializeSocket;
};

export default useSetup;
