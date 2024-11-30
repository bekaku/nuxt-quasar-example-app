import { getCurrentTimestamp } from "~/utils/dateUtil";
import { useCache } from "./useCache";
import { useDateFns } from "./useDateFns";
import { Device } from '@capacitor/device';
export const useDevice = () => {
  const deviceId = ref();
  const { getDateDiffMinutes } = useDateFns()
  const { latestSyncActiveStatus } = useCache();
  const isDevMode = () => {
    return import.meta.dev;
  };
  const isServer = () => {
    return import.meta.server;
  };
  const getDeviceInfo = async (): Promise<any> => {
    const info = await Device.getInfo();
    return new Promise((resolve) => {
      resolve(info);
    });
  };
  const getDeviceId = async (): Promise<string | undefined> => {
    const ID = await Device.getId();
    return new Promise((resolve) => {
      deviceId.value = ID ? ID.identifier : undefined;
      resolve(ID ? ID.identifier : undefined);
    });
  };
  const canSyncActiveStatusToServer = (): Promise<boolean> => {
    return new Promise(resolve => {
      const currentTimeTamp = getCurrentTimestamp();
      let diffminutes;
      if (latestSyncActiveStatus.value > 0) {
        diffminutes = getDateDiffMinutes(
          latestSyncActiveStatus.value,
          currentTimeTamp
        );
      } else {
        latestSyncActiveStatus.value = currentTimeTamp;
        resolve(true);
      }
      if (diffminutes != undefined && diffminutes >= 5) {
        latestSyncActiveStatus.value = currentTimeTamp;
        resolve(true);
      }
      resolve(false);
    });
  };
  const setSysncActiveStatus = () => {
    latestSyncActiveStatus.value = getCurrentTimestamp();
  };
  return {
    isDevMode,
    isServer,
    getDeviceInfo,
    getDeviceId,
    deviceId,
    canSyncActiveStatusToServer,
    setSysncActiveStatus
  };
};