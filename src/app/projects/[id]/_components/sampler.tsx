import { loaded, Player } from "tone";

export default function Sampler() {
  const player = new Player(
    "https://tonejs.github.io/audio/berklee/gong_1.mp3",
  ).toDestination();

  loaded().then(() => {
    // player.start();
  });

  return <div>Sampler</div>;
}
