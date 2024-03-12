import { atom, useRecoilState } from "recoil"; 

const userInfoAtom = atom({
  key: 'userInfo',
  default: {},
});

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  return [userInfo, setUserInfo];
}
