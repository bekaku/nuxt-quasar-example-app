import { getCurrentTimestamp } from "~/utils/dateUtil";
import { useCache } from "./useCache";
import { useDateFns } from "./useDateFns";
import { Device } from '@capacitor/device';

export const useAppDevice = () => {
  const { $q } = useNuxtApp()
  const { isMobile, isTablet, isDesktop, isMobileOrTablet, isCrawler, isAndroid, isIos, isWindows } = useDevice();
  const deviceId = ref();
  const { getDateDiffMinutes } = useDateFns()
  const { latestSyncActiveStatus } = useCache();

  const isScreenMobile = computed(() => $q?.screen?.lt?.sm || false) // xs only
  const isScreenTablet = computed(() => $q?.screen?.sm || $q?.screen?.md || false) // sm, md
  const isScreenDesktop = computed(() => $q?.screen?.gt?.md || false) // lg, xl
  const isScreenMobileOrTablet = computed(() => isScreenMobile.value || isScreenTablet.value)
  const isSmallScreen = computed(() => {
    return $q?.screen?.sm || $q?.screen?.xs || false;
  })
  const getDeviceInfo = async (): Promise<any> => {
    if (import.meta.server) return null;
    return await Device.getInfo();
  };
  const getDeviceId = async (): Promise<string | undefined> => {
    if (import.meta.server) return undefined;

    const ID = await Device.getId();
    deviceId.value = ID ? ID.identifier : undefined;
    return deviceId.value;
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
        return;
      }
      if (diffminutes != undefined && diffminutes >= 5) {
        latestSyncActiveStatus.value = currentTimeTamp;
        resolve(true);
        return;
      }
      resolve(false);
    });
  };
  const setSysncActiveStatus = () => {
    latestSyncActiveStatus.value = getCurrentTimestamp();
  };
  return {
    getDeviceInfo,
    getDeviceId,
    deviceId,
    canSyncActiveStatusToServer,
    setSysncActiveStatus,
    isMobile, isTablet, isDesktop, isMobileOrTablet, isCrawler, isAndroid, isIos, isWindows,
    isSmallScreen, isScreenMobile, isScreenTablet, isScreenDesktop, isScreenMobileOrTablet
  };
};