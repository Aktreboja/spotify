
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track, Artist } from "@spotify/web-api-ts-sdk";
import { RootState } from "../store";
import { saveTrack, checkForSaved, fetchSimilarTracks } from "../actions/track";
import { fetchArtists, fetchSelectedArtists } from "../actions/artist";

// Selected Item State
interface SelectedState {
    selectedItem: Artist | Track | null;
    saved: boolean;
    selectedArtists: Artist[];
    similarTracks: Track[];
}

interface PreviewState {
    preview: Track | Artist | null;
    preview_url: string;
    tracks: Track[];
    artists: Artist[];
    time_range: 'short_term' | 'medium_term' | 'long_term';
    view_tab: string;
    selected: SelectedState;
}

const initialState : PreviewState = {
    preview: null,
    preview_url: '',
    tracks: [],
    artists: [],
    time_range: 'medium_term',
    view_tab: 'Tracks',
    selected: {
        selectedItem: null,
        saved: false,
        selectedArtists: [],
        similarTracks: []
    }
}

const MusicReducer = createSlice({
    name: "Music",
    initialState,
    reducers: {
        setPreview: (state, action: PayloadAction<Track | Artist | null>) => {
            state.preview = action.payload
        },
        setTracks: (state, action: PayloadAction<Track[]>) => {
            state.tracks = action.payload
        },
        setArtists: (state, action: PayloadAction<Artist[]>) => {
            state.artists = action.payload
        },
        setTimeRange: (state, action: PayloadAction<'short_term' | 'medium_term' | 'long_term'>) => {
            state.time_range = action.payload
        },
        setPreviewUrl: (state, action: PayloadAction<string>) => {
            state.preview_url = action.payload
        },
        setSelected: (state, action: PayloadAction<Track | Artist | null>) => {
            state.selected.selectedItem = action.payload
        },
        setSaved: (state, action: PayloadAction<boolean>) => {
            state.selected.saved = action.payload
        },
        setSelectedArtists: (state, action: PayloadAction<Artist[]>) => {
            state.selected.selectedArtists = action.payload
        },
        setSimilarTracks: (state, action: PayloadAction<Track[]>) => {
            state.selected.similarTracks = action.payload
        }
        
    },
    extraReducers(builder) {
        builder.addCase(fetchSelectedArtists.fulfilled, (state, action) => {
            state.selected.selectedArtists = action.payload as Artist[]
        }),
        builder.addCase(fetchSelectedArtists.rejected, (state, action) => {
            console.error("Unable to fetch selected item's Artists.")
        }),
        builder.addCase(checkForSaved.fulfilled, (state, action: PayloadAction<boolean>) => {
            state.selected.saved = action.payload
        }),
        builder.addCase(fetchSimilarTracks.fulfilled, (state, action) => {
            state.selected.similarTracks = action.payload
        }),
        builder.addCase(saveTrack.fulfilled, (state, action) => {
            console.log('Track Saved')
        }),
        builder.addCase(fetchArtists.fulfilled, (state, action) => {
            state.artists = action.payload as Artist[]
        })
    },
})

/**
 * Selectors for Music Reducer state
 */

// Preview component State
export const getPreview = (state: RootState) => state.music.preview
export const getPreviewUrl = (state: RootState) => state.music.preview_url

// Selectors for table view
export const getTracks = (state: RootState) => state.music.tracks
export const getArtists = (state: RootState) => state.music.artists
export const getTimeRange = (state: RootState) => state.music.time_range

// Selected Item state
export const getSelected = (state: RootState) => state.music.selected.selectedItem
export const getSelectedArtists = (state: RootState) => state.music.selected.selectedArtists
export const getSimilarTracks = (state: RootState) => state.music.selected.similarTracks
export const getIsSaved = (state: RootState) => state.music.selected.saved

// Exports for usage in other files
export const { 
    setPreview,
    setTracks,
    setArtists,
    setTimeRange, 
    setPreviewUrl, 
    setSelected, 
    setSaved, 
    setSelectedArtists, 
    setSimilarTracks 
} = MusicReducer.actions;

export default MusicReducer.reducer;