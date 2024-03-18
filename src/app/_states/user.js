import { atom, useRecoilState } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'some-persist-state',
  storage: typeof window === 'undefined' ? undefined : window.sessionStorage,
})

const userInfoAtom = atom({
  key: 'userInfo',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  return [userInfo, setUserInfo];
}
