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
    let bio : string = profile?.bio;
    if(bio?.includes('spotify:'))
    {
        let str = profile?.bio?.split('spotify:')?.pop()?.split(':')[0]?.replace(" ", "");
        let result = str?.split(/[,:]/);

        let spotifylinks = result?.map((value : string) =>
            "https://open.spotify.com/embed/" + value
        );
        if(spotifylinks?.length > 0)
        {
            return <UserProfileSection title={"Spotify Pinned"}>
                <ScrollView style={{ flexDirection: 'column' }}>
                    {
                        spotifylinks?.map((value : string, index : number) => {
                            return ( <WebView
                            source={{ uri: value }}
                            style={{ marginTop: index === 0 ? 0 : 8, backgroundColor: "#00000000", height: 80, width: "100%" }}
                            /> );
                        })
                    }
                </ScrollView>
            </UserProfileSection>
        }
    }
}