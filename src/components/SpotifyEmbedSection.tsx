import { ScrollView } from "enmity/components";
import { React } from "enmity/metro/common";
import { getByName, getByProps } from "enmity/metro";

const UserProfileSection = getByName("UserProfileSection");
const UserProfileStore = getByProps("getUserProfile");

const WebView = getByName("WebView") || getByProps("WebView").default.render;

export default ({ userId }: { userId: string }) => {
    const profile = UserProfileStore.getUserProfile(userId);
    if (!profile)
        return null;
    console.log(profile.bio);
    const match = profile.bio.match(/\b((https?|ftp|file):\/\/|(www|ftp)\.)[-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/ig);
    console.log(match);
    let spotifylinks = match.filter((value : string) =>
        value.startsWith("https://open.spotify.com/") || value.startsWith("http://open.spotify.com/")
    );
    console.log(spotifylinks);
    spotifylinks = spotifylinks.map((value : string) =>
        value.replace("open.spotify.com/", "open.spotify.com/embed/")
    );
    console.log(spotifylinks);

    return <UserProfileSection title={"Spotify Pinned"}>
        <ScrollView style={{ flexDirection: 'column' }}>
            {
                spotifylinks.map((value : string, index : number) => {
                    return ( <WebView
                    source={{ uri: value }}
                    style={{ marginTop: index === 0 ? 0 : 5, backgroundColor: "#00000000", height: 80, width: "100%" }}
                    /> );
                })
            }
        </ScrollView>
    </UserProfileSection>
}