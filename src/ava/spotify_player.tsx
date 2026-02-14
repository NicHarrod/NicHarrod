import  { useEffect, useState } from "react";

// IMPORTANT:
// - Requires Spotify Premium
// - Requires a valid OAuth access token with user-modify-playback-state scope
// - Replace TRACK_URI with the track/playlist/album you want to play

const TRACK_URI = "spotify:playlist:5aMPqBWnot4iMVoii1kKsJ";
const CLIENT_ID = "46f6805c30694f35a7d327e4caf7ed8e";
const REDIRECT_URI = window.location.origin;
const SCOPES = ["user-modify-playback-state", "streaming"];

declare global {
  interface Window {
    Spotify: any;
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

interface Props {}

function getAccessTokenFromHash(): string | null {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
}

function redirectToSpotifyLogin() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPES.join(" "))}`;

  window.location.href = authUrl;
}

export default function SpotifyPlayerComponent(_: Props) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [player, setPlayer] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isActive, setIsActive] = useState(false);

  // Load token from URL or localStorage
  useEffect(() => {
    const tokenFromHash = getAccessTokenFromHash();

    if (tokenFromHash) {
      localStorage.setItem("spotify_access_token", tokenFromHash);
      setAccessToken(tokenFromHash);
      window.location.hash = "";
      return;
    }

    const cached = localStorage.getItem("spotify_access_token");
    if (cached) setAccessToken(cached);
  }, []);

  // Load Spotify SDK when token exists
  useEffect(() => {
    if (!accessToken) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const _player = new window.Spotify.Player({
        name: "Custom Web Player",
        getOAuthToken: (cb: (token: string) => void) => cb(accessToken),
        volume: 0.5,
      });

      setPlayer(_player);

      _player.addListener("ready", ({ device_id }: { device_id: string }) => {
        setDeviceId(device_id);
      });

      _player.addListener("player_state_changed", (state: any) => {
        if (!state) return;

        setIsPaused(state.paused);
        setIsActive(true);
      });

      _player.connect();
    };
  }, [accessToken]);

  // Play track OR request login
  const handlePlayClick = async () => {
    if (!accessToken) {
      redirectToSpotifyLogin();
      return;
    }

    if (!deviceId) return;

    await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [TRACK_URI] }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const pause = async () => {
    if (!accessToken || !deviceId) return;

    await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <h2 className="text-xl font-semibold">Custom Spotify Player</h2>

      {!isActive && accessToken && (
        <p className="text-sm text-gray-500">Initializing player...</p>
      )}

      <button
        onClick={isPaused ? handlePlayClick : pause}
        className="px-6 py-3 rounded-2xl shadow-md text-white bg-green-600 hover:bg-green-700 transition"
        disabled={accessToken ? !deviceId : false}
      >
        {!accessToken ? "Login & Play" : isPaused ? "Play" : "Pause"}
      </button>
    </div>
  );
}
