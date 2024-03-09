

interface PlaylistMeta {
    name: string;
    public: boolean;
    collaborative: false | null;
    description: string | null;
}

/**
 * Playlist specific Spotify functions 
 *
 */




// Retrieves the user's playlists
// todo: Check to see if there is a way to wrap this, and type check this function
export const GetUserPlaylists = async (access_token: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_SPOTIFY_API_BASE + "/me/playlists", {
        method: "GET",
        headers: {'Authorization': `Bearer ${access_token}`}
    })

    return await response.json();
}

// Create a new playlist
export const CreatePlaylist = async ({userId, access_token, playlistMetadata}: {userId: string, access_token: string, playlistMetadata: PlaylistMeta}) => {    
    const {name, public: isPublic, collaborative, description } = playlistMetadata;

    // Creating a new object with the correct type
    const playlistData: Record<string, string> = {
        name,
        public: String(isPublic),
        collaborative: String(collaborative),
        description: description || "", // default to an empty string if description is null
    };
    
    const response = await fetch (process.env.NEXT_PUBLIC_SPOTIFY_API_BASE + `/users/${userId}/playlists`, {
        method: "POST",
        headers: {'Authorization': `Bearer ${access_token}`},
        body: new URLSearchParams(
            playlistData
        )
    })
}