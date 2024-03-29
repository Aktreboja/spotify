import { Artist, Track } from "@spotify/web-api-ts-sdk"
import Image from "next/image"

export default function PreviewContainer({item}: {item: Track | Artist }) {
    // If it is a track
    if ('preview_url' in item)
    {
        const {name, album, artists} = item;
        const {images} = album;

        return <div className="w-1/3 max-w-lg py-12 hidden md:block ">
        <div className="flex flex-col justify-center items-center">
            <div className="p-3 relative">
                <Image src={images[0].url} alt={`${name} Album art`} width={250} height={250} />
            </div>
            
            <div className="p-3 text-center text-white">
                <strong className="font-bold">{name}</strong>
                <p className="font-semibold">{artists && artists.length > 0 ? artists.map(artist => artist.name).join(', ') : 'No Artists Available'}</p>
                <p><span className="font-semibold">From the {album.album_type.toLowerCase()}:</span> {album.name}</p>
            </div>
        </div>
    </div>
    }
    else {
        const {name, images} = item
        return <div className="w-1/3 max-w-lg py-12 hidden md:block ">
        <div className="flex flex-col justify-center items-center">
            <div className="p-3 relative">
                <Image src={images[0].url} alt={`${name} Album art`} width={250} height={250} />
            </div>
            
            <div className="p-3 text-center text-white">
                <strong className="font-bold">{name}</strong>
                {/* <p className="font-semibold">{artists && artists.length > 0 ? artists.map(artist => artist.name).join(', ') : 'No Artists Available'}</p>
                <p><span className="font-semibold">From the {album.album_type.toLowerCase()}:</span> {album.name}</p> */}
            </div>
        </div>
    </div>
    }



}


