import React, { useRef, useState } from "react";
import YT from "react-native-youtube-iframe";
import { Card } from "react-native-paper";

const YoutubePlayer = () => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  return (
    <Card>
        <Card.Title title="Video Description"/>
      <YT
        ref={playerRef}
        height={250}
        width={400}
        videoId={"Ct6BUPvE2sM"}
        play={playing}
        onChangeState={(event) => console.log(event)}
        onReady={() => console.log("ready")}
        onError={(e) => console.log(e)}
        onPlaybackQualityChange={(q) => console.log(q)}
        volume={50}
        playbackRate={1}
        initialPlayerParams={{
          cc_lang_pref: "us",
          showClosedCaptions: true,
        }}
      />
    </Card>
  );
};

export default YoutubePlayer;
