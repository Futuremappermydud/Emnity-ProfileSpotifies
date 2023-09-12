import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React } from 'enmity/metro/common';
import { getByProps } from 'enmity/metro';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';

const Patcher = create('profile-spotifies');
const UserProfile = getByProps("PRIMARY_INFO_TOP_OFFSET", "SECONDARY_INFO_TOP_MARGIN", "SIDE_PADDING")
import { findInReactTree } from "enmity/utilities"
import SpotifyEmbedSection from './components/SpotifyEmbedSection';

const ProfileSpotifies: Plugin = {
   ...manifest,

   onStart() {
      Patcher.after(UserProfile.default, "type", (_, __, res) => {
         let profileCardSection = findInReactTree(res, r => 
             r?.type?.displayName === "View" &&
             r?.props?.children.findIndex(i => i?.type?.name === "UserProfileBio") !== -1
         )?.props?.children

         if (!profileCardSection) return res;

         const { userId } = profileCardSection?.find((r: any) => typeof r?.props?.displayProfile?.userId === "string")?.props?.displayProfile ?? {};

         profileCardSection.unshift(<SpotifyEmbedSection userId={userId}/>);
     });
   },

   onStop() {
      Patcher.unpatchAll();
   }
};

registerPlugin(ProfileSpotifies);
